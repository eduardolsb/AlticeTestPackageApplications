using AlticeWebAPI.AppServices.Interfaces;
using AlticeWebAPI.Models;
using AlticeWebAPI.Models.Context;
using Microsoft.EntityFrameworkCore;

namespace AlticeWebAPI.AppServices.Services
{
    public class FormularioAppService : IFormularioAppService
    {
        private readonly Context _context; 
        public FormularioAppService(Context context)
        {
            _context = context; 
        }

        public async Task<IEnumerable<Formulario>> GetFormularios()
        {
            return await _context.Formulario.ToListAsync();
        }

        public async Task<IEnumerable<Formulario>> GetFormularioByName(string name)
        {
            IEnumerable<Formulario> _formulario;
            if (!string.IsNullOrWhiteSpace(name))
            {
                _formulario = await _context.Formulario.Where(a => a.Name == name).ToListAsync();
            }
            else
            {
                _formulario = await GetFormularios();
            }
            return _formulario;
        }

        public async Task<Formulario> GetFormulario(long id)
        {
            return await _context.Formulario.FindAsync(id);
        }

        public async Task CreateFormulario(Formulario formulario)
        {
            _context.Formulario.Add(formulario);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFormulario(Formulario formulario)
        {
            _context.Formulario.Remove(formulario);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateFormulario(Formulario formulario)
        {
            _context.Formulario.Update(formulario);
            await _context.SaveChangesAsync();
        }
    }
}
