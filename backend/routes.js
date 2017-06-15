var librosController = require("./controllers/librosController");
var usuarioController = require("./controllers/usuarioController");
var authController = require('./controllers/authController');

exports.endpoints=[
  {
    method: "GET",
    path: "/libros",
    config: librosController.getLibros
  },
  {
    method: "GET",
    path: "./libros/ID/{id}",
    config: librosController.getLibroId
  },
  {
    method: "GET",
    path: "./libros/titulo/{titulo}",
    config: librosController.getLibroTitulo
  },
  {
			method: 'GET',
			path: '/libros/genero/{genero}',
			config: librosController.getLibroGenero
 	},
	{
			method: 'GET',
			path: '/libros/autor/{autor}',
			config: librosController.getLibroAutor
 	},
	// {
	// 		method: 'GET',
	// 		path: '/libros/searchbykey', //FALTA HACER EJEMPLO POSTMAN
	// 		config: librosController.getBookKey
 // 	},
	{
			method: 'GET',
			path: '/libros/prestados',
			config: librosController.getLibroPrestado
 	},
 	{
 			method: 'PUT',
 			path: '/libros/update/{id}',
 			config: librosController.modificarLibro
 	},
	{
			method: 'PUT',
			path: '/libros/prestar/{id}',
			config: librosController.putLibroPrestar
 	},
	{
			method: 'DELETE',
			path: '/libros/eliminar/{id}',
			config: librosController.eliminarLibro
 	},
	{
			method: 'POST',
			path: '/libros/crear',
			config: librosController.crearLibro
 	},
  // {
  //   method: "GET",
  //   path: "/users",
  //   config: usuarioController.getUsuarios
  // },
  {
    method: "POST",
    path: "/users/registro",
    config: usuarioController.crearUsuario
  },
  {
    method: 'POST',
    path: '/users/login',
    config: authController.login
  },
	{
    method: 'GET',
    path: '/users/logout',
    config: authController.logout}
]
