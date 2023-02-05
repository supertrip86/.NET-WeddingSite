using Microsoft.AspNetCore.Mvc;

namespace WeddingSite.BackEnd.DAL.Responses
{
    [ModelMetadataType(typeof(Models.Guest))]
    public class Guest
    {
        public int GuestId { get; set; }

        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public bool IsPlusOne { get; set; }

        public bool Attending { get; set; }

        public string ChosenMenu { get; set; } = "Vegetariano";

        public string Allergies { get; set; } = string.Empty;

        public string Intolerances { get; set; } = string.Empty;

        public string Note { get; set; } = string.Empty;
    }
}
