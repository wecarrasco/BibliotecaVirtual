var usuario = require("../Schemas/usuario");
var SHA3 = require("crypto-js/sha3");
var boom = require("boom");

exports.crearUsuario = {
  auth: {
    mode: "try",
    strategy: "session"
  },
  handler: function(req, res){
    console.log(req.payload);
    var newUsuario = new usuario({
      username: req.payload.username,
      password: SHA3(req.payload.password),
      scope: req.payload.scope
    });
    console.log("Username: "+newUsuario.username);
    newUsuario.save(function(err){
      console.log(err);
      if (err) {
        return res(boom.notAcceptable("Username debe ser unico: "+err));
      }else{
        return res("ok");
      };
    });
  }
};

exports.getUsuarios ={
  handler: function(req, res){
    var usuarios = usuario.find({});
    res(usuarios);
  }
}
