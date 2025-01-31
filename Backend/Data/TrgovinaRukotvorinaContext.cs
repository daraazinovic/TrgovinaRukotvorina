using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class TrgovinaRukotvorinaContext : DbContext
    {
        public TrgovinaRukotvorinaContext(DbContextOptions<TrgovinaRukotvorinaContext> options) : base(options)
        {

        }
        
        public DbSet<Proizvod> Proizvodi { get; set; }
    }

    
    
}
