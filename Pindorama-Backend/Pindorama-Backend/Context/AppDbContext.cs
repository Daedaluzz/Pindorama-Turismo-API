﻿using Microsoft.EntityFrameworkCore;
using Pindorama_Backend.Models;

namespace Pindorama_Backend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            base.OnModelCreating(modelBuilder);

            // Configure enum properties to be stored as strings
            modelBuilder.Entity<Passagem>()
                .Property(p => p.Assento)
                .HasConversion<string>();

            modelBuilder.Entity<Passagem>()
                .Property(p => p.Portao)
                .HasConversion<string>();

            modelBuilder.Entity<Passagem>()
                .Property(p => p.Terminal)
                .HasConversion<string>();
            modelBuilder.Entity<Usuario>()
                .Property(p => p.TipoUsuario)
                .HasConversion<string>();

            // Configure many-to-many join table
            modelBuilder.Entity<Pacote>()
                .HasMany(p => p.Passagens)
                .WithMany(p => p.Pacotes)
                .UsingEntity(j => j.ToTable("PacotePassagem"));

            // Additional configurations...

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Passagem> Passagens { get; set; }
        public DbSet<Pacote> Pacotes { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Viagem> Viagens { get; set; }


    }
}
