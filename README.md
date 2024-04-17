# DesafioBackendCoder

# Sprint 1

Gestor de Usuarios y Productos
Este repositorio contiene un gestor de usuarios y productos desarrollado en JavaScript. Las clases UserManager y ProductsManager permiten crear y gestionar usuarios y productos respectivamente.

Estructura del Proyecto
index.js: Archivo principal que instancia y utiliza las clases UserManager y ProductsManager.
UserManager.js: Clase para gestionar usuarios.
ProductsManager.js: Clase para gestionar productos.

# Sprint 2
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

# CHALLENGE 1

Este proyecto implica el desarrollo de una API REST con las siguientes características principales:
Utilización de gestores de "productos" y "usuarios" para manejar el almacenamiento de datos en memoria y archivos.
Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos y usuarios.
Uso exclusivo del idioma inglés para definir la API.
Manejo de errores para todas las rutas utilizando un errorHandler, y para rutas inexistentes con pathHandler.
Registro de solicitudes utilizando el middleware.
Definición de cuatro usuarios y cuarenta productos.

Propiedades de los Productos:
id: Código identificador hexadecimal de 12 bytes.
title: Título del producto (obligatorio).
photo: Ruta de la imagen (se proporcionan valores por defecto).
category: Categoría del producto (se proporcionan valores por defecto).
price: Precio del producto (por defecto: 1).
stock: Unidades disponibles (por defecto: 1).

Propiedades de los Usuarios:
id: Código identificador hexadecimal de 12 bytes.
photo: Ruta de la imagen (se proporcionan valores por defecto).
email: Dirección de correo electrónico (obligatorio).
password: Contraseña (obligatoria).
role: Rol del usuario (por defecto: 0).

Endpoints: Productos:
POST /api/products: Implementa el método create(data) para crear un producto y guardarlo utilizando el sistema de archivos (fs). La creación exitosa devuelve:
statusCode: 201
response: id (del nuevo producto)
message: (mensaje descriptivo)
El manejo de errores se gestiona con errorHandler.

Usuarios:
GET /api/users: Implementa el método read() para buscar todos los usuarios en el sistema de archivos (fs). Se agrega la consulta necesaria para filtrar por rol. Si el array contiene usuarios, se envía un objeto al cliente con las propiedades:
statusCode: 200
response: (el array)
El manejo de errores se realiza con errorHandler.

GET /api/users/:uid: Implementa el método readOne(uid) para buscar un usuario específico en el sistema de archivos (fs). Si se encuentra el usuario, se envía un objeto al cliente con las propiedades:
statusCode: 200
response: (el objeto)
El manejo de errores se realiza con errorHandler.

PUT /api/users/:uid: Implementa el método update(uid,data) para buscar y actualizar un usuario específico en el sistema de archivos (fs). Si se actualiza correctamente el usuario, se envía un objeto al cliente con las propiedades:
statusCode: 200
response: (el objeto modificado)
El manejo de errores se realiza con errorHandler.

DELETE /api/users/:pid: Implementa el método destroy(pid) para buscar y eliminar un usuario específico en el sistema de archivos (fs). Si se elimina el usuario correctamente, se envía un objeto al cliente con las propiedades:
statusCode: 200
response: (el objeto)
El manejo de errores se realiza con errorHandler.

Con estos endpoints, se logra una API RESTful que permite la gestión completa de productos y usuarios, cumpliendo con los requerimientos establecidos y garantizando la integridad de los datos y la experiencia del usuario.

# Sprint 4

Descripción
Esta aplicación es un sistema de comercio electrónico que permite la gestión de productos y usuarios, utilizando sockets para actualizar la información en tiempo real.

Configuración de Sockets
Configuración inicial
Para configurar los sockets, sigue estos pasos:

En la carpeta views, crea la carpeta layouts si no existe.
Dentro de layouts, crea el archivo products.handlebars.
Conexión de sockets
Asegúrate de configurar los puntos de conexión en el back y el front:

En el socket del servidor (back), utiliza socketServer.on() para configurar la conexión.
En el cliente, ejecuta io() para generar el socket.

Emisión y Recepción de eventos (datos)
Emisión "products": En el socket del servidor, utiliza el manager de productos de FS para enviar un objeto con todos los productos al socket del cliente.

Recepción "products": En el socket del cliente de la vista /real de Handlebars, renderiza dinámicamente los productos recibidos en tiempo real.

Emisión "new product": En el socket del cliente de la vista /real, captura los datos del formulario y emite el producto para guardarlo en el archivo JSON del backend.

Recepción "new product": En el socket del servidor, guarda el producto en el archivo y emite todos los productos para actualizar la vista /real en tiempo real.

Vistas
localhost:8080/
Página de inicio del comercio.
Incluye como mínimo el logo del comercio y todos los productos que se venden (solo HBS).
localhost:8080/products/real
Página con formulario de creación de producto y listado de productos.
Los productos se actualizan en tiempo real utilizando sockets (HBS + Socket).
localhost:8080/users/:uid
Página con los datos del usuario (solo HBS).
localhost:8080/users/register
Página con formulario para registrar un usuario (solo HBS, no es funcional).

Contacto
Para preguntas o problemas relacionados con el desarrollo, puedes contactarme a través de nicolas.a.pannunzio@email.com o lautyhoff77@gmail.com
