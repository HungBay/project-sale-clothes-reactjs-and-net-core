using Ecommerce.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Ecommerce.Domain;
using System.Linq;
using Ecommerce.Repository.Interfaces;
using EcommerceCommon.Infrastructure.Helper;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Repository
{
    public class UserReponsitory : BaseRepository<User>, IUserReponsitory
    {
        public UserReponsitory(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = DbContext.Users.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!AuthenUserHelper.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (DbContext.Users.Any(x => x.Username == user.Username))
                throw new Exception("Username \"" + user.Username + "\" is already taken");

            byte[] passwordHash;
            byte[] passwordSalt;

            AuthenUserHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RoleId = DbContext.Roles.Where(x => x.Name == "Employee").Select(s => s.Id).SingleOrDefault();

            DbContext.Users.Add(user);
            DbContext.SaveChanges();

            return user;
        }

        public User CreateUser(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (DbContext.Users.Any(x => x.Username == user.Username))
                throw new Exception("Username \"" + user.Username + "\" is already taken");

            byte[] passwordHash;
            byte[] passwordSalt;

            AuthenUserHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RoleId = DbContext.Roles.Where(x => x.Name == "Customer").Select(s => s.Id).SingleOrDefault();

            DbContext.Users.Add(user);
            DbContext.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = DbContext.Users.Find(userParam.Id);

            if (user == null)
                throw new Exception("User not found");

            if (userParam.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                if (DbContext.Users.Any(x => x.Username == userParam.Username))
                    throw new Exception("Username " + userParam.Username + " is already taken");
            }

            // update user properties
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Username = userParam.Username;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                AuthenUserHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            DbContext.Users.Update(user);
            DbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var user = DbContext.Users.Find(id);
            if (user != null)
            {
                DbContext.Users.Remove(user);
                DbContext.SaveChanges();
            }
        }

        public User FindByNameUser(string username)
        {
            var user = DbContext.Users.Where(x => x.Username == username).FirstOrDefault();
            return user;
        }

        public async Task<IEnumerable<User>> getAllCustomer()
        {
            var customers = await DbContext.Users.Where(x => x.Role.Name == "Customer").ToListAsync();
            return customers;
        }

        public async Task<IEnumerable<User>> getAllEmployee()
        {
            var employees = await DbContext.Users.Where(x => x.Role.Name == "Employee").ToListAsync();
            return employees;
        }
    }
}
