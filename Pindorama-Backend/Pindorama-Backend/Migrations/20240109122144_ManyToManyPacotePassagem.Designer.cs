﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pindorama_Backend.Context;

#nullable disable

namespace Pindorama_Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240109122144_ManyToManyPacotePassagem")]
    partial class ManyToManyPacotePassagem
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("PacotePassagem", b =>
                {
                    b.Property<int>("PacotesPacoteId")
                        .HasColumnType("int");

                    b.Property<int>("PassagensPassagemId")
                        .HasColumnType("int");

                    b.HasKey("PacotesPacoteId", "PassagensPassagemId");

                    b.HasIndex("PassagensPassagemId");

                    b.ToTable("PacotePassagem");
                });

            modelBuilder.Entity("Pindorama_Backend.Models.Pacote", b =>
                {
                    b.Property<int>("PacoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Destino")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("DiasHospedagem")
                        .HasColumnType("int");

                    b.Property<DateTime>("Ida")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Promocao")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("Volta")
                        .HasColumnType("datetime(6)");

                    b.HasKey("PacoteId");

                    b.ToTable("Pacotes");
                });

            modelBuilder.Entity("Pindorama_Backend.Models.Passagem", b =>
                {
                    b.Property<int>("PassagemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Assento")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CidadeDestino")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CidadeOrigem")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Embarque")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("NumeroBilhete")
                        .HasColumnType("int");

                    b.Property<string>("Portao")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("Terminal")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("PassagemId");

                    b.ToTable("Passagens");
                });

            modelBuilder.Entity("PacotePassagem", b =>
                {
                    b.HasOne("Pindorama_Backend.Models.Pacote", null)
                        .WithMany()
                        .HasForeignKey("PacotesPacoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Pindorama_Backend.Models.Passagem", null)
                        .WithMany()
                        .HasForeignKey("PassagensPassagemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
