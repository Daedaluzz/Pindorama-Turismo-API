using Microsoft.AspNetCore.Mvc;
using Pindorama_Backend.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Pindorama_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnumController : ControllerBase
    {
        // GET: api/Enum
        [HttpGet]
        public ActionResult<Dictionary<string, List<string>>> GetEnums()
        {
            var enumClasses = typeof(Pindorama_Backend.Enums.Portao)
                .Assembly
                .GetTypes()
                .Where(type => type.IsEnum)
                .ToDictionary(
                    type => type.Name,
                    type => Enum.GetNames(type).ToList()
                );

            return Ok(enumClasses);
        }
    }
}
