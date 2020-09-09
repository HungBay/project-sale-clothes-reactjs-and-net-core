using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ecommerce.Domain.Models
{
    public class User : BaseModel
    {
        [Required]
        [MaxLength(256)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(256)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(256)]
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [MaxLength(50)]
        public string Address { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public byte[] ImageUser { get; set; }

        public int? AccumulatedPoints { get; set; } = 0;
        #region ForeignKey

        [ForeignKey("Role")]
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; }

        //public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Review> Comments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        #endregion
    }
}
