using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public class Cadastro
    {
        public string usuario { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string passwordConfirmation { get; set; }
    }
}