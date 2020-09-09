using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure.Extensions;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Ecommerce.Portal.Infrastructure;

namespace Ecommerce.Portal.Controllers
{
    [Authorize(Roles = CustomRoles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        { 
            _categoryService = categoryService;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all category items not condition
        /// </summary>
        /// <returns>list category</returns>
        /// 
        [HttpGet("GetCategories")]
        public async Task<ApiResponse> GetCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            if (categories != null && categories.Any())
            {
                var result =_mapper.Map<List<CategoryViewModel>>(categories);
                return new ApiResponse("All category items", result, 200);
            }

            return new ApiResponse("No item", null, 200);
        }

        [HttpGet("GetCategories/{id}")]
        public async Task<ApiResponse> GetCategoriesById([FromRoute] Guid id)
        {
            var categories = await _categoryService.GetByIdAsync(id);
            if (categories != null)
            {
                var result = _mapper.Map<CategoryViewModel>(categories);
                return new ApiResponse($"category by id {id}", result, 200);
            }

            return new ApiResponse("No item", null, 200);
        }
        [HttpPost("createCategory")]
        [AllowAnonymous]
        public async Task<ApiResponse> createCategory([FromBody] CategoryDto dto)
        {
            if (dto.Id == Guid.Empty)
            {
                var categoryDto = _mapper.Map<Category>(dto);
                await _categoryService.AddAsync(categoryDto);
                var vm = _mapper.Map<CategoryViewModel>(categoryDto);
                return new ApiResponse("success", vm, 200);
            }

            return new ApiResponse("No item", null, 200);
        }

        [HttpPost("updateCategory/{id}")]
        public async Task<ApiResponse> updateCategory([FromRoute] Guid id, [FromBody] CategoryDto dto)
        {
            var categories = await _categoryService.GetByIdAsync(id);
            if (categories != null)
            {
                categories.UpdatedDate = DateTime.Now;
                dto.Id = id;
                var categoryDto = _mapper.Map(dto, categories);
                
                await _categoryService.UpdateAsync(categoryDto);
                var result = _mapper.Map<CategoryViewModel>(categoryDto);
                return new ApiResponse("success", result, 200);
            }

            return new ApiResponse("No item", null, 200);
        }

        [HttpPost("deleteCategory/{id}")]
        public async Task<ApiResponse> deleteCategory([FromRoute] Guid id)
        {
            var categories = await _categoryService.GetByIdAsync(id);
            if (categories != null)
            {
                categories.UpdatedDate = DateTime.Now;
                categories.Status = Domain.Enums.Status.nonActive;

                await _categoryService.UpdateAsync(categories);
                var result = _mapper.Map<CategoryViewModel>(categories);
                return new ApiResponse("success", result, 200);
            }

            return new ApiResponse("No item", null, 200);
        }

        [HttpGet("GetCategoryParrent")]
        public async Task<ICollection<CategoryViewModel>> GetCategoryParrent()
        {
            var category = await _categoryService.GetCategoryParrent();
            return category;
        }

        [HttpPost("create-or-edit-category")]
        public async Task<ApiResponse> CreateOrEditCategory(CategoryDto dto)
        {
            if (!ModelState.IsValid)
            {
                throw new ApiException(ModelState.AllErrors());
            }
            // Case insert
            if (dto.Id == Guid.Empty)
            {
                var category = _mapper.Map<Category>(dto);
                category.UpdatedDate = null;
                await _categoryService.AddAsync(category);
                return new ApiResponse("New record has been created to the database", dto, 201);
            }

            var categoryOld = await _categoryService.GetByIdAsync(dto.Id);
            if (categoryOld != null)
            {
                var newCategory = _mapper.Map(dto, categoryOld);
                newCategory.UpdatedDate = DateTime.Now;
                await _categoryService.UpdateAsync(newCategory);
                return new ApiResponse($"Record has been updated with id {dto.Id} to the database", dto, 201);
            }
            throw new ApiException($"Record with id: {dto.Id} does not exist.", 400);
        }
    }  
}
