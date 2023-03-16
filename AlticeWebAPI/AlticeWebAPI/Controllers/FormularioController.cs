using AlticeWebAPI.AppServices.Interfaces;
using AlticeWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlticeWebAPI.Controllers
{
    [Route("api/MEO/[controller]")]
    [ApiController]
    public class FormularioController : ControllerBase
    {
        private IFormularioAppService _formularioAppService;

        public FormularioController(IFormularioAppService paramFormularioAppService) {

            _formularioAppService = paramFormularioAppService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Models.Formulario>>> GetFormularios()
        {
            try
            {
                var formularios = await _formularioAppService.GetFormularios();
                return Ok(formularios);

            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("FormularioPorNome")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Models.Formulario>>> GetFormularioByName([FromQuery] string name)
        {
            try
            {
                var formularios = await _formularioAppService.GetFormularioByName(name);
                if(formularios.Count() == 0)
                {
                    return NotFound($"Não foram encontrados registros com o nome {name}");
                }
                return Ok(formularios);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


        [HttpGet("{id:long}", Name = "GetFormulario")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Models.Formulario>>> GetFormulario(long id)
        {
            try
            {
                var formularios = await _formularioAppService.GetFormulario(id);
                if (formularios == null)
                {
                    return NotFound($"Não foram encontrados registros com a chave {id}");
                }
                return Ok(formularios);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Formulario formulario)
        {
            try
            {
                //StatusCode 201
                await _formularioAppService.CreateFormulario(formulario);
                return CreatedAtRoute(nameof(GetFormulario), new {id = formulario.Id}, formulario);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPut("{id:long}")]
        public async Task<ActionResult> Update(long id, [FromBody] Formulario formulario)
        {
            try
            {
                if(formulario.Id == id)
                {
                    await _formularioAppService.UpdateFormulario(formulario);
                    return Ok($"Formulario {id} atualizado com sucesso");
                }
                //StatusCode 200
                return BadRequest("Dados em não conformidade");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("{id:long}")]
        public async Task<ActionResult> Delete(long id)
        {
            try
            {
                var _formulario = await _formularioAppService.GetFormulario(id);
                if (_formulario != null)
                {
                    await _formularioAppService.DeleteFormulario(_formulario);
                    return Ok($"Formulario {id} excluído com sucesso");
                }
                //StatusCode 200
                return BadRequest("Dados em não conformidade");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
