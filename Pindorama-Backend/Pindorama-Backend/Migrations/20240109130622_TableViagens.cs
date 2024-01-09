using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pindorama_Backend.Migrations
{
    /// <inheritdoc />
    public partial class TableViagens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Viagens",
                columns: table => new
                {
                    ViagemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    Datacompra = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PrecoTotal = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viagens", x => x.ViagemId);
                    table.ForeignKey(
                        name: "FK_Viagens_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PacoteViagem",
                columns: table => new
                {
                    PacotesPacoteId = table.Column<int>(type: "int", nullable: false),
                    ViagensViagemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PacoteViagem", x => new { x.PacotesPacoteId, x.ViagensViagemId });
                    table.ForeignKey(
                        name: "FK_PacoteViagem_Pacotes_PacotesPacoteId",
                        column: x => x.PacotesPacoteId,
                        principalTable: "Pacotes",
                        principalColumn: "PacoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PacoteViagem_Viagens_ViagensViagemId",
                        column: x => x.ViagensViagemId,
                        principalTable: "Viagens",
                        principalColumn: "ViagemId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PassagemViagem",
                columns: table => new
                {
                    PassagensPassagemId = table.Column<int>(type: "int", nullable: false),
                    ViagensViagemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassagemViagem", x => new { x.PassagensPassagemId, x.ViagensViagemId });
                    table.ForeignKey(
                        name: "FK_PassagemViagem_Passagens_PassagensPassagemId",
                        column: x => x.PassagensPassagemId,
                        principalTable: "Passagens",
                        principalColumn: "PassagemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassagemViagem_Viagens_ViagensViagemId",
                        column: x => x.ViagensViagemId,
                        principalTable: "Viagens",
                        principalColumn: "ViagemId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PacoteViagem_ViagensViagemId",
                table: "PacoteViagem",
                column: "ViagensViagemId");

            migrationBuilder.CreateIndex(
                name: "IX_PassagemViagem_ViagensViagemId",
                table: "PassagemViagem",
                column: "ViagensViagemId");

            migrationBuilder.CreateIndex(
                name: "IX_Viagens_UsuarioId",
                table: "Viagens",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PacoteViagem");

            migrationBuilder.DropTable(
                name: "PassagemViagem");

            migrationBuilder.DropTable(
                name: "Viagens");
        }
    }
}
