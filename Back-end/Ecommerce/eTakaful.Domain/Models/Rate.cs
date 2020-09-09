using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class Rate : BaseModel
    {
        public Vote Rating { get; set; } = Vote.Non;

        #region ForeignKey

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        #endregion
    }

    public enum Vote
    {
        Non = 0,
        VeryBad = 1,
        Bad = 2,
        Normal = 3,
        Pretty = 4,
        VeryBeautiful = 5
    }
}
