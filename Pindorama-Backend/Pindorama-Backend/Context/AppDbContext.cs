using Microsoft.EntityFrameworkCore;
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
        }
        public DbSet<Passagem> Passagens { get; set; }


    }
}
