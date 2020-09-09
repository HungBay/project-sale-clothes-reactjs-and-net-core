using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TypeProductController : ControllerBase
    {
        private ITypeProductService _typeProductService;

        private readonly IMapper _mapper;

        public TypeProductController(ITypeProductService typeProductService, IMapper mapper)
        {
            _typeProductService = typeProductService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("get-all-typeProduct")]
        public async Task<ApiResponse> GetAll()
        {
            var typeProducts = await _typeProductService.GetAllAsync();
            var typeProductDtos = _mapper.Map<IList<TypeProductDto>>(typeProducts);
            return new ApiResponse("list typeProducts", typeProductDtos, 200);
        }

        [AllowAnonymous]
        [HttpPost("create-type-product")]
        public ApiResponse CreateTypeProduct([FromBody] TypeProductDto dto)
        {
            try
            {
                
                var typeProduct = _mapper.Map<Category>(dto);
                _typeProductService.AddAsync(typeProduct);
                return new ApiResponse("Add typeProduct success", 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Can't add typeProduct", ex, 400);
            }
        }
    }
}