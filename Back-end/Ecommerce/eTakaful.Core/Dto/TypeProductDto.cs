using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class TypeProductDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }
    }
}
