var libro = require("../schemas/libro");
var mongoose = require ("mongoose");

//Obtener los libros
exports.getLibros = {
  handler: function(req, res){
    var libros = libro.find({});
    res(libros);
  }
}

//Obtener libro por id
exports.getLibroId = {
  handler: function(req, res){
    libro.findOne({'_id' : req.params.id}, function(err, Libro){
      if (!err && Libro) {
        return res(Libro);
      }else if (!err) {
        return res(boom.notFound());
      }else if (err) {
        return res(boom.wrap(err, "Libro no encontrado"));
      }
    });
  }
}

//Obtener libro por titulo
exports.getLibroTitulo = {
  handler : function(req, res){
    libro.findOne({"titulo" : req.params.titulo}, function(err, Libro){
      if (!err && Libro) {
        return res(Libro);
      }else if (!err) {
        return res(boom.notFound());
      }else if (err) {
        return res(boom.wrap(err, "Libro no encontrado"));
      }
    });
  }
}

//Obtener libro por autor
exports.getLibroAutor = {
  handler : function(req, res){
    libro.find({"autor" : req.params.autor}, function(err, Libro){
      if (!err && Libro) {
        return res(Libro);
      }else if (!err) {
        return res(boom.notFound());
      }else if (err) {
        return res(boom.wrap(err, "Libros no encontrados"));
      }
    });
  }
}

//Obtener libros prestados
exports.getLibroPrestado = {
  handler : function(req, res){
    libro.find({"prestado" : 1}, function(err, Libro){
      if (!err && Libro) {
        return res(Libro);
      }else if (!err) {
        return res(boom.notFound());
      }else if (err) {
        return res(boom.wrap(err, "Libros no encontrados"));
      }
    })
  }
}

//Prestar un libros
exports.putLibroPrestar = {
  handler : function(req, res){
    libro.findOne({"_id" : req.params.id}, function(err, Libro){
      if (!err && Libro) {
        var copias_disponibles = Libro.copias_disponible - 1;
        Libro.update(
          {"_id" : req.params.id},
          {$set:
            {
              copias_disponible : copias_disponibles,
              prestado: 1
            }
          }, function(err){
            if (err) {
              return res(boom.wrap(err, "Libro no encontrado"));
            }else {
              return res("Prestado satisfactoriamente");
            }
          });
        }else if(!err){
          return res(boom.notFound());
        }else if(err){
          return res(boom.wrap(err, 'Libro no encontrado'));
        }
      }
    );
  }
}

//Modificar un libros
exports.modificarLibro = {
  handler : function(req, res){
    libro.update(
      {"_id" : req.params.id},
      {$set:
        {
          titulo : request.payload.titulo,
          genero : request.payload.genero,
          autor : request.payload.autor,
          publicacion : request.payload.publicacion,
          editorial : request.payload.editorial,
          descripcion : request.payload.descripcion,
          keywords : request.payload.keywords
        }
      }, function(err){
        if (err) {
          return res(boom.wrap(err, "Libro no encontrado"));
        }else{
          return res("Actualizado satisfactoriamente")
        }
      }
    );
  }
}


//Crear un libro
exports.crearLibro{
  handler: function(req, res){
    var libroNuevo = new libro({
      titulo : request.payload.titulo,
      genero : request.payload.genero,
      autor : request.payload.autor,
      publicacion : request.payload.publicacion,
      editorial : request.payload.editorial,
      descripcion : request.payload.descripcion,
      keywords : request.payload.keywords,
      copias_total : request.payload.copias_total,
      copias_disponible : request.payload.copias_disponible,
      prestado : 0
    });
    libroNuevo.save(function(err){
      if (!err) {
        return res({
          success:true
        });
      }else{
        return res({
          success:false
        })
      }
    });
  }
}

//Eliminar un libro
exports.eliminarLibro ={
  handler : function(req, res){
    libro.findOne({"_id" : req.params.id}, function(err, Libro){
      if (err) {
        return res(boom.badRequest("No se pudo eliminar el libro"));
      }else if (!err) {
        return res(boom.notFound());
      }else if (!err && Libro) {
        return res("Libro eliminado satisfactoriamente");
      }
    });
  }
}
