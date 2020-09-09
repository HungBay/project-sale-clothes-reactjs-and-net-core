using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class ColorService : EcommerceServices<Color>, IColorService
    {
        private readonly IColorReponsitory _colorReponsitory;
        private readonly IMapper _mapper;

        public ColorService(IColorReponsitory colorReponsitory, IMapper mapper) : base(colorReponsitory)
        {
            _colorReponsitory = colorReponsitory;
            _mapper = mapper;
        }
    }
}
