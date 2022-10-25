using Microsoft.AspNetCore.Mvc;

namespace WeddingSite.BackEnd.DAL.Responses
{
    [ModelMetadataType(typeof(Models.Guest))]
    public class Guest
    {
        public int GuestId { get; set; }

        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string ChosenMenu { get; set; } = string.Empty;

        public string Allergies { get; set; } = string.Empty;

        public string Intolerances { get; set; } = string.Empty;

        public string? Note { get; set; }
    }
}
