# Dices - REST API
API que da soporte a un juego de dados. Se tiran dos dados y si el resultado es 7 la partida se gana en caso contrario se pierde.  
Para la persistencia de los datos se ha usado MySQL con Sequelize y Mongo DB con Mongoose, seleccionable desde las variables de entorno.

## Instrucciones:
1. Para la ejecución del programa se tiene que haber instalado previamente [Node.js](https://nodejs.org/es/).
2. Se ha incluido un archivo **.config.env** que se tiene que renombrar como **.env** y rellenar con los datos correctos. En la primera línea, DATABASE, escribir **mysql** o **mongodb** dependiendo de que tipo de base de datos se desea usar. 
3. Depués de descargar el repositorio de [GitHub](https://github.com/eliashz/nodeInitialDemo/tree/api-4.2) hay que hacer `npm i` desde de la raíz y desde la consola para la instalación de las dependencias: 
    - [express](https://www.npmjs.com/package/express)
    - [Sequelize](https://www.npmjs.com/package/sequelize)
    - [mysql2](https://www.npmjs.com/package/mysql2)
    - [Mongoose](https://www.npmjs.com/package/mongoose)
    - [Cors](https://www.npmjs.com/package/cors)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
4. Teclear `npm start` desde consola para iniciar.
5. Para la comprobación de los **endpoints**, se tiene que importar en [Postman](https://www.postman.com/) el archivo *4.2-Dices-jwt.postman_collection.json* que hay dentro de la carpeta *postman*:
    - **POST /players** -> Crea un jugador.
    - **PUT /players/:id** -> Modifica el nombre del jugador.
    - **GET /players** -> Devuelve el listado de los jugadores y su porcentaje de éxito.
    - **POST /games/:id** -> Un jugador hace una tirada en base a su ID.
    - **DELETE /games/:id** -> Elimina las tiradas de un jugador.
    - **GET /games/:id** -> Devuelve el listado de tiradas de un jugador.
    - **GET /rankings** -> Devuelve un listado de los jugadores ordenado por su porcentaje de éxito y el porcentaje medio de todos los jugadores.
    - **GET /rankings/loser** -> Devuelve el jugador con peor porcentaje.
    - **GET /rankings/winner** -> Devuelve el jugador con mejor porcentaje.
    - **GET /login** -> Permite acceder a un administrador mediante usuario y contraseña y devuelve un token.
 

<br>

* * *

<br>

### Documentación:
+ [Sequelize](https://sequelize.org/)
    - [Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)  
    - [DataTypes](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
+ [Mongoose](https://mongoosejs.com/docs/)
+ [Express: Database Integration](https://expressjs.com/es/guide/database-integration.html)
+ [JSON Web Tokens](https://jwt.io/)