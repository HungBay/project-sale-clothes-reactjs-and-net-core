using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Portal.Infrastructure;
using Ecommerce.Portal.Infrastructure.Helper;
using Ecommerce.Portal.Infrastructure.Wrappers;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;
using Ecommerce.Service.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Portal.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserService _userService;
        private readonly AuthencationSetting _authencationSetting;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IOptions<AuthencationSetting> authencationSetting, IMapper mapper)
        {
            _userService = userService;
            _authencationSetting = authencationSetting.Value;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ApiResponse Login([FromBody]UserLoginDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return new ApiResponse("Tài khoản hoặc mật khẩu không đúng",user,400);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_authencationSetting.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return new ApiResponse("Login success", new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString,
                Image = user.ImageUser,
                Address = user.Address,
                Phone = user.Phone,
                Email = user.Email,
                AccumulatedPoints = user.AccumulatedPoints,
            });
        }

       
        /// <summary>
        /// registor user - customer
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        ///[Authorize(Roles = CustomRoles.Admin)]
        ///
        [AllowAnonymous]
        [HttpPost("register-user")]
        public ApiResponse RegisterUser([FromBody]UserDto userDto)
        {
            try
            {
                
                // save 
                var user = _mapper.Map<User>(userDto);
                var vm = _mapper.Map<UserViewModel>(user);
                if (string.IsNullOrWhiteSpace(userDto.Password))
                    return new ApiResponse("Không được để mật không rỗng",vm, 400);
                var findUser = _userService.FindByNameUser(userDto.Username);
                if (findUser != null)
                    return new ApiResponse($"Tài khoản {userDto.Username} đã tồn tại", vm, 404);

                _userService.CreateUser(userDto, userDto.Password);
                return new ApiResponse("Register user success", vm, 200);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return new ApiResponse("Can't register user", ex, 400);
            }
        }


        /// <summary>
        /// registor user - employee
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        //[Authorize(Roles = CustomRoles.Mod)]
        [AllowAnonymous]
        [HttpPost("register")]
        public ApiResponse Register([FromBody]UserDto userDto)
        {
            try
            {
                // save 
                var user = _mapper.Map<User>(userDto);
                var vm = _mapper.Map<UserViewModel>(user);
                _userService.Create(userDto, userDto.Password);
                return new ApiResponse("Register user success", vm,200);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return new ApiResponse("Can't register user", ex, 400);
            }
        }

        /// <summary>
        /// Get all user: Employee - customer
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = CustomRoles.Admin)]
        [Route("get-all-employee")]
        [HttpGet]
        public async Task<ApiResponse> GetAll()
        {
            var users = await _userService.getAllEmployee();
            var userDtos = _mapper.Map<IList<UserViewModel>>(users);
            return new ApiResponse("list user", userDtos, 200);
        }

        [Authorize(Roles = CustomRoles.Admin)]
        [HttpGet("get-user-by-id/{name}")]
        public async Task<ApiResponse> GetUserByUserName(string name)
        {
            try
            {
                var user = await _userService.FindAsync(c => c.Username == name);
                if (user == null)
                {
                    return new ApiResponse("Can't find user with name", name, 200);
                }

                // var currentUserId = Guid.Parse(User.Identity.Name);
                if (!User.IsInRole("Admin"))
                {
                    return new ApiResponse("forbidden", name, 403);
                }

                var userDto = _mapper.Map<UserDto>(user);
                return new ApiResponse("user detail", userDto, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Can't get user infomation", ex, 400);
            }
        }

        [HttpPut("{id}")]
        public ApiResponse UpdateUser(Guid id, [FromBody]UserDto userDto)
        {
            try
            {
                // save 
                _userService.Update(userDto, userDto.Password);
                return new ApiResponse("Update user success", userDto, 200);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return new ApiResponse("Can't update user", ex, 400);
            }
        }

        [Authorize(Roles = CustomRoles.Admin)]
        [HttpDelete("delete-user/{id}")]
        public ApiResponse DeleteUser(Guid id)
        {
            _userService.Delete(id);
            return new ApiResponse("Delete user success", id, 200);
        }

        /// <summary>
        /// Get profile user
        /// Check auth
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("get-profile-user")]
        public async Task<ApiResponse> getProfileUser(Guid Id)
        {
            try
            {
                if (Id == Guid.Empty)
                    return new ApiResponse("Error Id: ", Id, 400);
                var profile = await _userService.GetByIdAsync(Id);
                if (profile == null)
                    return new ApiResponse("Không tìm thấy Id: ", Id, 400);

                var user = _mapper.Map<UserViewModel>(profile);
                return new ApiResponse("Profile user: ", user, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 400);
            }
        }

        /// <summary>
        /// Upload image profile
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadImage(Guid Id, IFormFile file)
        {
            try
            {
                if(Id != Guid.Empty)
                {
                    var user = await _userService.GetByIdAsync(Id);
                    if (user == null)
                        return Ok($"Khong tim thay Id {Id}");

                    MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    user.ImageUser = ms.ToArray();
                    ms.Close();
                    ms.Dispose();

                    //var userdto = _mapper.Map<User>(user);
                    await _userService.UpdateAsync(user);
                    //return new ApiResponse("create new user", user, 201);
                    return Ok($"{user}");
                }
                
                return Ok($"Khong tim thay Id {Id}");
            }
            catch(Exception ex)
            {
                return Ok($"{ex}");
            }
        }

        [AllowAnonymous]
        [HttpGet("get-user/{id}")]
        public async Task<ApiResponse> getUser([FromRoute] Guid id)
        {
            try
            {
                var user = await _userService.GetByIdAsync(id);
                if (user == null)
                    return new ApiResponse("Not Found", user, 404);
                var vm = _mapper.Map<UserViewModel>(user);
                return new ApiResponse("success", vm, 200);
            }catch(Exception ex)
            {
                return new ApiResponse("Error", ex, 400);
            }
        }

        /// <summary>
        /// update user khong co image
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("update-user")]
        public async Task<ApiResponse> updateUser([FromBody] UserUpdateDto dto)
        {
            try
            {
                //create
                if (dto.Id == Guid.Empty)
                    return new ApiResponse("Không tìm thấy Id: ", dto.Id, 400);
                var user = await _userService.GetByIdAsync(dto.Id);
                if (user == null)
                    return new ApiResponse("User không tồn tại", user, 404);
                user.UpdatedDate = DateTime.Now;
                var userDto = _mapper.Map(dto, user);
                await _userService.UpdateAsync(userDto);
                var userViewModel = _mapper.Map<UserViewModel>(userDto);
                return new ApiResponse("Update date user success: ", userViewModel, 201);
            }catch(Exception ex)
            {
                return new ApiResponse($"{ex}", ex,200);
            }            
        }

        [AllowAnonymous]
        [HttpPost("update-image-proflie")]
        public async Task<ApiResponse> uploadProfle([FromForm] ProfileDto dto)
        {
            try
            {
    
                if (dto.Id == Guid.Empty)
                    return new ApiResponse("Không tìm thấy Id: ", dto.Id, 400);
                var user = await _userService.GetByIdAsync(dto.Id);
                if (user == null)
                    return new ApiResponse("User không tồn tại", user, 404);
                MemoryStream ms = new MemoryStream();
                dto.ImageUser.CopyTo(ms);
                user.ImageUser = ms.ToArray();
                ms.Close();
                ms.Dispose();
                user.UpdatedDate = DateTime.Now;
                
                await _userService.UpdateAsync(user);
                var userViewModel = _mapper.Map<UserViewModel>(user);
                return new ApiResponse("Update date user success: ", userViewModel, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse($"{ex}", ex, 200);
            }
        }

        [AllowAnonymous]
        [HttpGet("get-all-customer")]
        public async Task<ApiResponse> getAllCustomer()
        {
            var customers = await _userService.getAllCustomer();
            var vm = _mapper.Map<List<UserViewModel>>(customers);
            return new ApiResponse("success", vm, 200);
        }

        [AllowAnonymous]
        [HttpGet("get-re-profile/{id}")]
        public async Task<ApiResponse> GetProfileId([FromRoute] Guid id)
        {
            try
            {
                var user = await _userService.GetByIdAsync(id);
                if (user == null)
                    return new ApiResponse("Not Found", user, 404);
                return new ApiResponse("success", new
                {
                    Id = user.Id,
                    Username = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Image = user.ImageUser,
                    Address = user.Address,
                    Phone = user.Phone,
                    Email = user.Email,
                    AccumulatedPoints = user.AccumulatedPoints,
                }, 200);
            }
            catch (Exception ex)
            {
                return new ApiResponse("Error", ex, 400);
            }
        }
    }
}