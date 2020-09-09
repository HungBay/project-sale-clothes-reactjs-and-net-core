using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class ProductSizeService : EcommerceServices<ProductSize>, IProductSizeService
    {
        private readonly IProductSizeRepository _productSizeReponsitory;
        private readonly IMapper _mapper;

        public ProductSizeService(IProductSizeRepository productSizeReponsitory, IMapper mapper) : base(productSizeReponsitory)
        {
            _productSizeReponsitory = productSizeReponsitory;
            _mapper = mapper;
        }

    }
}
