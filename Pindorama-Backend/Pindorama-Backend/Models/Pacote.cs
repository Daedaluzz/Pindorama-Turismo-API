using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pindorama_Backend.Models
{
    [Table("Pacotes")]
    public class Pacote
    {
        public Pacote()
        {

            Passagens = new HashSet<Passagem>();
            Viagens = new HashSet<Viagem>();
        }

        [Key]
        public int PacoteId { get; set; }

        public string Nome { get; set; }
        public string Destino { get; set; }
        public int DiasHospedagem { get; set; }

        [DataType(DataType.DateTime)] // Use DataType.DateTime to include both date and time
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime Ida { get; set; }

        [DataType(DataType.DateTime)] // Use DataType.DateTime to include both date and time
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime Volta { get; set; }
        public Boolean Promocao { get; set; }
        public decimal Preco { get; set; }

        public ICollection<Passagem> Passagens { get; set; }
        public ICollection<Viagem> Viagens { get; set; }
    }
}
