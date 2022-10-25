using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeddingSite.BackEnd.Migrations
{
    public partial class AddedUniqueConstraintOverNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Invitees_LastName_FirstName",
                table: "Invitees",
                columns: new[] { "LastName", "FirstName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Guests_LastName_FirstName",
                table: "Guests",
                columns: new[] { "LastName", "FirstName" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Invitees_LastName_FirstName",
                table: "Invitees");

            migrationBuilder.DropIndex(
                name: "IX_Guests_LastName_FirstName",
                table: "Guests");
        }
    }
}
