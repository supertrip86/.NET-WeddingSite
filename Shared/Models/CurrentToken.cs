namespace WeddingSite.BackEnd.Shared.Models
{
    public class CurrentToken
    {
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}