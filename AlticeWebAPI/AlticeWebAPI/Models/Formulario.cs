using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlticeWebAPI.Models
{
    [Table("Formulario")]
    public class Formulario
    {
        [Key]
        public long Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        [StringLength(200)]
        public string Email { get; set; }
        [Required]
        [StringLength(15)]
        public string Telefone { get; set; }
    }
}
