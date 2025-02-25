using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {

        }

        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Materijal> Materijali { get; set; }
        public DbSet<Vrsta> Vrste { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Materijal>().HasOne(m => m.Vrsta);

            modelBuilder.Entity<Proizvod>()
                .HasMany(m => m.Materijali)
                .WithMany(p => p.Proizvodi)
                .UsingEntity<Dictionary<string, string>>("sastavnice",
                c => c.HasOne<Materijal>().WithMany().HasForeignKey("materijal"),
                c => c.HasOne<Proizvod>().WithMany().HasForeignKey("proizvod"),
                c => c.ToTable("sastavnice"));
        }






    }
}