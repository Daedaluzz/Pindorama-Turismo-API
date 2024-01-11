using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pindorama_Backend.Migrations
{
    /// <inheritdoc />
    public partial class configureMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "telefone",
                table: "Usuarios",
                newName: "Telefone");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Telefone",
                table: "Usuarios",
                newName: "telefone");
        }
    }
}
