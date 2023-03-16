using Microsoft.EntityFrameworkCore;

namespace AlticeWebAPI.Models.Context
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) 
        { 
        }

        public DbSet<Formulario>  Formulario { get; set; }         
    }
}
