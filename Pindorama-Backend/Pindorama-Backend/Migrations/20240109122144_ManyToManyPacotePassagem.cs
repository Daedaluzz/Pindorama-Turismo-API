using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pindorama_Backend.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyPacotePassagem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passagens_Pacotes_PacoteId",
                table: "Passagens");

            migrationBuilder.DropIndex(
                name: "IX_Passagens_PacoteId",
                table: "Passagens");

            migrationBuilder.DropColumn(
                name: "PacoteId",
                table: "Passagens");

            migrationBuilder.CreateTable(
                name: "PacotePassagem",
                columns: table => new
                {
                    PacotesPacoteId = table.Column<int>(type: "int", nullable: false),
                    PassagensPassagemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacotePassagem", x => new { x.PacotesPacoteId, x.PassagensPassagemId });
                    table.ForeignKey(
                        name: "FK_PacotePassagem_Pacotes_PacotesPacoteId",
                        column: x => x.PacotesPacoteId,
                        principalTable: "Pacotes",
                        principalColumn: "PacoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PacotePassagem_Passagens_PassagensPassagemId",
                        column: x => x.PassagensPassagemId,
                        principalTable: "Passagens",
                        principalColumn: "PassagemId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PacotePassagem_PassagensPassagemId",
                table: "PacotePassagem",
                column: "PassagensPassagemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PacotePassagem");

            migrationBuilder.AddColumn<int>(
                name: "PacoteId",
                table: "Passagens",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Passagens_PacoteId",
                table: "Passagens",
                column: "PacoteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passagens_Pacotes_PacoteId",
                table: "Passagens",
                column: "PacoteId",
                principalTable: "Pacotes",
                principalColumn: "PacoteId");
        }
    }
}
