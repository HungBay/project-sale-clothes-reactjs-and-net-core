using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : Controller
    {
        private readonly ISizeService _sizeService;
        private readonly IMapper _mapper;

        public SizeController(ISizeService sizeService, IMapper mapper)
        {
            _sizeService = sizeService;
            _mapper = mapper;
        }

        
        [HttpGet("get-all-size")]
        public async Task<ApiResponse> GetAllSize()
        {
            var sizes = await _sizeService.GetAllAsync();
            var sizeDtos = _mapper.Map<IList<SizeViewModel>>(sizes);
            return new ApiResponse("list user", sizeDtos, 200);
        }


        [HttpGet("get-by-size-id/{Id}")]
        public async Task<ApiResponse> getBySizeId(Guid Id)
        {
            if (Id != Guid.Empty)
            {
                var size = await _sizeService.GetByIdAsync(Id);
                //await _sizeService.DeleteAsync(size);
                return new ApiResponse("Delete size success", size, 200);
            }
            return new ApiResponse("It's not the type of Guid id", Id, 400);
        }

        [HttpPost("create-size")]
        public ApiResponse CreateSize([FromBody] SizeDto dto)
        {
            try
            {
                var size = _mapper.Map<Size>(dto);
                _sizeService.AddAsync(size);
                return new ApiResponse("Add size success", 200);
            }catch(Exception ex)
            {
                return new ApiResponse("Can't add size", ex, 400);
            }
        }

        //by one id
        [HttpDelete("delete-size/{Id}")]
        public async Task<ApiResponse> DeleteSize(Guid Id)
        {
            if(Id != Guid.Empty)
            {
                var size = await _sizeService.GetByIdAsync(Id);
                await _sizeService.DeleteAsync(size);
                return new ApiResponse("Delete size success", size, 200);
            }
            return new ApiResponse("It's not the type of Guid id", Id, 400);
        }

        //list id
        [HttpPost("delete-list-size")]
        public async Task<ApiResponse> DeleteListSize([FromBody] List<GetById> dto)
        {
            foreach(var item in dto)
            {
                if(item.Id != Guid.Empty)
                {
                    var size = await _sizeService.GetByIdAsync(item.Id);
                    if (size != null)
                    {
                        await _sizeService.DeleteAsync(size);
                        return new ApiResponse("Delete size success", size, 200);
                    }
                    return new ApiResponse("size's null", size, 404);
                }
                return new ApiResponse("It's not the type of Guid id", item.Id, 400);
            }
            return new ApiResponse("");
        }
    }
}