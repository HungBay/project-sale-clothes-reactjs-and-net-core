using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.ViewModels
{
    public class OrderDetailViewModel
    {
        public int Quantity { get; set; }

        public Decimal PriceUnit { get; set; }

        public string Size { get; set; }
        public string Color { get; set; }

        #region ForeignKey
        public virtual ProductViewModel Product { get; set; }
        #endregion
    }
}
