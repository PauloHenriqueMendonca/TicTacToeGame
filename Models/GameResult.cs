using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public class GameResult
    {
        //If a win ends in a tie will suplly the winner to None and won show the WinInfo
        public Player Winner { get; set; }
        public WinInformation WinInfo { get; set; }
    }
}