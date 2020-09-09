using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Service.Dto
{
    public class RateDto
    {
        public Vote Rating { get; set; }

        public Guid ProductId { get; set; }

        public Guid UserId { get; set; }
    }
}
