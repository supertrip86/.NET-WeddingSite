namespace WeddingSite.BackEnd.Shared.Models
{
    public class AppTokens
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public int InvitationId { get; set; }
    }
}