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
using Ecommerce.Service.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {

        private IProductImageService _productImageService;

        private readonly IMapper _mapper;

        public ProductImageController(IProductImageService productImageService, IMapper mapper)
        {
            _productImageService = productImageService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("get-all-image")]
        public async Task<ApiResponse> GetAllImage()
        {
            var Images = await _productImageService.GetAllAsync();
            var vm = _mapper.Map<List<ProductImageViewModel>>(Images);
            return new ApiResponse("", vm, 200);
        }

        //[HttpPost("upload-image")]
        //public async Task<ApiResponse> Upload([Bind("Id,Name,Url,Image,ImageMain,ProductId")]ProductImage productImage, IFormFile Image)
        //{
        //    if (Image != null)
        //    {
        //        if (Image.Length > 0)
        //        {

        //            byte[] p1 = null;
        //            using (var fs1 = Image.OpenReadStream())
        //            using (var ms1 = new MemoryStream())
        //            {
        //                fs1.CopyTo(ms1);
        //                p1 = ms1.ToArray();
        //            }
        //            productImage.Image = p1;

        //        }

        //        var image = _productImageService.Add(productImage);

        //        return new ApiResponse("test", image, 200);
        //    }
        //    return new ApiResponse("test", 400);
        //}

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            ProductImage img = new ProductImage();
            img.Name = file.FileName;

            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            img.Image = ms.ToArray();

            ms.Close();
            ms.Dispose();
            img.ProductId = new Guid("00a5b282-d5de-47d5-ac8f-75b5b032808a");
            img.Url = file.FileName;


            await _productImageService.AddAsync(img);

            return Ok(file.Length);

        }

        //[HttpGet("get-all-img")]
        //public async Task<IActionResult> GetAll()
        //{
        //    var id = new Guid("cf8ec2df-80c9-46a1-a4cc-3f11cd4da3f5");
        //    ProductImage images = _productImageService.GetByIdAsync(id);

        //    return Ok(images);
        //}

        //[AllowAnonymous]
        //[HttpPost("get-image-by-id")]
        //public async Task<ActionResult> RetrieveImage()
        //{
        //    var lstImage = await _productImageService.GetAllAsync();
        //    List<ProductImageViewModel> prdtos = new List<ProductImageViewModel>();
        //    foreach (var item in lstImage)
        //    {

        //        string imageBase64Data =
        //        Convert.ToBase64String(item.Image);
        //            string imageDataURL =
        //        string.Format("data:image/jpg;base64,{0}",
        //        imageBase64Data);
        //        ProductImageViewModel primage = new ProductImageViewModel();
        //        primage.name = item.Name;
        //        primage.image = imageDataURL;
        //        prdtos.Add(primage);
        //    }
        //    //var id = new Guid("cf8ec2df-80c9-46a1-a4cc-3f11cd4da3f5");
        ////    ProductImage img = await _productImageService.GetByIdAsync(id);
        ////    string imageBase64Data =
        ////Convert.ToBase64String(img.Image);
        ////    string imageDataURL =
        ////string.Format("data:image/jpg;base64,{0}",
        ////imageBase64Data);


        //    return Ok(prdtos);
        //}
    }
}