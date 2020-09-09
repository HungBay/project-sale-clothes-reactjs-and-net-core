using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ecommerce.Domain.Models;

namespace Ecommerce.Core.ViewModels
{
    public class PolicyViewModel
    {
        public Guid Id { get; set; }

        public string PolicyNo { get; set; }

        [Required]
        public PersonViewModel Owner { get; set; }

        public PersonViewModel Spouse { get; set; }

        [Required]
        public Guid PlanId { get; set; }

        [Required]
        public IReadOnlyCollection<NominationViewModel> Nominations { get; set; }

        public string Status { get; set; }
    }
}