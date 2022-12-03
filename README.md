
# API REST Deliverys

## Integrantes: 
- Jony Salvador Lopez Martinez
- Jorge Arturo Canales Ortega
- Carlos Josue Su Pleitez

<br>

## Requisitos:
- [nodejs](https://nodejs.org/es/)
- npm
- [PostgreSQL](https://www.postgresql.org/download/) (después de instalarlo se debe crear una base de datos la cual será la que se colocará en ``PG_DATABASE`` en las variables de entorno)

<br>

## Instrucciones:
1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Copiar el archivo `.env.example` y renombrarlo a `.env` y configurar las variables de entorno.
4. Ejecutar el comando `npm run dev` para iniciar la aplicación.
5. En el navegador puede ingresar a la ruta ``http://localhost:PORT/api/documentation`` y verá todas las rutas disponibles para consumir la api y otros datos adicionales de las mismas como ser la sección a la que pertenece, descripción, método y la url. En caso de no querer crear las rutas para las peticiones puede instalar [Insmonia](https://insomnia.rest/download) y seguir las instrucciones del repositorio: [api-rest-deliverys-insomnia](https://github.com/CarlosSu02/api-rest-deliverys-insomnia).

<br>

> En la primera ejecución del programa se guardarán por defecto en la base de datos algunos roles y categorias de productos.

<br>

## Paquetes npm utilizados:
1. [typescript](https://www.npmjs.com/package/typescript)
2. [nodemon](https://www.npmjs.com/package/nodemon)
3. [ts-node](https://www.npmjs.com/package/ts-node)
4. [express](https://www.npmjs.com/package/express), [@types/express](https://www.npmjs.com/package/@types/express)
5. [cors](https://www.npmjs.com/package/cors), [@types/cors](https://www.npmjs.com/package/@types/cors)
6. [dotenv](https://www.npmjs.com/package/dotenv)
7. [bcrypt](https://www.npmjs.com/package/bcrypt), [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)
8. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)
9. [pg](https://www.npmjs.com/package/pg), [@types/pg](https://www.npmjs.com/package/@types/pg)
10. [pg-hstore](https://www.npmjs.com/package/pg-hstore)
11. [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)
12. [cookie](https://www.npmjs.com/package/cookie), [@types/cookie](https://www.npmjs.com/package/@types/cookie)
13. [cookie-parser](https://www.npmjs.com/package/cookie-parser), [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser)
14. [class-validator](https://www.npmjs.com/package/class-validator)
15. [class-transformer](https://www.npmjs.com/package/class-transformer)
