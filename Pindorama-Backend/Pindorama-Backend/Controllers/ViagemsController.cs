using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pindorama_Backend.Context;
using Pindorama_Backend.Models;

namespace Pindorama_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViagemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ViagemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Viagems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Viagem>>> GetViagens()
        {
            return await _context.Viagens.ToListAsync();
        }

        // GET: api/Viagems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Viagem>> GetViagem(int id)
        {
            var viagem = await _context.Viagens.FindAsync(id);

            if (viagem == null)
            {
                return NotFound();
            }

            return viagem;
        }

        // PUT: api/Viagems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutViagem(int id, Viagem viagem)
        {
            if (id != viagem.ViagemId)
            {
                return BadRequest();
            }

            var existingViagem = await _context.Viagens
                .Include(v => v.Pacotes)
                .Include(v => v.Passagens)
                .FirstOrDefaultAsync(v => v.ViagemId == id);

            if (existingViagem == null)
            {
                return NotFound();
            }

            // Update scalar properties
            _context.Entry(existingViagem).CurrentValues.SetValues(viagem);

            // Update or add Pacotes
            foreach (var pacote in viagem.Pacotes)
            {
                if (!existingViagem.Pacotes.Any(p => p.PacoteId == pacote.PacoteId))
                {
                    // If Pacote is not already associated, add it
                    existingViagem.Pacotes.Add(pacote);
                }
            }

            // Remove Pacotes that are not in the updated list
            foreach (var pacote in existingViagem.Pacotes.ToList())
            {
                if (!viagem.Pacotes.Any(p => p.PacoteId == pacote.PacoteId))
                {
                    existingViagem.Pacotes.Remove(pacote);
                }
            }

            // Update or add Passagens
            foreach (var passagem in viagem.Passagens)
            {
                if (!existingViagem.Passagens.Any(p => p.PassagemId == passagem.PassagemId))
                {
                    // If Passagem is not already associated, add it
                    existingViagem.Passagens.Add(passagem);
                }
            }

            // Remove Passagens that are not in the updated list
            foreach (var passagem in existingViagem.Passagens.ToList())
            {
                if (!viagem.Passagens.Any(p => p.PassagemId == passagem.PassagemId))
                {
                    existingViagem.Passagens.Remove(passagem);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViagemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Viagems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Viagem>> PostViagem(Viagem viagem)
        {
            _context.Viagens.Add(viagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetViagem", new { id = viagem.ViagemId }, viagem);
        }

        // DELETE: api/Viagems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViagem(int id)
        {
            var viagem = await _context.Viagens.FindAsync(id);
            if (viagem == null)
            {
                return NotFound();
            }

            _context.Viagens.Remove(viagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ViagemExists(int id)
        {
            return _context.Viagens.Any(e => e.ViagemId == id);
        }
    }
}
