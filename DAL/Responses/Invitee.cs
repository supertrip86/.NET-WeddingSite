using Microsoft.AspNetCore.Mvc;
using PasswordGenerator;

namespace WeddingSite.BackEnd.DAL.Responses
{
    [ModelMetadataType(typeof(Models.Invitee))]
    public class Invitee
    {
        public int InvitationId { get; set; }

        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = new Password(6).IncludeLowercase().IncludeUppercase().IncludeNumeric().Next();

        public bool Attending { get; set; } = false;

        public string Role { get; set; } = "Invitee";

        public int GuestsCount { get; set; } = 0;

        public virtual ICollection<Guest> Guests { get; set; } = new List<Guest>();
    }
}