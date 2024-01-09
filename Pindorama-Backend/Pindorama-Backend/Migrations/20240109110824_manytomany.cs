using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pindorama_Backend.Migrations
{
    /// <inheritdoc />
    public partial class manytomany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Terminal",
                table: "Passagens",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Portao",
                table: "Passagens",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Assento",
                table: "Passagens",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Pacotes",
                columns: table => new
                {
                    PacoteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Destino = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DiasHospedagem = table.Column<int>(type: "int", nullable: false),
                    Ida = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Volta = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Promocao = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Preco = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacotes", x => x.PacoteId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

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

            migrationBuilder.DropTable(
                name: "Pacotes");

            migrationBuilder.AlterColumn<int>(
                name: "Terminal",
                table: "Passagens",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Portao",
                table: "Passagens",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Assento",
                table: "Passagens",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
