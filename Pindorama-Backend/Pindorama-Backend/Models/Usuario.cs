using Pindorama_Backend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pindorama_Backend.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        public Usuario()
        {
            Viagens = new HashSet<Viagem>();
        }

        [Key]
        public int UsuarioId { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Telefone { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateOnly DataNascimento { get; set; }
        [Required]
        public TipoUsuario TipoUsuario { get; set; }
        [Required]
        public string Senha { get; set; }

        public ICollection<Viagem> Viagens { get; set; }

    }
}
