using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Portal.Infrastructure
{
    public static class CustomRoles
    {
        public const string Admin = "Admin";
        public const string User = "User";
        public const string Mod = "Employee";
        public const string AdminOrMod = CustomRoles.Admin + ", " + CustomRoles.Mod;
        public const string All = CustomRoles.Admin + ", " + CustomRoles.Mod + ", " + CustomRoles.User;
    }
}
