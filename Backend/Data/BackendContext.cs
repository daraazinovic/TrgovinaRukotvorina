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

            modelBuilder.Entity<Materijal>()
                .HasMany(m => m.Proizvodi)
                .WithMany(p => p.Materijali)
                .UsingEntity<Dictionary<string, string>>("sastavnice",
                c => c.HasOne<Proizvod>().WithMany().HasForeignKey("proizvod"),
                c => c.HasOne<Materijal>().WithMany().HasForeignKey("materijal"),
                c => c.ToTable("sastavnice"));
        }






    }
}