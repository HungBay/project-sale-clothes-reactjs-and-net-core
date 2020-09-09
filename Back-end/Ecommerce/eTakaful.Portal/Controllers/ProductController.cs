using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Enums;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure;
using Ecommerce.Portal.Infrastructure.Helper;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Portal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        
        private IProductSevice _productService;

        private ICategoryService _categoryService;

        private IColorService _colorService;

        private IRateService _rateService;

        private IReviewService _reviewService;

        private IProductDetailService _productDetailService;

        private IProductSizeService _productSizeService;

        private IProductImageService _productImageService;

        private IUserService _userService;

        private IOrderService _orderService;

        private IOrderDetailService _orderDetailService;

        private readonly IMapper _mapper;

        public ProductController(IProductSevice productService, 
            IProductDetailService productDetailService,
            IProductSizeService productSizeService,
            IProductImageService productImageService,
            IColorService colorService,
            IRateService rateService,
            IReviewService reviewService,
            IUserService userService,
            IOrderService orderService,
            IOrderDetailService orderDetailService,
        ICategoryService categoryService, IMapper mapper)
        {
            _productService = productService;
            _categoryService = categoryService;
            _productDetailService = productDetailService;
            _productSizeService = productSizeService;
            _productImageService = productImageService;
            _colorService = colorService;
            _rateService = rateService;
            _reviewService = reviewService;
            _userService = userService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
            _mapper = mapper;
        }

        #region API Product
        /// <summary>
        /// get all data product of category: user
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-products")]
        public ApiResponse GetAll()
        {
            var products = _productService.GetAll();
            var productDtos = _mapper.Map<IList<ProductViewModel>>(products);
            return new ApiResponse("list products", productDtos, 200);
        }

        [AllowAnonymous]
        [HttpGet("get-all-products-by-category/{id}")]
        public async Task<ApiResponse> getAllProductsByCategory([FromRoute] Guid id)
        {
            var products = await _productService.GetProductsByCategory(id);
            var vm = _mapper.Map<IList<ProductViewModel>>(products);
            return new ApiResponse("success", vm, 200);
        }

        /// <summary>
        /// get all products: by admin
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.AdminOrMod)]
        [HttpGet("get-all-products-by-admin")]
        public async Task<ApiResponse> GetAllProductAdmin()
        {
            var products = await _productService.GetAllAsync();
            var productDtos = _mapper.Map<IList<ProductViewModel>>(products);
            return new ApiResponse("list products", productDtos, 200);
        }

        /// <summary>
        /// get product by id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-product-by-id/{Id}")]
        public async Task<ApiResponse> GetProductById(Guid Id)
        {
            try
            {
                var product = await _productService.GetByIdAsync(Id);
                if (product == null)
                    return new ApiResponse("Khong tim thay san pham nao", Id, 400);
                var productDtos = _mapper.Map<ProductViewModel>(product);
                return new ApiResponse("san pham by id ", productDtos, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Loi", ex, 400);
            }
        }

        /// <summary>
        /// upload image product
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        //[Authorize(Roles = CustomRoles.AdminOrMod)]
        [AllowAnonymous]
        [HttpPost("uploadImage/product")]
        public async Task<ApiResponse> UploadImage([FromForm]Guid Id, [FromForm]IFormFile file)
        {
            try
            {
                if (Id != Guid.Empty)
                {
                    var product = await _productService.GetByIdAsync(Id);
                    if (product == null)
                        return new ApiResponse("khong tim thay", Id, 404);

                    MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    product.Image = ms.ToArray();
                    ms.Close();
                    ms.Dispose();

                    await _productService.UpdateAsync(product);
                    var vm = _mapper.Map<ProductViewModel>(product);
                    return new ApiResponse("success", vm, 201);
                }

                return new ApiResponse("khong ton tai", Id, 405);
            }
            catch (Exception ex)
            {
                return new ApiResponse("khong tim thay", ex, 404);
            }
        }

        /// <summary>
        /// upload multiple image product
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        //[Authorize(Roles = CustomRoles.AdminOrMod)]
        [AllowAnonymous]
        [HttpPost("uploadImage-product-multiple")]
        public async Task<ApiResponse> UploadImageMultile([FromForm]ProductImageDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return new ApiResponse($"{ModelState}", ModelState, 400);
                if (dto.ProductId != Guid.Empty)
                {
                    var product = await _productService.GetByIdAsync(dto.ProductId);
                    if (product == null)
                        return new ApiResponse("khong tim thay", dto.ProductId, 404);
                    List<ProductImage> listPr = new List<ProductImage>();

                    foreach (IFormFile file in dto.Image)
                    {
                        ProductImage pr = new ProductImage();
                        MemoryStream ms = new MemoryStream();
                        file.CopyTo(ms);
                        pr.Image = ms.ToArray();
                        pr.ProductId = product.Id;
                        pr.Name = file.FileName;
                        pr.Url = file.FileName;
                        ms.Close();
                        ms.Dispose();
                        listPr.Add(pr);
                    }
                    var productImage = _mapper.Map<List<ProductImage>>(listPr);
                    await _productImageService.AddManyAsync(productImage);

                    var vm = _mapper.Map<List<ProductImageViewModel>>(productImage);

                    return new ApiResponse("them thanh cong", vm, 201);
                }
                return new ApiResponse("khong ton tai", 405);
            }
            catch (Exception ex)
            {
                return new ApiResponse("khong tim thay", ex, 404);
            }
        }

        //[AllowAnonymous]
        //[HttpPost("UploadFiles")]
        //public async Task<IActionResult> UploadFiles([FromForm(Name = "files")] ICollection<IFormFile> files)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    //var files = Request.Form.Files?.GetFiles("files");
        //    String message = String.Empty;
        //    int filesCounter = 0;
        //    //var IDsList = new IDsList();

        //    //foreach (var file in files)
        //    //{
        //    //    if (file.Length == 0)
        //    //        message = message + $"errorDescription {file.FileName}\n";

        //    //    try
        //    //    {
        //    //        var id = SaveFile(file);
        //    //        IDsList.Files.Add(new IDsList.FileInfo() { id = id, fileName = file.FileName });
        //    //        filesCounter++;
        //    //    }
        //    //    catch (Exception ex)
        //    //    {
        //    //        message = $"{message}{ex.Message}\n";
        //    //    }
        //    //}

        //    //IDsList.message = $"Amount: {filesCounter}.\n{message}";

        //    return Ok();
        //}

        /// <summary>
        /// Create product size and category
        /// no update Image
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.AdminOrMod)]
        [HttpPost("create-product")]
        public async Task<ApiResponse> CreateProduct([FromBody]ProductDtos dto)
        {
            try
            {
                var product = _mapper.Map<Product>(dto);
                if (product == null) return new ApiResponse("Khong co product", product, 400);
                if (product.Id != Guid.Empty)
                {
                    //add product
                    await _productService.AddAsync(product);
                    var getProduct = await _productService.GetByIdAsync(product.Id);
                    var productVm = _mapper.Map<ProductViewModel>(getProduct);
                    return new ApiResponse("Add product success", productVm, 201);
                }

                return new ApiResponse("Error", product.Id, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Can't add product", ex, 400);
            }
        }


        /// <summary>
        /// create multiple products
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        //[Authorize(Roles = CustomRoles.AdminOrMod)]
        [AllowAnonymous]
        [HttpPost("create-multiple-product")]
        public async Task<ApiResponse> CreateMultipleProduct([FromBody]List<ProductDtos> dto)
        {
            try
            {
                List<ProductViewModel> vm = new List<ProductViewModel>();
                var products = _mapper.Map<List<Product>>(dto);
                await _productService.AddManyAsync(products);
                foreach (var product in products)
                {
                    if (product.Id != Guid.Empty)
                    {
                        var productVm = _productService.GetProductCategoriesSizes(product.Id);
                        var productMapVm = _mapper.Map<ProductViewModel>(productVm);
                        vm.Add(productMapVm);
                    }
                }
                var productDtos = _mapper.Map<List<ProductViewModel>>(vm);
                return new ApiResponse("", productDtos, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Can't add product", ex, 400);
            }
        }

        /// <summary>
        /// update product no image
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.Admin)]
        [HttpPost("update-product/{Id}")]
        public async Task<ApiResponse> UpdateProductById([FromRoute]Guid Id, [FromBody]ProductDtos dto)
        {
            try
            {
                if (Id != Guid.Empty)
                {
                    var product = await _productService.GetByIdAsync(Id);
                    if (product == null) return new ApiResponse("Khong ton tai san pham", product, 404);
                    if (dto != null)
                    {
                        product.UpdatedDate = DateTime.Now;
                        var productDto = _mapper.Map(dto, product);
                        await _productService.UpdateAsync(productDto);
                        var productVm = _productService.GetProductCategoriesSizes(product.Id);
                        var newProduct = _mapper.Map<ProductViewModel>(productVm);
                        return new ApiResponse("success", productVm, 200);
                    }
                    return new ApiResponse("Khong co du lieu", dto, 400);
                }
                return new ApiResponse($"Sai dinh dang Id: {Id}", Id, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 400);
            }
        }

        /// <summary>
        /// Delete product: update status = true
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.AdminOrMod)]
        [HttpPost("update-status-by-id")]
        public async Task<ApiResponse> UpdateStatusById(Guid Id)
        {
            try
            {
                if (Id != Guid.Empty)
                {
                    var product = await _productService.GetByIdAsync(Id);
                    if (product == null) return new ApiResponse("Khong co san pham nao", product, 404);
                    if ((int)product.Status == 1)
                    {
                        product.Status = Status.nonActive;
                    }
                    else
                    {
                        product.Status = Status.Active;
                    }
                    await _productService.UpdateAsync(product);
                    var vm = _productService.GetProductCategoriesSizes(product.Id);
                    var productVm = _mapper.Map<ProductViewModel>(vm);
                    return new ApiResponse("Delete success", productVm, 200);
                }
                return new ApiResponse($"Khong xac dinh Id: {Id}", Id, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 400);
            }
        }


        /// <summary>
        /// Delete product: update delete = true
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.Admin)]
        [HttpPost("delete-product-by-id")]
        public async Task<ApiResponse> DeleteProductById(Guid Id)
        {
            try
            {
                if (Id != Guid.Empty)
                {
                    var product = await _productService.GetByIdAsync(Id);
                    if (product == null) return new ApiResponse("Khong co san pham nao", product, 404);
                    product.IsDeleted = true;
                    await _productService.UpdateAsync(product);
                    var productVm = _mapper.Map<ProductViewModel>(_productService.GetProductCategoriesSizes(product.Id));
                    return new ApiResponse("Delete success", product, 200);
                }
                return new ApiResponse($"Khong xac dinh Id: {Id}", Id, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 400);
            }
        }

        [AllowAnonymous]
        [HttpPost("create-product/add")]
        public async Task<ApiResponse> CreateProductAdd([FromBody] ProductDtos productDtos)
        {
            var product = _mapper.Map<Product>(productDtos);
            await _productService.AddAsync(product);
            var vm = _mapper.Map<ProductViewModel>(product);
            return new ApiResponse("success", vm, 201);
        }


        [AllowAnonymous]
        [HttpGet("get-product-new")]
        public async Task<ApiResponse> GetProductNew()
        {
            var products = await _productService.GetProductNew();
            if (products == null)
                return new ApiResponse("Not Found", products, 404);
            var vm = _mapper.Map<List<ProductViewModel>>(products);
            return new ApiResponse("success", vm, 200);
        }
        [AllowAnonymous]
        [HttpGet("get-product-category-by-take/{id}")]
        public async Task<ApiResponse> GetProductCategoryByTake([FromRoute] Guid id)
        {
            var products = await _productService.GetProductCategory(id);
            if (products == null)
                return new ApiResponse("Not Found", products, 404);
            var vm = _mapper.Map<List<ProductViewModel>>(products);
            return new ApiResponse("success", vm, 200);
        }


        /// <summary>
        /// searching by name product
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-product-search-by-name")]
        public async Task<ApiResponse> GetProductBySearchName([FromQuery(Name = "q")]string name)
        {
            var products = await _productService.FindProductByName(name);
            if (products == null)
                return new ApiResponse($"Không tồn tại sản phẩm tên: {name}", products, 404);
            var vm = _mapper.Map<List<ProductViewModel>>(products);
            return new ApiResponse("success", vm, 200);
        }
        #endregion

        #region API Color
        /// <summary>
        /// get all color
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("color/get-all-color")]
        public async Task<ApiResponse> GetAllColor()
        {
            var colors = await _colorService.GetAllAsync();
            var vm = _mapper.Map<List<ColorViewModel>>(colors);
            return new ApiResponse("List color", vm , 200);
        }

        /// <summary>
        /// add a color
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("add-or-update-color")]
        public async Task<ApiResponse> addOrUpdateColor(ColorDto dto)
        {
            try
            {
                // Kiem tra ten
                if(dto.name == null)
                    return new ApiResponse("Tên không được để trống", dto.name, 400);
                // add color
                // Id == Guid empty
                if (dto.Id == Guid.Empty)
                {
                    var color = _mapper.Map<Color>(dto);
                    await _colorService.AddAsync(color);
                    return new ApiResponse("Thêm mới thành công", dto.name, 200);
                }

                // find id
                var getColor = await _colorService.GetByIdAsync(dto.Id);
                if (getColor == null)
                    return new ApiResponse($"Không tìm thấy Color: {getColor}", getColor, 404);
                var updateColor = _mapper.Map(dto, getColor);
                await _colorService.UpdateAsync(updateColor);                
                return new ApiResponse($"Sửa thành công by Id: {dto.Id}",updateColor, 201);
                    
            }catch(Exception ex)
            {
                return new ApiResponse($"Error {ex}", ex, 400);
            }
        }

        /// <summary>
        /// update color
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("update-color")]
        public async Task<ApiResponse> updateColor(ColorDto dto)
        {
            try
            {
                if (dto.name == null)
                    return new ApiResponse("Tên không được để trống", dto.name, 400);
                var color = _mapper.Map<Color>(dto);
                await _colorService.AddAsync(color);
                return new ApiResponse("Thêm mới thành công", dto.name, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"Error {ex}", ex, 400);
            }
        }
        #endregion

        #region Rate
        
        [AllowAnonymous]
        [HttpGet("get-rates-by-product-id/{id}")]
        public async Task<ApiResponse> getRatesByProductById([FromRoute] Guid id)
        {
            var rates = await _rateService.GetRatesByProductId(id);
            if (rates == null)
                return new ApiResponse("Sản phẩm chưa có người dùng đánh giá", rates, 404);
            var vm = _mapper.Map<List<RateViewModel>>(rates);
            return new ApiResponse("success", vm, 200);
        }
        /// <summary>
        /// add rate product
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        //[Authorize(Roles = CustomRoles.All)]
        [AllowAnonymous]
        [HttpPost("add-rate-of-product")]
        public async Task<ApiResponse> addRateOfProduct(RateDto dto)
        {
            try
            {
                if(dto.Rating != 0)
                {
                    var rating = _mapper.Map<Rate>(dto);
                    await _rateService.AddAsync(rating);
                    return new ApiResponse("Success", rating, 200);
                }
                
                return new ApiResponse("Error");
                    

            }catch(Exception ex)
            {
                return new ApiResponse($"Error : {ex}", ex, 400);
            }
        }

        #endregion

        #region Category
        /// <summary>
        /// get all category product home
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-category-product")]
        public async Task<ApiResponse> getAllCategoryProduct()
        {
            var categories = await _categoryService.GetAllAsync();
            var vm = _mapper.Map<List<CategoryViewModel>>(categories);
            return new ApiResponse("List category", vm, 200);
        }

        [AllowAnonymous]
        [HttpGet("get-products-by-category")]
        public async Task<ApiResponse> getProductsByCategory(Guid Id)
        {
            var products = await _productService.GetProductsByCategory(Id);
            var vm = _mapper.Map<List<ProductViewModel>>(products);
            return new ApiResponse("List Product", vm, 200);
        }
        #endregion

        #region Review comment
        [AllowAnonymous]
        [HttpPost("get-all-comment-by-product")]
        public async Task<ApiResponse> getCommnentByProductId(Guid Id)
        {

            try
            {
                var comments = await _productService.GetProductCategoriesSizesRatesCommentsImages(Id);
                if (comments == null)
                    return new ApiResponse($"Không tồn tại {Id}", comments, 404);
                var vm = _mapper.Map<ProductViewModel>(comments);
                return new ApiResponse("List commnet", vm, 200);
            }catch(Exception ex)
            {
                return new ApiResponse($"Error {ex}", ex, 400);
            }
        }

        /// <summary>
        /// add comment
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// 
        [AllowAnonymous]
        [HttpPost("add-comment")]
        public async Task<ApiResponse> addComment([FromForm]ReviewDto dto)
        {
            try
            {
                //var comment = _mapper.Map<Review>(dto);
                Review newRe = new Review();
                MemoryStream ms = new MemoryStream();
                if(dto.Image != null)
                {
                    dto.Image.CopyTo(ms);
                    newRe.Image = ms.ToArray();
                    ms.Close();
                    ms.Dispose();
                }
                newRe.ProductId = dto.ProductId;
                newRe.UserId = dto.UserId;
                newRe.Comment = dto.Comment;
                newRe.Date = DateTime.Now;
                await _reviewService.AddAsync(newRe);
                var vm = _mapper.Map<ReviewViewModel>(newRe);
                return new ApiResponse("success", vm, 200);
            }catch(Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 400);
            }
        }

        [AllowAnonymous]
        [HttpGet("get-review-by-product/{Id}")]
        public async Task<ApiResponse> GetReviewByProduct([FromRoute]Guid Id)
        {
            var reviews = await _reviewService.GetReviewByProduct(Id);
            var vm = _mapper.Map<List<ReviewViewModel>>(reviews);
            return new ApiResponse("success", vm, 200);
        }
        #endregion

        #region Order

        /// <summary>
        /// get order by admin Total all
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin")]
        public async Task<ApiResponse> GetAllOrderByAdmin()
        {
            var orders = await _orderService.GetAllOrderByAdmin();
            if (orders == null)
                return new ApiResponse($"Không có đơn hàng nào", orders, 404);

            var vm = _mapper.Map<List<OrderViewModel>>(orders); 
            return new ApiResponse("Success",vm, 200);
        }

        [AllowAnonymous]
        [HttpGet("get-order-by-admin/{id}")]
        public async Task<ApiResponse> GetOrderByAdmin([FromRoute] Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order == null)
                return new ApiResponse($"Không có đơn hàng nào", order, 404);

            var vm = _mapper.Map<OrderViewModel>(order);
            return new ApiResponse("Success", vm, 200);
        }

        /// <summary>
        /// get all order by admin create order success
        /// </summary>
        /// <returns></returns>
        /// 
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-create-order")]
        public async Task<ApiResponse> GetAllOrderByAdminCreateOrder()
        {
            var orders = await _orderService.GetAllOrderByAdminCreateOrder();
            if (orders == null)
                return new ApiResponse($"Không có đơn hàng nào", orders, 404);

            var vm = _mapper.Map<List<OrderViewModel>>(orders);
            return new ApiResponse("Success", vm, 200);
        }

        /// <summary>
        /// get all order by admin paid order
        /// </summary>
        /// <returns></returns>
        /// 
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-paid-order")]
        public async Task<ApiResponse> GetAllOrderByAdminPaidOrder()
        {
            var orders = await _orderService.GetAllOrderByAdminPaidOrder();
            if (orders.Count() == 0)
                return new ApiResponse($"Không có đơn hàng nào", orders, 404);

            var vm = _mapper.Map<List<OrderViewModel>>(orders);
            return new ApiResponse("Success", vm, 200);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-statistical")]
        public async Task<ApiResponse> GetAllOrderByAdminStatistical()
        {
            var orders = await _orderService.GetAllOrderByAdminStatistical();
            if (orders.Count() == 0)
                return new ApiResponse($"Không có đơn hàng nào", orders, 404);

            var vm = _mapper.Map<List<OrderViewModel>>(orders);
            return new ApiResponse("Success", vm, 200);
        }

        /// <summary>
        /// get-all-order-by-admin-statistical-by-day successed
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-statistical-by-real-time")]
        public async Task<ApiResponse> GetAllOrderByAdminStatisticalByRealTime()
        {
            var orders = await _orderService.GetAllOrderByAdminStatisticalByRealTime();
            return new ApiResponse("Success", orders, 200);
        }

        /// <summary>
        /// get-all-order-by-admin-statistical-by-day successed
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-statistical-by-day")]
        public async Task<ApiResponse> GetAllOrderByAdminStatisticalByDay()
        {
            var orders = await _orderService.GetAllOrderByAdminStatisticalByDay();
            return new ApiResponse("Success", orders, 200);
        }

        /// <summary>
        /// get-all-order-by-admin-statistical-by-month successed
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-statistical-by-month")]
        public async Task<ApiResponse> GetAllOrderByAdminStatisticalByMonth()
        {
            var orders = await _orderService.GetAllOrderByAdminStatisticalByMonth();
            return new ApiResponse("Success",orders,  200);
        }

        /// <summary>
        /// get-all-order-by-admin-statistical-by-year successed
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-all-order-by-admin-statistical-by-year")]
        public async Task<ApiResponse> GetAllOrderByAdminStatisticalByYear()
        {
            var orders = await _orderService.GetAllOrderByAdminStatisticalByYear();
            return new ApiResponse("Success", orders, 200);
        }
        /// <summary>
        /// get order by customer
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("get-order-by-customer/{Id}")]
        public async Task<ApiResponse> getOrderByCustomer([FromRoute] Guid Id)
        {
            var orders = await _orderService.getOrderByCustomer(Id);
            if (orders == null)
                return new ApiResponse("Not Found", orders, 404);
            var vm = _mapper.Map<List<OrderViewModel>>(orders);
            return new ApiResponse("Success", vm, 200);
        }
        //[AllowAnonymous]
        [HttpGet("get-order-by-customer-by-id/{Id}")]
        public async Task<ApiResponse> getOrderByCustomerById([FromRoute] Guid Id)
        {
            var orders = await _orderService.GetByIdAsync(Id);
            if (orders == null)
                return new ApiResponse("Not Found", orders, 404);
            var vm = _mapper.Map<OrderViewModel>(orders);
            return new ApiResponse("Success", vm, 200);
        }

        [AllowAnonymous]
        [HttpGet("get-order-by-employee-id/{id}")]
        public async Task<ApiResponse> GetOrderByEmployeeId([FromRoute] Guid id)
        {
            var orders = await _orderService.getOrderByEmployeeId(id);
            if (orders == null)
                return new ApiResponse("Không có đơn hàng nào", orders, 404);
            var vm = _mapper.Map<List<OrderViewModel>>(orders);
            return new ApiResponse("success", vm, 200);

        }
        /// <summary>
        /// add order success
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("add-order-by-customer")]
        public async Task<ApiResponse> AddOrder([FromBody] OrderPassDto obj)
        {
            try
            {
                if(obj.OrderDto.UserId != Guid.Empty)
                {
                    var userId = await _userService.GetByIdAsync(obj.OrderDto.UserId);
                    if (userId == null)
                        return new ApiResponse("Không tồn tại khách hàng", 400);
                    
                    var order = _mapper.Map<Order>(obj.OrderDto);
                    await _orderService.AddAsync(order);
                    if(order != null)
                    {
                        //var newOrderDetails = new List<OrderDetailDto>();
                        foreach(var or in obj.OrderDetailDtos)
                        {
                            var product = await _productService.GetByIdAsync(or.ProductId);
                            or.OrderId = order.Id;
                        }
                        var orderDetails = _mapper.Map<List<OrderDetail>>(obj.OrderDetailDtos);
                        await _orderDetailService.AddManyAsync(orderDetails);
                        //return new ApiResponse($"Success", 201);
                        userId.AccumulatedPoints = userId.AccumulatedPoints - order.AccumulatedPoints;
                        if (userId.AccumulatedPoints >= 0)
                            await _userService.UpdateAsync(userId);
                        else
                            return new ApiResponse("Lỗi", 404);
                    }
                    var vm = _mapper.Map<OrderViewModel>(order);
                    return new ApiResponse("success", vm, 200);
                }
                return new ApiResponse("not found user", 404);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", 400);
            }
        }
        
        /// <summary>
        /// update order by admin
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("update-order-by-admin")]
        public async Task<ApiResponse> UpdateOrderByAdmin(OrderDto orderDtos)
        {
            var level_1 = 99000;
            var level_2 = 199000;
            var level_3 = 299000;
            var level_4 = 500000;
            var level_5 = 1000000;
            var order = await _orderService.GetByIdAsync(orderDtos.Id);
            if (order == null)
                return new ApiResponse("Not Found", order, 404);
            if (orderDtos.StatusOrder == StatusOrder.CREATE)
            {
                order.CreateDate = DateTime.Now;
                order.StatusOrder = orderDtos.StatusOrder;
                order.EmployeeId = orderDtos.EmployeeId;
                var order_map = _mapper.Map<Order>(order);
                await _orderService.UpdateAsync(order_map);

                var user = await _userService.GetByIdAsync(orderDtos.UserId);
                if (user == null)
                    return new ApiResponse("Không tồn tại tài khoản", user, 200);
                if (order.Amount > 0 && order.Amount <= level_1)
                    user.AccumulatedPoints += 1;
                if (order.Amount > level_1 && order.Amount <= level_2)
                    user.AccumulatedPoints += 10;
                if (order.Amount > level_2 && order.Amount <= level_3)
                    user.AccumulatedPoints += 15;
                if (order.Amount > level_3 && order.Amount <= level_4)
                    user.AccumulatedPoints += 20;
                if (order.Amount > level_4 && order.Amount <= level_5)
                    user.AccumulatedPoints += 25;
                if (order.Amount > level_4 && order.Amount <= level_5)
                    user.AccumulatedPoints += 35;
                if (order.Amount > level_5)
                    user.AccumulatedPoints += 40;
                await _userService.UpdateAsync(user);
                var vm = _mapper.Map<OrderViewModel>(order_map);
                return new ApiResponse("success", vm, 200);
            }
            if (orderDtos.StatusOrder == StatusOrder.SHIPPING)
            {
                order.ShippingDate = DateTime.Now;
                order.StatusOrder = orderDtos.StatusOrder;
                order.EmployeeId = orderDtos.EmployeeId;
                var order_map = _mapper.Map<Order>(order);
                await _orderService.UpdateAsync(order_map);
                var vm = _mapper.Map<OrderViewModel>(order_map);
                return new ApiResponse("success", vm, 200);
            }
            if (orderDtos.StatusOrder == StatusOrder.DELIVERED)
            {
                order.DeliveredDate = orderDtos.DeliveredDate;
                order.StatusOrder = orderDtos.StatusOrder;
                order.EmployeeId = orderDtos.EmployeeId;
                var order_map = _mapper.Map<Order>(order);
                await _orderService.UpdateAsync(order_map);
                var vm = _mapper.Map<OrderViewModel>(order_map);
                return new ApiResponse("success", vm, 200);
            }
            if (orderDtos.StatusOrder == StatusOrder.PAID)
            {
                order.PaidDate = DateTime.Now;
                order.StatusOrder = orderDtos.StatusOrder;
                order.EmployeeId = orderDtos.EmployeeId;
                var order_map = _mapper.Map<Order>(order);
                await _orderService.UpdateAsync(order_map);
                var vm = _mapper.Map<OrderViewModel>(order_map);

                // update quantity product
                foreach(var products in order.OrderDetails)
                {
                    var product = await _productService.GetByIdAsync(products.ProductId);
                    var new_quantity = product.Quantity - products.Quantity;
                    if (new_quantity >= 0)
                    {
                        product.Quantity = new_quantity;
                        await _productService.UpdateAsync(product);
                    }                  
                }
                return new ApiResponse("success", vm, 200);
            }
            return new ApiResponse("Success", 200);
        }
        #endregion

        [AllowAnonymous]
        [HttpGet("product-by-max")]
        public async Task<ApiResponse> getProductByMax()
        {
            var max = await _productService.GetProductByMax();

            return new ApiResponse("success", max, 200);
        }
        [AllowAnonymous]
        [HttpGet("product-by-min")]
        public async Task<ApiResponse> getProductByMin()
        {
            var min = await _productService.GetProductByMin();
            if(min.Count() > 0)
                return new ApiResponse("success", min, 200);
            return new ApiResponse("Not Found", min, 200);
        }


        [AllowAnonymous]
        [HttpPost("delete-order/{id}")]
        public async Task<ApiResponse> deleteOrder([FromRoute] Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order != null)
            {
                await _orderService.DeleteAsync(order);
                var vm = _mapper.Map<OrderViewModel>(order);
                return new ApiResponse("success", vm, 200);
            }
            return new ApiResponse("Không tồn tại", 404);
            
        }

       
        // navigation
        [AllowAnonymous]
        [HttpGet("get-navigation-by-home")]
        public async Task<ApiResponse> GetNavigationByHome()
        {
            var navgiation = await _productService.GetNavigation();
            return new ApiResponse("success", navgiation,200);
        }


        // get product multiple category
        [AllowAnonymous]
        [HttpPost("get-product-involve")]
        public async Task<ApiResponse> GetProductInvolve([FromBody] List<Guid> Id)
        {
            if (Id.Count == 0)
                return new ApiResponse("There is no category id", null, 200);
            var products = await _productService.GetProductMultipleCategory(Id);
            var vm = _mapper.Map<IList<ProductViewModel>>(products);
            return new ApiResponse("success", vm, 200);
        }

        #region product-image
        [AllowAnonymous]
        [HttpGet("get-all-product-image-by-id/{id}")]
        public async Task<ApiResponse> GetAllProductImageById([FromRoute] Guid id)
        {
            var images = await _productImageService.GetProductImageByProductId(id);
            if (images == null)
                return new ApiResponse("Không có ảnh của sản phẩm", images, 400);
            var vm = _mapper.Map<List<ProductImageViewModel>>(images);
            return new ApiResponse("success", vm, 200);
        }
        #endregion
    }
}