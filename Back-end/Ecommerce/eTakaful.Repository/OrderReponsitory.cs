using Ecommerce.Domain;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repository
{
    public class OrderReponsitory : BaseRepository<Order>, IOrderReponsitory
    {
        public OrderReponsitory(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdmin()
        {
            var orders = await DbContext.Orders
                            .Include(u => u.User)
                            .Include(o => o.OrderDetails)
                            .OrderByDescending(date => date.OrderDate)
                            .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminCreateOrder()
        {
            var orders = await DbContext.Orders.Where(rules => (int)rules.StatusOrder == (int)StatusOrder.CREATE)
                            .Include(u => u.User)
                            .Include(o => o.OrderDetails)
                            .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminPaidOrder()
        {
            
            var orders = await DbContext.Orders.Where(rules => (int)rules.StatusOrder == (int)StatusOrder.PAID)
                            .Include(u => u.User)
                            .Include(o => o.OrderDetails)
                            .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetAllOrderByAdminStatistical()
        {
            var orders = await DbContext.Orders.Where(rules => (int)rules.StatusOrder == (int)StatusOrder.PAID)
                            //.Where(date => date.OrderDate >= DateTime.Now.AddMonths(-12))
                            .OrderBy(date => date.OrderDate)
                            .Include(u => u.User)
                            .Include(o => o.OrderDetails)
                            .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByRealTime()
        {

            var orders = await DbContext.Orders
                .GroupBy(date => new { date.OrderDate })
                .OrderBy(date => date.Key.OrderDate)
                .Select(x => new
                {
                    timestamp = (x.Key.OrderDate.Ticks - 621355968000000000) / 10000,
                    total = x.Sum(y => y.Amount)
                }).ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByDay()
        {
            var orders = await DbContext.Orders
                .Where(status => status.StatusOrder == StatusOrder.PAID)
                .GroupBy(date => new { date.OrderDate.Day, date.OrderDate.Month, date.OrderDate.Year})
                .OrderBy(date => date.Key.Month)
                .Select(x => new
                {
                    day = x.Key.Day,
                    month = x.Key.Month,
                    year = x.Key.Year,
                    total = x.Sum(y => y.Amount),
                    count = x.Count(),
                    //timespan = (x.Key.OrderDate.Ticks - 621355968000000000) / 10000
                }).ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByMonth()
        {
            var orders = await DbContext.Orders
                .Where(status => status.StatusOrder == StatusOrder.PAID)
                .GroupBy(date => new { date.OrderDate.Month, date.OrderDate.Year })
                .OrderBy(date => date.Key.Month)
                .Select(x => new
                {
                    month = x.Key.Month,
                    year = x.Key.Year,
                    total = x.Sum(y => y.Amount),
                    count = x.Count(),
                }).ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<object>> GetAllOrderByAdminStatisticalByYear()
        {
            var orders = await DbContext.Orders
                .Where(status => status.StatusOrder == StatusOrder.PAID)
                .GroupBy(date => date.OrderDate.Year)
                .OrderBy(date => date.Key)
                .Select(x => new
                {
                    year = x.Key,
                    total = x.Sum(y => y.Amount)
                }).ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> getOrderByCustomer(Guid Id)
        {
            var orders =
               await DbContext.Orders.Where(p => (int)p.Status == 1 && p.IsDeleted == false)
                .Where(pc => pc.UserId == Id)
                .OrderByDescending(date => date.OrderDate)
                .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> getOrderByEmployeeId(Guid Id)
        {
            var orders = await DbContext.Orders.Where(x => x.EmployeeId == Id).Where(date => date.OrderDate.Month <= DateTime.Now.Month)
                .OrderByDescending(date => date.OrderDate.Month).ToListAsync();
            return orders;
        }
    }
}
