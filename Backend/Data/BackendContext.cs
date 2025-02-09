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






    }
}