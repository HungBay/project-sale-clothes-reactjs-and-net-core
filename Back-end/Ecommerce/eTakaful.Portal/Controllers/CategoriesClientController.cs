using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ecommerce.Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesClientController : ControllerBase
    {
        private HttpClient client;

        public CategoriesClientController()
        {
            client = new HttpClient();
        }

        public async Task<Category> GetCategory(Guid Id)
        {
            var response = await client.GetAsync("http://localhost:13193/api/CategoriesClient/" + Id).ConfigureAwait(false);

            var category = JsonConvert.DeserializeObject<Category>(await response.Content.ReadAsStringAsync());
            return category;
        }

        public async Task<IEnumerable<Category>> GetCategories(IEnumerable<Guid> Id)
        {
            var response = await client.PostAsync("http://localhost:13193/api/Category/GetCategories", new StringContent(JsonConvert.SerializeObject(Id), Encoding.UTF8, "application/json"))
                .ConfigureAwait(false);
            var categories = JsonConvert.DeserializeObject<IEnumerable<Category>>(await response.Content.ReadAsStringAsync());
            return categories;
        }

        public async Task InsertCategories()
        {
            try
            {
                var response = await client.PostAsync("http://localhost:13193/api/CategoriesClient/GetMany", null).ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
            }catch(Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}