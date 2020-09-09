using System.Threading.Tasks;
using Ecommerce.Domain.Models;

namespace Ecommerce.Repository.Interfaces
{
    public interface IPolicyRepository: IRepository<Policy>
    {
         Task<Policy> GetByPolicyNoAsync(string policyNo);
    }
}