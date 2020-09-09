using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class ProductDetailService : EcommerceServices<ProductCategory>, IProductDetailService
    {
        private readonly IProductDeltaiRepository _productDetailReponsitory;
        private readonly IMapper _mapper;

        public ProductDetailService(IProductDeltaiRepository productDetailReponsitory, IMapper mapper) : base(productDetailReponsitory)
        {
            _productDetailReponsitory = productDetailReponsitory;
            _mapper = mapper;
        }

    }
}
