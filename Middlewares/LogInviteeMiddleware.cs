using Microsoft.Extensions.Options;
using Serilog.Context;
using WeddingSite.BackEnd.Shared.Models;

namespace WeddingSite.BackEnd.Middlewares
{
    public class LogInviteeMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SerilogUsername _username;

        public LogInviteeMiddleware(RequestDelegate next, IOptions<SerilogUsername> username)
        {
            _next = next;
            _username = username.Value;
        }

        public async Task Invoke(HttpContext context)
        {
            var username = (context.User.Identity != null && context.User.Identity.IsAuthenticated) ? context.User.Identity.Name : "Anonymous";

            LogContext.PushProperty(_username.ColumnName, username);

            await _next(context);
        }
    }
}
