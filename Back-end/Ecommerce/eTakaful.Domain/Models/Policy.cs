using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Domain.Models
{
    [Table("Policy")]
    public class Policy : BaseModel
    {
        [Required]
        public string PolicyNo { get; set; }

        [Required]
        [ForeignKey("OwnerFK")]
        public Person Owner { get; set; }

        public Guid OwnerFK { get; set; }

        [ForeignKey("SpouseFK")]
        public Person Spouse { get; set; }

        public Guid SpouseFK { get; set; }

        [Required, ForeignKey("PlanFK")]
        public TakafulPlan Plan { get; set; }

        public Guid PlanFK { get; set; }

        private ICollection<Nomination> _nominations;

        [Required, ForeignKey("Id")]
        public virtual ICollection<Nomination> Nominations
        {
            get => _nominations ?? (_nominations = new Collection<Nomination>());
            set => _nominations = value;
        }

        public string Status { get; set; }
    }
}