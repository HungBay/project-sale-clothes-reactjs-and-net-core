using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Ecommerce.Repository.Interfaces
{
    public interface IOrderReponsitory : IRepository<Order>
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
