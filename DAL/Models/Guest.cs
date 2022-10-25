using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeddingSite.BackEnd.DAL.Models
{
    [Table("Guests")]
    public class Guest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("GuestId")]
        public int GuestId { get; set; }

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("LastName")]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("FirstName")]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50)]
        [DataType(DataType.Text)]
        [Column("ChosenMenu")]
        public string ChosenMenu { get; set; } = string.Empty;

        [StringLength(50)]
        [DataType(DataType.Text)]
        [Column("Allergies")]
        public string Allergies { get; set; } = string.Empty;

        [StringLength(50)]
        [DataType(DataType.Text)]
        [Column("Intolerances")]
        public string Intolerances { get; set; } = string.Empty;

        [StringLength(500)]
        [DataType(DataType.MultilineText)]
        [Column("Note")]
        public string? Note { get; set; }

        [Required]
        [ForeignKey("Invitation")]
        [Column("InvitationId")]
        public int InvitationRefId { get; set; }

        public virtual Invitee? Invitation { get; set; }
    }
}
