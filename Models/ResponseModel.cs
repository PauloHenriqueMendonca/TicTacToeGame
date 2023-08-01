using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public class ResponseModel
    {
        public string RedirectURL { get; set; }
        public string ErrorMessage { get; set; }
        public bool Error { get; set; }
    }
}