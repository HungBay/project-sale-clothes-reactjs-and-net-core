using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain.Models;
using Ecommerce.Repository.Interfaces;
using Ecommerce.Service.Dto;
using Ecommerce.Service.Interface;

namespace Ecommerce.Service.Services
{
    public class UserService : EcommerceServices<User>, IUserService
    {
        private readonly IUserReponsitory _userReponsitory;
        private readonly IMapper _mapper;
        public UserService(IUserReponsitory userReponsitory, IMapper mapper) : base(userReponsitory)
        {
            _userReponsitory = userReponsitory;
            _mapper = mapper;
        }

        public User Authenticate(string username, string password)
        {
            return _userReponsitory.Authenticate(username, password);
        }

        public User Create(UserDto userDto, string password)
        {
            var user = _mapper.Map<User>(userDto);
            return _userReponsitory.Create(user, password);
        }

        public User CreateUser(UserDto userDto, string password)
        {
            var user = _mapper.Map<User>(userDto);
            return _userReponsitory.CreateUser(user, password);
        }

        public void Delete(Guid id)
        {
            _userReponsitory.Delete(id);
        }

        public User FindByNameUser(string username)
        {
            return _userReponsitory.FindByNameUser(username);
        }

        public async Task<IEnumerable<User>> getAllCustomer()
        {
            return await _userReponsitory.getAllCustomer();
        }

        public async Task<IEnumerable<User>> getAllEmployee()
        {
            return await _userReponsitory.getAllEmployee();
        }

        public void Update(UserDto userDto, string password = null)
        {
            var user = _mapper.Map<User>(userDto);
            _userReponsitory.Update(user,password);
        }
    }
}
