using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Domain;
using Ecommerce.Portal.Infrastructure.Extensions;
using Ecommerce.Repository;
using Ecommerce.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ecommerce.Service.Interface;
using Ecommerce.Repository.Interfaces;
using Microsoft.OpenApi.Models;
using Ecommerce.Portal.Infrastructure.Helper;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Portal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy("Allow", builer => builer.WithOrigins("http://localhost:3000", "http://localhost:13193/api/Product/add-order-by-customer").AllowAnyHeader().AllowAnyMethod());
            });
            services.AddAutoMapper(typeof(Ecommerce.Core.ViewModels.MappingProfile));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AuthencationSetting>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AuthencationSetting>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = Guid.Parse(context.Principal.Identity.Name);
                        var user =  userService.GetById(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Configure Entity Framework Initializer for seeding
            services.AddTransient<IApplicationDbContextInitializer, ApplicationDbContextInitializer>();

            ConfigureCoreAndRepositoryService(services);

            #region Config swagger  

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Ecommerce API",
                    Version = "v1",
                    Description = "An API to perform Ecommerce systems",
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                                  \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });


            #endregion

        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors("Allow");
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseApiResponseAndExceptionWrapper();


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ecommerce API V1");
            });


        }

        private void ConfigureCoreAndRepositoryService(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IServices<>), typeof(EcommerceServices<>));
            //services.AddScoped<ICategoryReponsitory, CategoryReponsitory>();
            //services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<ITypeProductRepository, TypeProductRepository>();
            services.AddScoped<ITypeProductService, TypeProductService>();

            services.AddScoped<IProductRepository, ProductRespository>();
            services.AddScoped<IProductSevice, ProductService>();

            services.AddScoped<ISizeRepository, SizeRepository>();
            services.AddScoped<ISizeService, SizeService>();

            services.AddScoped<IUserReponsitory, UserReponsitory>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IRoleReponsitory, RoleReponsitory>();
            services.AddScoped<IRoleServices, RoleService>();

            services.AddScoped<IProductImage, ProductImageRespository>();
            services.AddScoped<IProductImageService, ProductImageService>();

            services.AddScoped<ICategoryReponsitory, CategoryRepository>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IProductDeltaiRepository, ProductDetailRepository>();
            services.AddScoped<IProductDetailService, ProductDetailService>();

            services.AddScoped<IProductSizeRepository, ProductSizeRespository>();
            services.AddScoped<IProductSizeService, ProductSizeService>();

            services.AddScoped<IColorReponsitory, ColorReponsitory>();
            services.AddScoped<IColorService, ColorService>();

            services.AddScoped<IRateReponsitory, RateReponsitory>();
            services.AddScoped<IRateService, RateService>();

            services.AddScoped<IReviewReponsitory, ReviewReponsitory>();
            services.AddScoped<IReviewService, ReviewService>();

            services.AddScoped<IOrderDetailReponsitory, OrderDetailReponsitory>();
            services.AddScoped<IOrderDetailService, OrderDetailService>();

            services.AddScoped<IOrderReponsitory, OrderReponsitory>();
            services.AddScoped<IOrderService, OrderService>();
        }
    }
}
