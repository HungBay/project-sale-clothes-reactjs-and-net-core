using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleServices _roleServices;        
        private readonly AutoMapper.IMapper _mapper;

        public RoleController(IRoleServices roleServices, IMapper mapper)
        {
            _roleServices = roleServices;            
            _mapper = mapper;
        }

        [HttpPost("create-role")]
        public async Task<ApiResponse> CreateRole([FromBody] RoleDto dto)
        {
            try
            {
                var getAllRole = await _roleServices.GetAllAsync();
                foreach(var roleName in getAllRole)
                {
                    if(dto.Name == roleName.Name)
                    {
                        return new ApiResponse("identity entity framework core", dto,400);
                    }
                    
                }
                // save
                var role = _mapper.Map<Role>(dto);
                await _roleServices.AddAsync(role);
                return new ApiResponse("Add role success", 200);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return new ApiResponse("Can't add role", ex, 400);
            }
        }
    }
}