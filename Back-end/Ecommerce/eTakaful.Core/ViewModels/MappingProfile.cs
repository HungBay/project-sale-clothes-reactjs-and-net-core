using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Service.Dto;
using Ecommerce.Service.ViewModels;
//using Ecommerce.Service.ViewModels;

namespace Ecommerce.Core.ViewModels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            MappingEntityToViewModel();
            MappingDtoToEntity();
        }

        private void MappingEntityToViewModel()
        {
            // case get data
            CreateMap<Role, RoleViewModel>();
            CreateMap<Product, ProductViewModel>();
            CreateMap<User, UserViewModel>();
            CreateMap<Category, TypeProductDto>();
            CreateMap<Category, CategoryViewModel>();
            CreateMap<Size, SizeViewModel>();
            CreateMap<Color, ColorViewModel>();
            CreateMap<ProductImage, ProductImageViewModel>();
            CreateMap<Review, ReviewViewModel>();
            CreateMap<Rate, RateViewModel>();
            CreateMap<ProductCategory, ProductCategoryViewModel>();
            CreateMap<ProductSize, ProductSizeViewModel>();
            CreateMap<ProductColor, ProductColorViewModel>();
            CreateMap<Order, OrderViewModel>();
            CreateMap<OrderDetail, OrderDetailViewModel>();
        }

        private void MappingDtoToEntity()
        {
            // case insert or update
            CreateMap<TypeProductDto, Category>();
            CreateMap<SizeDto, Size>();
            //user
            CreateMap<UserDto, User>();
            CreateMap<UserUpdateDto, User>();

            CreateMap<RoleDto, Role>();
            CreateMap<ProductDtos, Product>();
            CreateMap<ProductImageDto, ProductImage>();

            CreateMap<CategoryDto, Category>();

            CreateMap<ProductCategoryDto, ProductCategory>();
            CreateMap<ProductSizeDto, ProductSize>();
            CreateMap<ProductColorDto, ProductColor>();

            CreateMap<ColorDto, Color>();
            CreateMap<RateDto, Rate>();
            CreateMap<ReviewDto, Review>();

            CreateMap<OrderDto, Order>();
            CreateMap<OrderDetailDto, OrderDetail>();

            CreateMap<ProfileDto, User>();

        }
    }
}