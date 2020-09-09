using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Core.ViewModels
{
    public class TakafulPlanViewModel
    {
        [Required]
        public Guid Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal CoverageAmount { get; set; }

        public string Currency { get; set; }

        [Required]
        public string PaymentFrequency { get; set; }

        public string Status { get; set; }

        public IReadOnlyCollection<PolicyViewModel> Policies;
    }
}