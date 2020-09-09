using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Service.Interface;
using Ecommerce.Core.ViewModels;
using Ecommerce.Domain.Models;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Service.Services
{
    public class TakafulService //: ITakafulService
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
  
      //  private readonly ITakafulRepository _takafulRepository;

        public TakafulService(
          //  ITakafulRepository takafulRepository,
            ILoggerFactory loggerFactory,
            IMapper mapper)
        {
            _logger = loggerFactory.CreateLogger<TakafulService>();
         //   _takafulRepository = _takafulRepository;
            _mapper = mapper;
        }
    }
}