using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TicTacToeGame.Models;

namespace TicTacToeGame.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Historico(int userId)
        {
            //Ler o arquivo e pegar os jogos
            var path = HttpContext.Server.MapPath("~/Json/game.json");
            List<Game> games = new List<Game>();

            using (StreamReader reader = new StreamReader(path))
            {
                var json = reader.ReadToEnd();
                games = JsonConvert.DeserializeObject<List<Game>>(json);
            }

            //Filtrar os jogos do usuario, UserID
            var filteredGames = games.Where(game => game.UserId == userId);

            //Enviar via modelo para a view
            return View(filteredGames);
        }

        public ActionResult Game(int userId)
        {
            return View();
        }

        [HttpPost]
        public ActionResult SaveGame(Game game)
        {
            var response = new ResponseModel();

            try
            {
                //Ler o arquivo com os registros
                var path = HttpContext.Server.MapPath("~/Json/game.json");
                List<Game> games = new List<Game>();

                using (StreamReader reader = new StreamReader(path))
                {
                    var json = reader.ReadToEnd();
                    games = JsonConvert.DeserializeObject<List<Game>>(json);
                }

                //Validar os dados antes de salvar
                //Incrementar o game ID
                var ultimoGameID = games.Max(g => g.GameId);
                ultimoGameID++;

                game.GameId = ultimoGameID;

                //Adicionar um novo registro na lista
                games.Add(game);

                //Salvar a lista no arquivo, Sobreescrever o arquivo com os novos registros
                var jsonString = JsonConvert.SerializeObject(games, Formatting.Indented);
                System.IO.File.WriteAllText(path, jsonString);

                response.Error = false;
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.ErrorMessage = ex.Message;
            }

            return Json(response);
        }
    
        [HttpPost]
        public ActionResult DeleteGame(int gameID)
        {
            var response = new ResponseModel();

            try
            {
                //Ler o arquivo com os registros
                var path = HttpContext.Server.MapPath("~/Json/game.json");
                List<Game> games = new List<Game>();

                using (StreamReader reader = new StreamReader(path))
                {
                    var json = reader.ReadToEnd();
                    games = JsonConvert.DeserializeObject<List<Game>>(json);
                }

                //pega o primeiro game id que achou 
                var gameFound = games.FirstOrDefault(g => g.GameId == gameID);

                //remover um registro na lista
                games.Remove(gameFound);

                //Salvar a lista no arquivo, Sobreescrever o arquivo com os novos registros
                var jsonString = JsonConvert.SerializeObject(games);
                System.IO.File.WriteAllText(path, jsonString);

                response.Error = false;
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.ErrorMessage = ex.Message;
            }

            return Json(response);
        }
    }
}