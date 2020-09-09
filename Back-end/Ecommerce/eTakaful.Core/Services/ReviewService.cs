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
    public class ReviewService : EcommerceServices<Review>, IReviewService
    {
        private readonly IReviewReponsitory _reviewReponsitory;
        private readonly IMapper _mapper;
        public ReviewService(IReviewReponsitory reviewReponsitory, IMapper mapper) : base(reviewReponsitory)
        {
            _reviewReponsitory = reviewReponsitory;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Review>> GetReviewByProduct(Guid Id)
        {
            return await _reviewReponsitory.GetReviewByProduct(Id);
        }
    }
}
