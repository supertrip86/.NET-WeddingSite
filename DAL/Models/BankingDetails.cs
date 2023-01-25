using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeddingSite.BackEnd.DAL.Models
{
    [Table("BankingDetails")]
    public class BankingDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("BankAccountHolder")]
        public string BankAccountHolder { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("BankAccountNumber")]
        public string BankAccountNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("BankRoutingNumber")]
        public string BankRoutingNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("BankAddress")]
        public string BankAddress { get; set; } = string.Empty;
    }
}
