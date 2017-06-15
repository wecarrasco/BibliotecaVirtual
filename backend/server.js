var hapi = require("hapi");
var inert = require("inert");
var mongoose = require("mongoose");
var routes = require("./routes");
var auth = require("hapi-auth-cookie");

var server = new hapi.Server();
server.connection({
  port: ~~process.env.PORT || 8000,
  routes:{
    cors:{
      origin:["*"]
    }
  }
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin@ds127132.mlab.com:27132/biblioteca");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback(){
  console.log("Connection with database succeeded");
});

server.register([inert, auth], function(err){
  server.auth.strategy("session", "cookie", {
    password:"encryptionstring",
    cookie: "biblioteca-cookie",
    ttl: 24 * 60 * 60 * 1000,
    isSecure: false
  });
  server.route(routes.endpoints);
  server.start(function(){
    console.log("server running at: ", server.info.uri , "...");
  });
});
