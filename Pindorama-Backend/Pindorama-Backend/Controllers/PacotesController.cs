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
    public class PacotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PacotesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pacotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pacote>>> GetPacotes()
        {
            return await _context.Pacotes.ToListAsync();
        }

        // GET: api/Pacotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pacote>> GetPacote(int id)
        {
            var pacote = await _context.Pacotes.FindAsync(id);

            if (pacote == null)
            {
                return NotFound();
            }

            return pacote;
        }

        // PUT: api/Pacotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPacote(int id, Pacote pacote)
        {
            if (id != pacote.PacoteId)
            {
                return BadRequest();
            }

            var existingPacote = await _context.Pacotes
                .Include(p => p.Passagens) // Include Passagens to track changes
                .FirstOrDefaultAsync(p => p.PacoteId == id);

            if (existingPacote == null)
            {
                return NotFound();
            }

            // Update scalar properties
            _context.Entry(existingPacote).CurrentValues.SetValues(pacote);

            // Update or add Passagens
            foreach (var passagem in pacote.Passagens)
            {
                if (!existingPacote.Passagens.Any(p => p.PassagemId == passagem.PassagemId))
                {
                    // If Passagem is not already associated, add it
                    existingPacote.Passagens.Add(passagem);
                }
            }

            // Remove Passagens that are not in the updated list
            foreach (var passagem in existingPacote.Passagens.ToList())
            {
                if (!pacote.Passagens.Any(p => p.PassagemId == passagem.PassagemId))
                {
                    existingPacote.Passagens.Remove(passagem);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacoteExists(id))
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

        // POST: api/Pacotes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pacote>> PostPacote(Pacote pacote)
        {
            _context.Pacotes.Add(pacote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPacote", new { id = pacote.PacoteId }, pacote);
        }

        // DELETE: api/Pacotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePacote(int id)
        {
            var pacote = await _context.Pacotes.FindAsync(id);
            if (pacote == null)
            {
                return NotFound();
            }

            _context.Pacotes.Remove(pacote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PacoteExists(int id)
        {
            return _context.Pacotes.Any(e => e.PacoteId == id);
        }
    }
}
