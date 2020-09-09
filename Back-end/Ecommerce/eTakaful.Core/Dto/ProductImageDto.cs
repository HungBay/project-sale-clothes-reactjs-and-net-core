using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class ProductImageDto
    {
        //public string Name { get; set; }

        ////public string Url { get; set; }

        //public bool ImageMain { get; set; }

        public Guid ProductId { get; set; }

        public ICollection<IFormFile> Image { get; set; }
    }
}
