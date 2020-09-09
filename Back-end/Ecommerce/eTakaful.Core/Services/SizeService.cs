using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class SizeService : EcommerceServices<Size>, ISizeService
    {
        private readonly ISizeRepository _sizeReponsitory;
        private readonly IMapper _mapper;

        public SizeService(ISizeRepository sizeReponsitory, IMapper mapper) : base(sizeReponsitory)
        {
            _sizeReponsitory = sizeReponsitory;
            _mapper = mapper;
        }
    }
}
