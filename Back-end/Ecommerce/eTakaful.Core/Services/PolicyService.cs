using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Service.Interface;
using Ecommerce.Core.ViewModels;
using Ecommerce.Domain.Models;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Core.Services
{
    public class PolicyService // :PolicyService
    {
        //private readonly ILogger _logger;
        //private readonly IMapper _mapper;

        //private readonly IPolicyRepository _policyRepository;
        //private readonly IPersonRepository _personRepository;
        //private readonly INominationRepository _nominationRepository;

        public PolicyService()
            //ILoggerFactory loggerFactory,
            //IPolicyRepository policyRepository,
            //IPersonRepository personRepository,
            //INominationRepository nominationRepository,
            //IMapper mapper)
        {
            //_logger = loggerFactory.CreateLogger<PolicyService>();
            //_policyRepository = policyRepository;
            //_personRepository = personRepository;
            //_nominationRepository = nominationRepository;
            //_mapper = mapper;
        }

        public async Task Create(PolicyViewModel model, string userId)
        {
            // var policyId = Guid.Empty;
         //   var policyToSave = _mapper.Map<Policy>(model);
            // policyToSave.Id = policyId;

            // //save policy owner
            // var owner = _mapper.Map<Person>(model.Owner);
            // var savedOwner = await _personRepository.AddAsync(owner);
            // policyToSave.OwnerFK = savedOwner.Id;

            // //save policy spouse if any
            // if(model.Spouse != null) 
            // {
            //     var spouse = _mapper.Map<Person>(model.Spouse);
            //     var savedSpouse = await _personRepository.AddAsync(spouse);
            //     policyToSave.SpouseFK = savedSpouse.Id;
            // }

            //save nominations
            // var nominations = _mapper.Map<IList<Nomination>>(model.Nominations);
            // var nominationSaved = await _nominationRepository.AddManyAsync(nominations);

            //save policy
           // await _policyRepository.AddAsync(policyToSave);
        }

        public async Task<PolicyViewModel> GetById(Guid id, string userId)
        {
            //_logger.LogInformation($"PolicyService.GetById called. id={id}; userId={userId}");

            //try
            //{
            //    var policy = await _policyRepository.GetByIdAsync(id);

            //    if(policy == null)
            //    {
            //        return null;
            //    }

            //    return _mapper.Map<PolicyViewModel>(policy);
            //}
            //catch (Exception exception)
            //{
            //    _logger.LogError(exception, $"Error when calling PolicyService.GetById. id={id}; userId={userId}");
            //    throw;
            //}
            return null;
        }

        public async Task<PolicyViewModel> GetByPolicyNo(string policyNo, string userId)
        {
            //_logger.LogInformation($"PolicyService.GetByPolicyNo called. id={policyNo}; userId={userId}");

            //try
            //{
            //    var policy = await _policyRepository.GetByPolicyNoAsync(policyNo);

            //    if(policy == null)
            //    {
            //        return null;
            //    }

            //    return _mapper.Map<PolicyViewModel>(policy);
            //}
            //catch (Exception exception)
            //{
            //    _logger.LogError(exception, $"Error when calling PolicyService.GetByPolicyNo. id={policyNo}; userId={userId}");
            //    throw;
            //}

            return null;
        }

        public Task Update(PolicyViewModel model, string userId)
        {
            throw new NotImplementedException();
        }
    }
}