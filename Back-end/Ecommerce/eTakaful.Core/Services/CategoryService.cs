using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;

namespace Ecommerce.Service.Services
{
    public class CategoryService : EcommerceServices<Category>, ICategoryService
    {
        private readonly ICategoryReponsitory _categoryReponsitory;        
        private readonly IMapper _mapper;

        public CategoryService(ICategoryReponsitory categoryReponsitory, IMapper mapper) : base(categoryReponsitory)
        {
            _categoryReponsitory = categoryReponsitory;           
            _mapper = mapper;
        }        

        public async Task<ICollection<CategoryViewModel>> GetCategoryParrent()
        {
            var category = await _categoryReponsitory.GetCategoryParrent();
            return _mapper.Map<List<CategoryViewModel>>(category);
        }
    }
}
