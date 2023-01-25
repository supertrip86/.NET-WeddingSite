using Microsoft.AspNetCore.Mvc;

namespace WeddingSite.BackEnd.DAL.Responses
{
    [ModelMetadataType(typeof(Models.BankingDetails))]
    public class BankingDetails
    {
        public string BankAccountHolder { get; set; } = string.Empty;

        public string BankAccountNumber { get; set; } = string.Empty;

        public string BankRoutingNumber { get; set; } = string.Empty;

        public string BankAddress { get; set; } = string.Empty;
    }
}
