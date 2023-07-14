
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseAPIController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService){
            _tokenService = tokenService;
            _context = context;

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDtos registerDto){
            if(await UserExists(registerDto.Username)) return BadRequest("Username already taken");
            using var hmac= new HMACSHA512();// using is for garbage collection
            var user= new AppUser
            {
                UserName=registerDto.Username.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();// for the prev line to actually work
            return new UserDto{
                Username=user.UserName,
                Token=_tokenService.CreateToken(user)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDtos logindto){
            var user=await _context.Users.SingleOrDefaultAsync(x=>x.UserName==logindto.Username);
            if(user==null){
                return Unauthorized("Username does not exist");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));
            for(int i=0;i<computedHash.Length;i++){
                if(computedHash[i]!=user.PasswordHash[i]) return Unauthorized("invalid password");
            }
            return new UserDto{
                Username=user.UserName,
                Token=_tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserExists(string username){
            return await _context.Users.AnyAsync(appuser=>appuser.UserName==username.ToLower());// user is app user bcuz Users is basically AppUser
        }

    }
}