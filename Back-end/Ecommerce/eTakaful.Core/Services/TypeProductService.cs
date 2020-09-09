using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class TypeProductService : EcommerceServices<Category>, ITypeProductService
    {
        private readonly ITypeProductRepository _typeProductRepository;
        private readonly IMapper _mapper;

        public TypeProductService(ITypeProductRepository typeProductRepository, IMapper mapper) : base(typeProductRepository)
        {
            _typeProductRepository = typeProductRepository;
            _mapper = mapper;
        }
    }
}
