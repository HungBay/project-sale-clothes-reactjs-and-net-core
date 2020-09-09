using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Domain.Models
{
    [Table("TakafulPlan")]
    public class TakafulPlan : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal CoverageAmount { get; set; }

        public string Currency { get; set; }

        [Required]
        public string PaymentFrequency { get; set; }

        public string Status { get; set; }

        private ICollection<Policy> _policies;

        [ForeignKey("Id")]
        public virtual ICollection<Policy> Policies
        {
            get => _policies ?? (_policies = new Collection<Policy>());
            set => _policies = value;
        }
    }
}