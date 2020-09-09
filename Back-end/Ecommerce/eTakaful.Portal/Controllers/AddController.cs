using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain;
using Ecommerce.Domain.Enums;
using Ecommerce.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AddController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpGet("Addmodel")]
        //public async Task<IActionResult> Add()
        //{

        //    A.Configure<Category>()
        //        .Fill(c => c.CreatedDate, DateTime.Now)
        //        .Fill(c => c.Status).WithRandom(new List<Status>());
        //    var categories = A.ListOf<Category>(200);
        //    _context.AddRange(categories);
        //    _context.SaveChanges();

        //    return Ok();
        //}
    }
}