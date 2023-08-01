using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TicTacToeGame.Models;
using System.IO;
using System.Collections;

namespace TicTacToeGame.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Logar(string usuario, string senha)
        {
            var path = HttpContext.Server.MapPath("~/Json/user.json");
            List<User> usuarios = new List<User>();

            using (StreamReader reader = new StreamReader(path))
            {
                var json = reader.ReadToEnd();
                usuarios = JsonConvert.DeserializeObject<List<User>>(json);
            }

            var usuarioNoBanco = usuarios.FirstOrDefault(u => u.Username == usuario);

            if(usuarioNoBanco != null)
                if(usuarioNoBanco.Password == senha)
                    return RedirectToAction("Index", "Home", new { userId = usuarioNoBanco.UserId, maisUmParametro = "vazio" });

            ViewBag.ErrorMessage = "Login Invalido!";
            return View("Index");
        }

        public ActionResult Cadastro()
        {
            ViewBag.Message = "Favor preencha seu cadastro";

            return View();
        }

        [HttpPost]
        public ActionResult Cadastrar(string usuario, string email, string senha, string confirmacaoSenha)
        {
            try
            {
                //Ler o arquivo com os registros
                var path = HttpContext.Server.MapPath("~/Json/user.json");
                List<User> usuarios = new List<User>();

                using (StreamReader reader = new StreamReader(path))
                {
                    var json = reader.ReadToEnd();
                    usuarios = JsonConvert.DeserializeObject<List<User>>(json);
                }

                //Verificar se o novo usuario que esta sendo cadastrado ja existe antes 
                var userExists = usuarios.FirstOrDefault(uexists => uexists.Username == usuario);

                if(userExists != null)
                {
                    ViewBag.ErrorMessage = "Usuario ja existe, favor tente outro usuario!";
                    return View("Cadastro");
                }
                else
                {
                    var ultimoUserID = usuarios.Max(user => user.UserId);
                    ultimoUserID++;

                    //Adicionar um novo registro na lista
                    var u = new User();
                    u.UserId = ultimoUserID;
                    u.Username = usuario;
                    u.Email = email;
                    u.Password = senha;

                    usuarios.Add(u);
                }

                if (email != null && senha == confirmacaoSenha)
                {
                    //Salvar a lista no arquivo, Sobreescrever o arquivo com os novos registros
                    var jsonString = JsonConvert.SerializeObject(usuarios, Formatting.Indented);
                    System.IO.File.WriteAllText(path, jsonString);

                    ViewBag.Message = "Cadastro Efetuado com successo!";
                    return RedirectToAction("Index");
                }
                else
                {
                    ViewBag.ErrorMessage = "Cadastro Invalido!";
                    return View("Cadastro");
                }
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = "Erro ao cadastrar!";
                return View("Cadastro");
            }
        }
    }
}
