using Camps.API.Infrastructure;
using Camps.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Formatting.Display;
using Serilog.Sinks.RabbitMQ;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace Camps.API
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
            // requires using Microsoft.Extensions.Options
            services.Configure<CampsDatabaseSettings>(
                Configuration.GetSection(nameof(CampsDatabaseSettings)));

            services.AddSingleton<ICampsDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CampsDatabaseSettings>>().Value);

            services.AddSingleton<CampsContext>();

            services.AddScoped<ICampsService, CampsService>();
            services.AddScoped<ICategoriesService, CategoriesService>();

            services.AddControllers()
                .AddNewtonsoftJson(options => options.UseMemberCasing());

            // RabbitMQ logging
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.RabbitMQ((clientConfiguration, sinkConfiguration) =>
                {
                    clientConfiguration.Username = Configuration["RabbitMQ:RABBITMQ_USER"];
                    clientConfiguration.Password = Configuration["RabbitMQ:RABBITMQ_PASSWORD"];
                    clientConfiguration.Exchange = Configuration["RabbitMQ:RABBITMQ_EXCHANGE"];
                    clientConfiguration.ExchangeType = Configuration["RabbitMQ:RABBITMQ_EXCHANGE_TYPE"];
                    clientConfiguration.Heartbeat = 60;
                    clientConfiguration.DeliveryMode = RabbitMQDeliveryMode.Durable;
                    clientConfiguration.RouteKey = Configuration["RabbitMQ:RABBITMQ_QUEUE"];
                    clientConfiguration.Port = 5672;

                    clientConfiguration.Hostnames.Add(Configuration["RabbitMQ:RABBITMQ_HOSTNAMES"]);

                    sinkConfiguration.TextFormatter = new MessageTemplateTextFormatter(
                        "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} {Level:u4} {RequestPath} Correlation: {TraceId} [{SourceContext}] - {Message:lj}{NewLine}{Exception}");
                }).CreateLogger();

            // Add authentication services
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Authority = $"https://{Configuration["Auth0:Domain"]}";
                    options.Audience = Configuration["Auth0:Audience"];
                });

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Camp Service API",
                    Version = "v1",
                    Description = "Web API for camp management.",
                    TermsOfService = new Uri("https://policies.google.com/terms?hl=en-US"),
                    Contact = new OpenApiContact()
                    {
                        Name = "Care iz Omare",
                        Email = "info@care.si",
                        Url = new Uri("http://care.si/")
                    },
                    License = new OpenApiLicense()
                    {
                        Name = "Use under MIT",
                        Url = new Uri("https://opensource.org/licenses/MIT")
                    }
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Scheme = "bearer",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme.",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "Bearer"}
                        },
                        new List<string>()
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(
                options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
            );

            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Camp Service v1"); });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}