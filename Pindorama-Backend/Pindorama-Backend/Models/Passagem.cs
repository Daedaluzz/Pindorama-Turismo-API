using Pindorama_Backend.Enums;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pindorama_Backend.Models
{
    [Table("Passagens")]
    public class Passagem
    {
        public Passagem()
        {

            Pacotes = new HashSet<Pacote>();
        }

        [Key]
        public int PassagemId { get; set; }

        [Required]
        public string CidadeDestino { get; set; }
        [Required]
        public string CidadeOrigem { get; set; }
        [Required]
        public int NumeroBilhete { get; set; }
        public Assento Assento { get; set; }
        public Portao Portao { get; set; }
        public Terminal Terminal { get; set; }

        [DataType(DataType.DateTime)] // Use DataType.DateTime to include both date and time
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime Embarque { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public Decimal Preco { get; set; }

        public ICollection<Pacote> Pacotes { get; set; }



    }
}
