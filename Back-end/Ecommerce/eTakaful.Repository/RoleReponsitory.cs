using System;
using System.Collections.Generic;
using System.Text;
using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;

namespace Ecommerce.Repository
{
    public class RoleReponsitory : BaseRepository<Role>, IRoleReponsitory
    {
        public RoleReponsitory(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
