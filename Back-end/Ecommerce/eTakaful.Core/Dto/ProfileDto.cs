using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class ProfileDto
    {
        public Guid Id { get; set; }
        public IFormFile ImageUser { get; set; }
    }
}
