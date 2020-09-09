using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Services
{
    public class OrderService : EcommerceServices<Order>, IOrderService
    {
        
        private readonly IOrderReponsitory _orderReponsitory;
        private readonly IMapper _mapper;

        public OrderService(IOrderReponsitory orderReponsitory, IMapper mapper) : base(orderReponsitory)
        {
            _orderReponsitory = orderReponsitory;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdmin()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdmin();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminCreateOrder()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdminCreateOrder();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminPaidOrder()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdminPaidOrder();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminStatistical()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdminStatistical();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByDay()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdminStatisticalByDay();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByRealTime()
        {
            return await _orderReponsitory.GetAllOrderByAdminStatisticalByRealTime();
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByMonth()
        {
            
            var orders = await _orderReponsitory.GetAllOrderByAdminStatisticalByMonth();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByYear()
        {
            var orders = await _orderReponsitory.GetAllOrderByAdminStatisticalByYear();
            return orders;
        }

        public async Task<IEnumerable<Order>> getOrderByCustomer(Guid Id)
        {
            return await _orderReponsitory.getOrderByCustomer(Id);
        }

        public async Task<IEnumerable<Order>> getOrderByEmployeeId(Guid Id)
        {
            return await _orderReponsitory.getOrderByEmployeeId(Id);
        }
    }
}
