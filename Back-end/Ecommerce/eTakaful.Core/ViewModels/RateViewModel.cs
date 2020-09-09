using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class RateViewModel
    {
        public Vote Rating { get; set; }
        public Guid UserId { get; set; }
        public virtual UserViewModel User { get; set; }
    }
}
