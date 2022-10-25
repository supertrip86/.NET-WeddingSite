using Serilog.Context;

namespace WeddingSite.BackEnd.Middlewares
{
    public class LogInviteeMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public LogInviteeMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            var columnName = _configuration.GetSection("Serilog:WriteTo")
                                           .GetChildren()
                                           .First()
                                           .GetSection("Args:columnOptionsSection:additionalColumns")
                                           .GetChildren()
                                           .First()
                                           .GetSection("ColumnName").Value;

            var username = (context.User.Identity != null && context.User.Identity.IsAuthenticated) ? context.User.Identity.Name : "Anonymous";

            LogContext.PushProperty(columnName, username);

            await _next(context);
        }
    }
}
