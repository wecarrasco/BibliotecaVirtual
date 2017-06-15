var usuario = require("../schemas/usuario");
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
      password: SAH3(req.payload.password),
      scope: req.payload.scope
    });
    newUsuario.save(function(err){
      console.log(err);
      if (err) {
        return res(boom.notAcceptale("Username debe ser unico: "+err));
      }else{
        return res("ok");
      };
    });
  }
};
