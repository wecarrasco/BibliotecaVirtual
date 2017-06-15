var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var usuarioSchema = new mongoose.Schema({
  // username: {type: String, unique: true, required: true},
  username: String,
  password: String,
  scope: [String]
});

usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model("usuario", usuarioSchema);
