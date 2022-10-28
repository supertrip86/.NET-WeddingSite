using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeddingSite.BackEnd.DAL.Models
{
    [Table("ActiveInvitees")]
    public class ActiveInvitee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        public int Id { get; set; }

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
        [DataType(DataType.Text)]
        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(int.MaxValue)]
        [DataType(DataType.Text)]
        [Column("RefreshToken")]
        public string RefreshToken { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.DateTime)]
        [Column("Active")]
        public DateTime Active { get; set; } = DateTime.Now;

        [Required]
        [ForeignKey("Invitation")]
        [Column("InvitationId")]
        public int InvitationRefId { get; set; }

        public virtual Invitee? Invitation { get; set; }
    }
}
