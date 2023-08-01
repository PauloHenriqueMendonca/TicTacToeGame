using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicTacToeGame.Models
{
    public enum WinType
    {
        //all the ways a player can win
        Row, Column, MainDiagonal, AntiDiagonal
    }
}