using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Services
{
    public class ProductImageService : EcommerceServices<ProductImage>, IProductImageService
    {
        private readonly IProductImage _productImageRespository;
        private readonly IMapper _mapper;

        public ProductImageService(IProductImage productImageRespository, IMapper mapper) : base(productImageRespository)
        {
            _productImageRespository = productImageRespository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductImage>> GetProductImageByProductId(Guid Id)
        {
            return await _productImageRespository.GetProductImageByProductId(Id);
        }
    }
}
