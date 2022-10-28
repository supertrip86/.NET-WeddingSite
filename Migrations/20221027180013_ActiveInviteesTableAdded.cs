using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeddingSite.BackEnd.Migrations
{
    public partial class ActiveInviteesTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActiveInvitees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", maxLength: 2147483647, nullable: false),
                    Active = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InvitationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveInvitees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiveInvitees_Invitees_InvitationId",
                        column: x => x.InvitationId,
                        principalTable: "Invitees",
                        principalColumn: "InvitationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiveInvitees_InvitationId",
                table: "ActiveInvitees",
                column: "InvitationId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiveInvitees");
        }
    }
}
