using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pindorama_Backend.Models
{
    [Table("Viagens")]
    public class Viagem
    {
        public Viagem()
        {
            Pacotes = new HashSet<Pacote>();
            Passagens = new HashSet<Passagem>();

        }
        [Key]
        public int ViagemId { get; set; }
        [Required]

        public int UsuarioId { get; set; }  // Foreign key property
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }  // Navigation property

        public ICollection<Pacote> Pacotes { get; set; }
        public ICollection<Passagem> Passagens { get; set; }



        [Required]
        public DateTime Datacompra { get; set; }
        [Required]
        public Decimal PrecoTotal { get; set; }

    }
}
