using AlticeWebAPI.Models;

namespace AlticeWebAPI.AppServices.Interfaces
{
    public interface IFormularioAppService
    {
        Task<IEnumerable<Formulario>> GetFormularios();
        Task<Formulario> GetFormulario(long id);
        Task<IEnumerable<Formulario>> GetFormularioByName(string name);
        Task CreateFormulario(Formulario formulario);
        Task UpdateFormulario(Formulario formulario);
        Task DeleteFormulario(Formulario formulario);
    }
}
