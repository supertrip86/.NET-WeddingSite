using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeddingSite.BackEnd.Migrations
{
    public partial class AddedPlusOneDiscriminatorForGuests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPlusOne",
                table: "Guests",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPlusOne",
                table: "Guests");
        }
    }
}
