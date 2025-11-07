using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ImageEntityRenamed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GigImages_AspNetUsers_UserId",
                table: "GigImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GigImages",
                table: "GigImages");

            migrationBuilder.RenameTable(
                name: "GigImages",
                newName: "UserImages");

            migrationBuilder.RenameIndex(
                name: "IX_GigImages_UserId",
                table: "UserImages",
                newName: "IX_UserImages_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserImages",
                table: "UserImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserImages_AspNetUsers_UserId",
                table: "UserImages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserImages_AspNetUsers_UserId",
                table: "UserImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserImages",
                table: "UserImages");

            migrationBuilder.RenameTable(
                name: "UserImages",
                newName: "GigImages");

            migrationBuilder.RenameIndex(
                name: "IX_UserImages_UserId",
                table: "GigImages",
                newName: "IX_GigImages_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GigImages",
                table: "GigImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GigImages_AspNetUsers_UserId",
                table: "GigImages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
