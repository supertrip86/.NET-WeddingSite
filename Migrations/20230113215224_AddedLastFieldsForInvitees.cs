using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeddingSite.BackEnd.Migrations
{
    public partial class AddedLastFieldsForInvitees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Invitees",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Welcome",
                table: "Invitees",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Invitees");

            migrationBuilder.DropColumn(
                name: "Welcome",
                table: "Invitees");
        }
    }
}
