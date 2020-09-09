using System.Threading.Tasks;

namespace Ecommerce.Domain
{
    public interface IApplicationDbContextInitializer
    {
        bool EnsureCreated();
        void Migrate();
        Task Seed();
    }
}