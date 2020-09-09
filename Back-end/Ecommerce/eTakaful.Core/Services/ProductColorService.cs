using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
   
    public class ProductColorService : EcommerceServices<ProductColor>, IProductColorService
    {
        private readonly IProductColorReponsitory _productColorReponsitory;
        private readonly IMapper _mapper;

        public ProductColorService(IProductColorReponsitory productColorReponsitory, IMapper mapper) : base(productColorReponsitory)
        {
            _productColorReponsitory = productColorReponsitory;
            _mapper = mapper;
        }

    }
}
