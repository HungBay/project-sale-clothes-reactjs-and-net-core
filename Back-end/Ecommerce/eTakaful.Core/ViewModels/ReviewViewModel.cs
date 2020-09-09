using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class ReviewViewModel
    {
        public string Comment { get; set; }

        public DateTime Date { get; set; }

        public byte[] Image { get; set; }

        public Guid UserId { get; set; }
        public virtual UserViewModel User { get; set; }
    }
}
