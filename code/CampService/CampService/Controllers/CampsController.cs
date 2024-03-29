﻿using Camps.API.Models;
using Camps.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Camps.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CampsController : ControllerBase
    {
        private readonly ICampsService _campsService;
        private readonly ILogger<CampsController> _logger;

        public CampsController(ICampsService campsService, ILogger<CampsController> logger)
        {
            _campsService = campsService;
            _logger = logger;
        }

        /// <summary>
        ///     List of camps
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Camps
        ///
        /// </remarks>
        /// <returns>List of camps</returns>
        /// <response code="200">Returns list of camps</response>
        /// <response code="400">Bad request error massage</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCamps()
        {
            try
            {
                _logger.LogInformation("Start getting all camps.");
                var result = await _campsService.GetCamps();
                if (result == null)
                {
                    _logger.LogError("Error getting camps. Camps not found.");
                    return NotFound("Error getting camps. Camps not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting camps.", ex);
                return BadRequest("Error getting camps.");
            }
        }

        /// <summary>
        ///     Camp object
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Camps/5fc7db84bad96d1122af5644
        ///
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <returns>Camp object</returns>
        /// <response code="200">Returns camp object</response>
        /// <response code="400">Bad request error massage</response>
        /// <response code="404">Not found camp</response>
        [HttpGet("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCamp(string id)
        {
            try
            {
                _logger.LogInformation($"Start getting camp with ID {id}.");
                var result = await _campsService.GetCamp(id);
                if (result == null)
                {
                    _logger.LogError("Error getting camp. Camp not found.");
                    return NotFound("Error getting camp. Camp not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting camp.", ex);
                return BadRequest("Error getting camp.");
            }
        }

        /// <summary>
        ///     Camp categories list of object
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Camps/5fc7db84bad96d1122af5644/Categories
        ///
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <returns>List of categories</returns>
        /// <response code="200">Returns list of categories</response>
        /// <response code="400">Bad request error massage</response>
        /// <response code="404">Not found camp</response>
        [HttpGet("{id:length(24)}/Categories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCampCategories(string id)
        {
            _logger.LogInformation($"Start getting camp categories for camp ID {id}.");
            try
            {
                var result = await _campsService.GetCampCategories(id);
                if (result == null)
                {
                    _logger.LogError("Error getting camp categories. Camp categories not found.");
                    return NotFound("Error getting camp categories. Camp categories not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting camp categories.", ex);
                return BadRequest("Error getting camp categories.");
            }
        }

        /// <summary>
        ///     Create camp
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/Camps
        ///     {
        ///        "Name": "Kuča posu",
        ///        "Description": "Tak dobr posu, da te obere do kosti.",
        ///        "Title": "Nartovalski vzorec Obiralec",
        ///        "PhoneNumber": "073322100",
        ///        "Categories": [
        ///             {
        ///                 "Id": "5fce5d80e15eb9e00e02e78d",
        ///                 "Title": "More more more - kamperina na MORU",
        ///                 "Description": "More more more more dok ja veslam ona suti sutim i ja.",
        ///                 "CreateAt": "2020-12-07T16:51:12.445839+00:00",
        ///                 "UpdatedAt": "2020-12-07T16:51:12.4459116+00:00"
        ///             }
        ///         ],
        ///        "LocationX": "45.12312",
        ///        "LocationY": "14.22999"
        ///     }
        /// 
        /// </remarks>
        /// <param name="camp">Camp object</param>
        /// <returns>A newly created camp</returns>
        /// <response code="201">Returns the newly created camp</response>
        /// <response code="400">If camp is null</response>  
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> CreateCamp(Camp camp)
        {
            try
            {
                _logger.LogInformation("Start creating camp.");
                var result = await _campsService.CreateCamp(camp);
                if (result == null)
                {
                    _logger.LogError("Error creating camp.");
                    return BadRequest("Error creating camp.");
                }

                return CreatedAtAction(nameof(GetCamp), new {id = result.Id}, result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating camp.", ex);
                return BadRequest("Error creating camp.");
            }
        }

        /// <summary>
        ///     Update camp
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT /api/Camps/5fc7db84bad96d1122af5644
        ///     {
        ///        "Id": "5fc7db84bad96d1122af5644",
        ///        "Name": "Kuča posu",
        ///        "Description": "Tak dobr posu, da te obere do kosti.",
        ///        "Title": "Nartovalski vzorec Obiralec",
        ///        "PhoneNumber": "073322100",
        ///        "Categories": [
        ///             {
        ///                 "Id": "5fce5d80e15eb9e00e02e78d",
        ///                 "Title": "More more more - kamperina na MORU 2.0",
        ///                 "Description": "More more more more dok ja veslam ona suti sutim i ja.",
        ///                 "CreateAt": "2020-12-07T16:51:12.445839+00:00",
        ///                 "UpdatedAt": "2020-12-07T16:51:12.4459116+00:00"
        ///             }
        ///         ],
        ///        "LocationX": "45.12312",
        ///        "LocationY": "14.22999"
        ///     }
        /// 
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <param name="campIn">Camp object</param>
        /// <response code="204">No content</response>
        /// <response code="404">If the camp is null</response>
        /// <response code="400">Bad request arguments</response>
        [HttpPut("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> UpdateCamp(string id, Camp campIn)
        {
            try
            {
                _logger.LogInformation($"Start updating camp with ID {id}.");
                if (campIn.Id != id)
                {
                    _logger.LogError($"Error updating camp. Argument ID exception. {id} != {campIn.Id}");
                    return BadRequest($"Error updating camp. Argument ID exception. {id} != {campIn.Id}");
                }

                var result = await _campsService.GetCamp(id);
                if (result == null)
                {
                    _logger.LogError("Error updating camp. Camp not found.");
                    return NotFound("Error updating camp. Camp not found.");
                }

                await _campsService.UpdateCamp(id, campIn);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating camp.", ex);
                return BadRequest("Error updating camp.");
            }
        }

        /// <summary>
        ///     Delete camp
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     DELETE /api/Camps/5fc7db84bad96d1122af5644
        /// 
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <response code="204">No content</response>
        /// <response code="404">If the camp is null</response>
        /// <response code="400">Bad request arguments</response> 
        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> DeleteCamp(string id)
        {
            try
            {
                _logger.LogInformation($"Start deleting camp with ID {id}.");
                var camp = await _campsService.GetCamp(id);

                if (camp == null)
                {
                    _logger.LogError("Error deleting camp. Camp not found.");
                    return NotFound("Error deleting camp. Camp not found.");
                }

                await _campsService.RemoveCamp(camp.Id);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting camp.", ex);
                return BadRequest("Error deleting camp.");
            }
        }
    }
}