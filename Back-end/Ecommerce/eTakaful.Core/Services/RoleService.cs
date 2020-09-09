using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;

namespace Ecommerce.Service.Services
{
    public class RoleService : EcommerceServices<Role>, IRoleServices
    {
        private readonly IRoleReponsitory _roleReponsitory;
        private readonly IMapper _mapper;


        public RoleService(IRoleReponsitory roleReponsitory, IMapper mapper) : base(roleReponsitory)
        {
            _roleReponsitory = roleReponsitory;
            _mapper = mapper;
        }
    }
}
