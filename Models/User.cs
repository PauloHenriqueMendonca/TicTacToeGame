using Newtonsoft.Json;

namespace TicTacToeGame.Models
{
    public class User
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("usuario")]
        public string Username { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }
}