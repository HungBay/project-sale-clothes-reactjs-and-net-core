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
    public class RateService : EcommerceServices<Rate>, IRateService
    {
        private readonly IRateReponsitory _rateReponsitory;
        private readonly IMapper _mapper;

        public RateService(IRateReponsitory rateReponsitory, IMapper mapper) : base(rateReponsitory)
        {
            _rateReponsitory = rateReponsitory;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Rate>> GetRatesByProductId(Guid Id)
        {
            var rates = await _rateReponsitory.GetRatesByProductId(Id);
            return rates;
        }
    }
}
