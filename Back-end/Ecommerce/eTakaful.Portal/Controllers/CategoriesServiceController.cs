using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesServiceController : ControllerBase
    {
        private CategoriesClientController client;

        public CategoriesServiceController()
        {
            client = new CategoriesClientController();
        }

        public async Task<IEnumerable<Category>> GetCategoriesSynchrnously(IEnumerable<Guid> categoriesId)
        {
            var categories = new List<Category>();
            foreach(var Id in categoriesId)
            {
                categories.Add(await client.GetCategory(Id));
            }
            return categories;
        }

        public async Task<IEnumerable<Category>> GetCategoriesInParallel(IEnumerable<Guid> categoriesId)
        {
            var tasks = categoriesId.Select(Id => client.GetCategory(Id));
            var categories = await Task.WhenAll(tasks);

            return categories;
        }

        public async Task<IEnumerable<Category>> GetCategoriesInParallelFixed(IEnumerable<Guid> categoriesId)
        {
            var categries = new List<Category>();
            var batchSize = 100;
            int numberOfBatchs = (int)Math.Ceiling((double)categoriesId.Count() / batchSize);

            for(var i = 0; i < numberOfBatchs; i++)
            {
                var currentIds = categoriesId.Skip(i * batchSize).Take(batchSize);
                var tasks = currentIds.Select(Id => client.GetCategory(Id));
                categries.AddRange(await Task.WhenAll(tasks));
            }

            return categries;
        }

        [HttpGet("GetCategories")]
        public async Task<IEnumerable<Category>> GetCategoriesInParallelInWithBatches(IEnumerable<Guid> categoriesId)
        {
            var tasks = new List<Task<IEnumerable<Category>>>();
            var batchSize = 100;
            int numberOfBatchs = (int)Math.Ceiling((double)categoriesId.Count() / batchSize);

            for(var i = 0; i < numberOfBatchs; i++)
            {
                var currentIds = categoriesId.Skip(i * batchSize).Take(batchSize);
                tasks.Add(client.GetCategories(currentIds));
            }
            return (await Task.WhenAll(tasks)).SelectMany(u => u);
        }
    }
}