using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class ReviewDto
    {
        public string Comment { get; set; }
        public IFormFile Image { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
    }
}
