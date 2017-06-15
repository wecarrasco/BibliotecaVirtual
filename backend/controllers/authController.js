var joi = require("joi");
var boom = require("boom");
var user = require("../Schemas/usuario");
var SHA3 = require("crypto-js/sha3");

exports.login ={
  auth: false,
  validate: {
    payload:{
      username: joi.string().required(),
      password: joi.string().min(2).max(20).required()
    }
  },
  handler: function(req, res){
    var password = String(SHA3(req.payload.password));
    user.find({username: req.payload.username, password: password}, function(err, user){
      if (!err) {
        if (user.length > 0) {
          req.cookieAuth.set(user[0]);
          return res({username: user[0].username, scope: user[0].scope});
        }
        return res(boom.unauthorized("Username o contraseña incorrectos"));
      }
      return res(boom.notAcceptable("Error Executing Query"));
    });
  }
};

exports.logout = {
  auth: {
    mode:'required',
    strategy:'session'
  },
  handler: function(request, reply) {
    request.cookieAuth.clear();
    return reply('Logout Successful!');
  }
};
