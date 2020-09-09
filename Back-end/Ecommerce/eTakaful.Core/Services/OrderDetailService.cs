using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Service.Services
{
    public class OrderDetailService : EcommerceServices<OrderDetail>, IOrderDetailService
    {
        public readonly IOrderDetailReponsitory _orderDetailReponsitory;
        public readonly IMapper _mapper;

        public OrderDetailService(IOrderDetailReponsitory orderDetailReponsitory, IMapper mapper) : base(orderDetailReponsitory)
        {
            _orderDetailReponsitory = orderDetailReponsitory;
            _mapper = mapper;
        }
    }
}
