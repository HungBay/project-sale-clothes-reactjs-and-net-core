using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Portal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var host = CreateWebHostBuilder(config["appInsightKey"], args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var dbInitializer = scope.ServiceProvider.GetRequiredService<IApplicationDbContextInitializer>();

                // Apply any pending migrations
                dbInitializer.Migrate();

                //todo: uncomment when Seed() functin is implemented.
                // Seed the database in development mode
                //dbInitializer.Seed().GetAwaiter().GetResult();
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string appInsightKey, string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .ConfigureLogging(logging =>
                {
                    logging.AddApplicationInsights(appInsightKey);
                });
    }
}
