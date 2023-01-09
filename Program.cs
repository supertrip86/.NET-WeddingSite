using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;
using WeddingSite.BackEnd.DAL;
using WeddingSite.BackEnd.DAL.Mappings;
using WeddingSite.BackEnd.Middlewares;
using WeddingSite.BackEnd.Shared.Models;
using WeddingSite.BackEnd.Shared.Structs;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).Enrich.FromLogContext().CreateLogger();

try
{
    Log.Information("Starting up");

    var tokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtParameters:ValidIssuer"],
        ValidAudience = builder.Configuration["JwtParameters:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtParameters:Key"])),
        ClockSkew = TimeSpan.Zero
    };

    var serilogUsername = builder.Configuration.GetSection("Serilog:WriteTo")
                                               .GetChildren()
                                               .First()
                                               .GetSection("Args:columnOptionsSection:additionalColumns")
                                               .GetChildren()
                                               .First();

    var encryptionStrings = builder.Configuration.GetSection("EncryptionStrings");

    var jwtParameters = builder.Configuration.GetSection("JwtParameters");

    builder.Host.UseSerilog();

    builder.Services.AddSingleton(tokenValidationParameters);

    builder.Services.Configure<SerilogUsername>(serilogUsername);
    builder.Services.Configure<EncryptionStrings>(encryptionStrings);
    builder.Services.Configure<JwtParameters>(jwtParameters);

    builder.Services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = tokenValidationParameters;
                    });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(Policies.Admin, policy => policy.RequireRole(Roles.Admin));
        options.AddPolicy(Policies.Authorized, policy => policy.RequireRole(Roles.Admin, Roles.User));
    });

    builder.Services.AddMvc();

    builder.Services.AddAutoMapper(typeof(GuestsMapping));
    builder.Services.AddAutoMapper(typeof(InvitationsMapping));
    builder.Services.AddAutoMapper(typeof(ActiveInviteesMapping));

    builder.Services.AddSpaStaticFiles(configure => {
        configure.RootPath = "client/build";
    });

    builder.Services.AddDbContext<WeddingSiteDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection")));

    builder.Services.AddControllers()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                    });

    var app = builder.Build();

    app.UseAuthentication();

    app.UseMiddleware<LogInviteeMiddleware>();

    app.UseAuthorization();

    app.UseSerilogRequestLogging();

    app.MapControllers();

    app.MapWhen(x => !string.IsNullOrEmpty(x.Request.Path.Value) && !x.Request.Path.Value.ToLower().StartsWith("/api"), build =>
    {
        build.UseSpa(spa =>
        {
            spa.Options.SourcePath = "client";

            if (builder.Environment.IsDevelopment())
            {
                spa.UseReactDevelopmentServer(npmScript: "start");
            }
        });
    });

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}