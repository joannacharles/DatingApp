using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController: BaseAPIController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
        //    var users= await _userRepository.GetUsersAsync();// ading ok here for ienumerable
        //    var usersToReturn=_mapper.Map<IEnumerable<MemberDto>>(users);
        //     return Ok(usersToReturn);
        var users=await _userRepository.GetMembersAsync();
            return Ok(users);
        }   
        
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username){
            //var user= await _userRepository.GetUserByUsernameAsync(username);
          //  return _mapper.Map<MemberDto>(user);
          return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto){
            var username= User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if(user==null) return NotFound();
            _mapper.Map(memberUpdateDto,user);
            if(await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("failuree");
        }
    }
}