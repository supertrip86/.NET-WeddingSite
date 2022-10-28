using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;
using WeddingSite.BackEnd.DAL;
using WeddingSite.BackEnd.DAL.Mappings;
using WeddingSite.BackEnd.Middlewares;
using WeddingSite.BackEnd.Shared.Structs;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).Enrich.FromLogContext().CreateLogger();

try
{
    Log.Information("Starting up");

    builder.Host.UseSerilog();

    builder.Services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = builder.Configuration["Jwt:ValidIssuer"],
                            ValidAudience = builder.Configuration["Jwt:ValidAudience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                            ClockSkew = TimeSpan.Zero
                        };
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

    app.MapGet("/", () => "Web API started");

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