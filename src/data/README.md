# DesafioBackendCoder

Gestor de Usuarios y Productos
Este repositorio contiene un gestor de usuarios y productos desarrollado en JavaScript. Las clases UserManager y ProductsManager permiten crear y gestionar usuarios y productos respectivamente.

Estructura del Proyecto
index.js: Archivo principal que instancia y utiliza las clases UserManager y ProductsManager.
UserManager.js: Clase para gestionar usuarios.
ProductsManager.js: Clase para gestionar productos.

# Sprint2
Este proyecto utiliza los módulos fs y crypto de Node.js para la gestión de usuarios. Las funciones principales son:

init()
Inicializa el archivo de usuarios si no existe, creando un archivo JSON vacío si es necesario.

read()
Lee y retorna todos los usuarios almacenados en el archivo.

readOne()
Lee y retorna un usuario específico según su ID.

create()
Crea un nuevo usuario con los datos proporcionados y lo guarda en el archivo.

destroy()
Elimina un usuario específico según su ID del archivo de usuarios.

# Sprint 3
Coder API
Este repositorio contiene una API simple creada con Express.js. La API maneja usuarios y productos, y se ejecuta en el puerto 8080.

* Uso
Ejecuta el servidor local, a través del comando: npm run dev

* Rutas disponibles:
GET /api/users/:photo/:email/:password/:role 
Crea un nuevo usuario con los siguientes parámetros:
photo: URL de la foto del usuario
email: dirección de correo electrónico
password: contraseña
role: rol del usuario (por ejemplo, “admin” o “user”)

GET /api/products/:photo/:title/:category/:price/:stock 
Crea un nuevo producto con los siguientes parámetros:
photo: URL de la foto del producto
title: título del producto
category: categoría del producto
price: precio del producto
stock: cantidad en stock

Explicación de Localhost
Cuando ejecutas npm run dev, el servidor Express.js se inicia en el puerto 8080 de tu localhost. Esto significa que puedes acceder a los puntos finales de la API localmente haciendo solicitudes HTTP a http://localhost:8080/.

Contacto
Para preguntas o problemas relacionados con el desarrollo, puedes contactarme a través de nicolas.a.pannunzio@email.com o lautyhoff77@gmail.com