using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeddingSite.BackEnd.DAL.Models
{
    [Table("Invitees")]
    public class Invitee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("InvitationId")]
        public int InvitationId { get; set; }

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

        [Required]
        [StringLength(100)]
        [DataType(DataType.EmailAddress)]
        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Column("Password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column("Attending")]
        public bool Attending { get; set; }

        [StringLength(500)]
        [DataType(DataType.Text)]
        [Column("Welcome")]
        public string Welcome { get; set; } = string.Empty;

        [StringLength(500)]
        [DataType(DataType.Text)]
        [Column("Note")]
        public string Note { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Text)]
        [Column("Role")]
        public string Role { get; set; } = string.Empty;

        [Required]
        [Column("GuestsCount")]
        public int GuestsCount { get; set; }

        public virtual ICollection<Guest> Guests { get; set; } = new List<Guest>();

        public virtual ActiveInvitee? ActiveInvitee { get; set; }
    }
}