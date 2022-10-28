using Microsoft.AspNetCore.Mvc;

namespace WeddingSite.BackEnd.DAL.Responses
{
    [ModelMetadataType(typeof(Models.ActiveInvitee))]
    public class ActiveInvitee
    {
        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string RefreshToken { get; set; } = string.Empty;

        public DateTime Active { get; set; } = DateTime.Now;
    }
}
