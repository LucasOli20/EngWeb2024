var express = require("express");
var router = express.Router();
var Auth = require("../controllers/auth");
var APIEnv = require('../config/apiEnv')
const jwt = require("jsonwebtoken");
const authEnv = require("../config/authEnv");
var axios = require('axios')

function generateQueryString(params) {
  return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
}

function createUrlWithParams(list) {
  const params = list.reduce((acc, item, index) => {
      acc[`item${index + 1}`] = item;
      return acc;
  }, {});
  return `${generateQueryString(params)}`;
}

router.get("/", Auth.verifyAcess, function(req, res) {
  res.redirect("/home")
})

router.get("/home", Auth.verifyAcess, function(req, res) {

  axios.get(APIEnv.apiRoute(`/users/${req.userID}/favoritos/curso?token=${req.cookies.token}`))
    .then(dados => {
      let cursosFav = dados.data.favoritos
      const cursosQuery = createUrlWithParams(cursosFav)
      axios.get(APIEnv.apiRoute(`/users/${req.userID}/favoritos/recurso?token=${req.cookies.token}`))
        .then(recData => {
          let recursosFav = recData.data.favoritos
          const recursosQuery = createUrlWithParams(recursosFav)
          axios.get(APIEnv.apiRoute('/recurso/info?' + recursosQuery + '&token=' + req.cookies.token))
            .then(infoRec => {
              axios.get(APIEnv.apiRoute('/curso/info?' + cursosQuery + '&token=' + req.cookies.token))
              .then(infoCur => {
                console.log(infoCur.datalength)
                res.render("home", {title : 'Home', selectAccountType: req.userRole == -1, cursos : infoCur.data.length == 0 ? null : infoCur.data, recursos : infoRec.data.length == 0 ? null : infoRec.data})
              })
            })
        })
    })
})

// Get página de registo de uma conta
router.get("/register", function (req, res, next) {
  res.render("register", {
    userData: { name: "", email: "", password: "", confirm: "", tipoUser : ""},
  });
});

// Post de um registo de um utilizador
router.post("/register", function (req, res, next) {
  if (req.body.password === req.body.confirm) {
    var regData = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.tipoUser,
    };

    Auth.register(regData)
      .then((response) => {
        if (response.data.error) {
          let error = response.data.error;
          if (error.name == "UserExistsError") {
            res.render("register", {
              warning:
                "Já existe um utilizador registado com o email inserido.",
              userData: req.body,
            });
          } else {
            res.render("register", {
              warning: "Ocorreu um erro. Tente novamente mais tarde.",
              userData: req.body,
            });
          }
        } else {
          res.cookie("token", response.data.token);
          res.redirect("/home");
        }
      })
      .catch((error) => {
        res.render("register", {
          warning: "Ocorreu um erro. Tente novamente mais tarde.",
          userData: req.body,
        });
      });
  } else {
    res.render("register", {
      warning: "Passwords não coincidem.",
      userData: req.body,
    });
  }
});

// GET da página de login
router.get("/login", function (req, res, next) {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, authEnv.secretKey, function (error, payload) {
      if (error) {
        if (error.name == "TokenExpiredError") {
          res.render("login", {
            warning: "Sessão Expirada. Inicie sessão novamente!",
            loginData: { email: "", password: "" },
          });
        } else {
          res.render("login", {
            warning: "Ocorreu um erro. Tente novamente mais tarde.",
            loginData: { email: "", password: "" },
          });
        }
      }
    });
  } else {
    res.render("login", { loginData: { email: "", password: "" } });
  }
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("token");
  res.redirect("/login");
});

// POST de um formulário de login
router.post("/login", function (req, res, next) {
  Auth.login(req.body)
    .then((resp) => {
      res.cookie("token", resp.data.token);
      res.redirect("/home");
    })
    .catch((error) => {
      console.log("Error on login: " + error.response.data);
      res.render("login", {
        warning: "Credenciais Inválidas.",
        loginData: req.body,
      });
    });
});

router.get("/profile", Auth.verifyAcess, function (req, res, next) {
  let token = req.cookies.token;
  Auth.getUser(req.userID, token)
    .then((dados) => {
      let user = dados.data;
      res.render("profile", { title: `Perfil ${user.name}`, user: user });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/profile/edit", Auth.verifyAcess, function (req, res, next) {
  let token = req.cookies.token;
  Auth.getUser(req.userID, token)
    .then((dados) => {
      let user = dados.data;
      console.log(user);
      res.render("profile", { title: `Perfil ${user.name}`, user: user });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/profile/edit', Auth.verifyAcess, function (req, res, next) {
  let token = req.cookies.token;
  Auth.editProfile(req.userID, token, req.body)
    .then((dados) => {
      if(dados.data.token)
      {
        console.log('New Token Found')
        res.cookie('token', dados.data.token)
      }
      else
      {
        console.log('No new Token found.')
      }
      userInfo = dados.data.user
      axios.put(APIEnv.apiRoute('/publicacao/atualiza-nome/' + userInfo._id + '?token=' + req.cookies.token), userInfo)
        .then(resp => {
          res.redirect('/profile')
        })
    })
    .catch((erro) => {
      console.log(erro)
    })
})

router.post(
  "/profile/password/edit",
  Auth.verifyAcess,
  function (req, res, next) {
    if (req.body.new == req.body.confirm) {
      console.log("token cookies: " + req.cookies.token);
      Auth.updatePassword(
        req.userID,
        req.body.new,
        req.body.old,
        req.cookies.token
      )
        .then((dados) => {
          res.redirect("/profile")
        })
        .catch((erro) => {
          res.redirect("/profile");
        });
    }
  }
);

router.get("/login/callback", function (req, res, next) {
  if (req.cookies.token) {
    res.cookie("token", req.cookies.token);
    const redirectUrl = req.cookies.redirectUrl || "home";
    if (req.cookies.redirectUrl) {
      res.clearCookie(redirectUrl);
    }
    res.redirect("/" + redirectUrl);
  } else {
    console.log("Authentication failed...");
    res.redirect("/login");
  }
});

router.get("/login/google", function (req, res, next) {
  res.redirect("http://localhost:9090/users/login/google?redirect=home");
});

router.post('/role', Auth.verifyAcess, function(req, res, next) {
  if(req.userRole == -1)
  {
    let token = req.cookies.token
    Auth.updateUserInfo(req.userID, req.body, token)
      .then(response => {
        if (response.data.token)
        {
          console.log('New token found')
          res.cookie('token', response.data.token)
        }
        res.redirect('/home')
      })
      .catch(error => {
        res.redirect('/home')
      })
  }
})

module.exports = router;
