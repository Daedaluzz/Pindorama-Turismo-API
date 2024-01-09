using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pindorama_Backend.Models
{
    [Table("Pacotes")]
    public class Pacote
    {
        public Pacote() { 
        
        Passagens = new HashSet<Passagem>();
        }

        [Key]
        public int PacoteId { get; set; }

    public string Nome { get; set; }
        public string Destino { get; set; }
        public int DiasHospedagem { get; set; }
        public DateTime Ida { get; set; }
        public DateTime Volta { get; set; }
        public Boolean Promocao { get; set; }
        public decimal Preco { get; set; }
    
        public ICollection<Passagem> Passagens { get; set; }
    }
}
