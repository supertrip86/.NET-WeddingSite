namespace WeddingSite.BackEnd.Shared.Models
{
    public class JwtParameters
    {
        public string Key { get; set; } = string.Empty;
        public string? ValidIssuer { get; set; }
        public string? ValidAudience { get; set; }
        public int TokenExpirationInMinutes { get; set; }
        public int RefreshTokenExpirationInMonths { get; set; }
    }
}
