using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public class WinInformation
    {
        //supply information of how a player won the game
        //if a player won by filling out the row or column
        public WinType Type { get; set; }
        //the integer will tell by which way a player won and which row or column was it
        // needs this to display a green line when a player wins
        public int Number { get; set; }
    }
}