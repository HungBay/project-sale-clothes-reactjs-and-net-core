using Ecommerce.Domain.Models;
using Ecommerce.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Service.Interface
{
    public interface IOrderService : IServices<Order>
    {
        Task<IEnumerable<Order>> GetAllOrderByAdmin();
        Task<IEnumerable<Order>> GetAllOrderByAdminCreateOrder();
        Task<IEnumerable<Order>> GetAllOrderByAdminPaidOrder();
        Task<IEnumerable<Order>> GetAllOrderByAdminStatistical();
        Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByDay();
        Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByMonth();
        Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByYear();
        Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByRealTime();
        Task<IEnumerable<Order>> getOrderByCustomer(Guid Id);

        Task<IEnumerable<Order>> getOrderByEmployeeId(Guid Id);
    }
}
