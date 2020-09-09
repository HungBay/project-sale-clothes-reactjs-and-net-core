using System;
using System.Threading.Tasks;
using Ecommerce.Core.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class PolicyController : Controller
    {
       // private readonly IPolicyService _policyService;

        //public PolicyController(IPolicyService policyService)
        //{
        //    _policyService = policyService;
        //}

        //// GET api/policy/{id}
        //[HttpGet("{id}", Name = "GetPolicy")]
        //public async Task<PolicyViewModel> Get(Guid id)
        //{
        //    var userId = Guid.NewGuid().ToString();
        //    return await _policyService.GetById(id, userId);
        //}

        //// POST api/police
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody]PolicyViewModel model)
        //{
        //    var userId = Guid.NewGuid().ToString();
        //    await _policyService.Create(model, userId);

        //    return CreatedAtRoute("GetPolicy", new { id = model.Id }, model);
        //}
    }
}