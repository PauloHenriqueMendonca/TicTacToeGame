using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public class Game
    {
        public DateTime Date { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }
        public string Winner { get; set; }
        public int QuantMoves { get; set; }
    }
}