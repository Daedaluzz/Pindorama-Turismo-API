using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pindorama_Backend.Context;
using Pindorama_Backend.Enums;
using Pindorama_Backend.Models;

namespace Pindorama_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassagemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PassagemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Passagems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passagem>>> GetPassagens()
        {
            return await _context.Passagens.ToListAsync();
        }

        // GET: api/Passagems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passagem>> GetPassagem(int id)
        {
            var passagem = await _context.Passagens.FindAsync(id);

            if (passagem == null)
            {
                return NotFound();
            }

            return passagem;
        }

        // PUT: api/Passagems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassagem(int id, Passagem passagem)
        {
            if (id != passagem.PassagemId)
            {
                return BadRequest();
            }

            _context.Entry(passagem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassagemExists(id))
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

        // POST: api/Passagems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passagem>> PostPassagem(Passagem passagem)
        {
          
            _context.Passagens.Add(passagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassagem", new { id = passagem.PassagemId }, passagem);
        }

        // DELETE: api/Passagems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassagem(int id)
        {
            var passagem = await _context.Passagens.FindAsync(id);
            if (passagem == null)
            {
                return NotFound();
            }

            _context.Passagens.Remove(passagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassagemExists(int id)
        {
            return _context.Passagens.Any(e => e.PassagemId == id);
        }
    }
}
