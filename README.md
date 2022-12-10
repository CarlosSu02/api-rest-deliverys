
# API REST Deliverys

<br>

## Integrantes: 
- Jony Salvador Lopez Martinez
- Jorge Arturo Canales Ortega
- Carlos Josue Su Pleitez

<br>

----
## Requisitos:
- [nodejs](https://nodejs.org/es/)
- npm
- [PostgreSQL](https://www.postgresql.org/download/) (después de instalarlo se debe crear una base de datos la cual será la que se colocará en ``PG_DATABASE`` en las variables de entorno)

<br>

----
## Instrucciones:
1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Copiar el archivo `.env-template` y renombrarlo a `.env` y configurar las variables de entorno.
4. Ejecutar el comando `npm run dev` para iniciar la aplicación.
5. En el navegador puede ingresar a la ruta ``http://localhost:PORT/api/documentation`` y verá todas las rutas disponibles para consumir la api y otros datos adicionales de las mismas como ser la sección a la que pertenece, descripción, método y la URL. En caso de no querer crear las rutas para las peticiones puede instalar [Insmonia](https://insomnia.rest/download) y seguir las instrucciones del repositorio: [api-rest-deliverys-insomnia](https://github.com/CarlosSu02/api-rest-deliverys-insomnia).

<br>

> En la primera ejecución del programa se guardarán por defecto en la base de datos algunos roles y categorias de productos.

<br>

### Diagrama Entidad-Relación
![Diagrama Entidad-Relación](https://github.com/CarlosSu02/api-rest-deliverys/blob/dev-carlos/others/diagram-database.png)

<br>

----
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

<br>

----
## Rutas
En caso de no correr la aplicación las rutas disponibles son las siguientes:

<details>
 <summary> Roles </summary>
    
 - Descripción: Lista de solicitudes disponibles para los roles.
 - Acceso: Superadmin [CRUD].
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/roles
  
   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/roles
     <br>Ejemplo body: 
      ```
	    {
            "type": "example"
	    }     
      ```

   3. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/roles/1
     <br>Ejemplo body: 
      ```
	    {
            "type": "example"
	    }     
      ```  

   4. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/roles/1

</details>

<details>
 <summary> Auth </summary>

 - Descripción: Lista de solicitudes disponibles para auth (authentication).
 - Acceso: Todos los usuarios.
 - Rutas: 
   1. Metodo: POST
     <br>URL: http://localhost:PORT/api/auth/signup
     <br>Ejemplo body: 
      ```
	    {
            "name": "example",
            "phone": 12345678,
            "address": "example",
            "email": "example@gmail.com",
            "password": "example",
            "confirm_password": "example",
            "roleId": 1
	    }    
      ```

   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/auth/signin
     <br>Ejemplo body: 
      ```
	    {
            "email": "example@gmail.com",
            "password": "example",
	    }    
      ```

   3. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/auth/change_password
     <br>Ejemplo body: 
      ```
	    {
            "email": "example@gmail.com",
		    "password": "example",
	        "new_password": "exampleNewPassword",
            "confirm_new_password": "exampleNewPassword"
	    }   
      ```  

   4. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/auth/signout

</details>

<details>
 <summary> Users </summary>

 - Descripción: Lista de solicitudes disponibles para users.
 - Acceso: Todos los usuarios.
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/user/users
     <br>Usuario: Solo Superadmin.
  
   2. Metodo: GET
     <br>URL: http://localhost:PORT/api/user/profile
     
   3. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/user/update
     <br>Nota: Pueden ser menos datos.
     <br>Ejemplo body: 
      ```
	    {
	        "name": "example update",
	        "phone": 87654321,
		    "address": "example update",
	        "roleId": 9999
	    }     
      ```
  
   4. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/user/delete
     <br>Ejemplo body: 
      ```
	    {
	        "email": "example@gmail.com",
		    "password": "example"
	    }    
      ```
      
</details>

<details>
 <summary> Bills </summary>

 - Descripción: Lista de solicitudes disponibles para bills.
 - Acceso: Buyer [RP] y Seller [R].
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/bills/user
  
   2. Metodo: GET
     <br>URL: http://localhost:PORT/api/bills
     
   3. Metodo: POST
     <br>URL: http://localhost:PORT/api/bills
     <br>Ejemplo body: 
      ```
        {
	        "paymentForm": "credit card, bank transfer or paypal",
	        "products": [
	            {
                    "product": "example product 1",
	                "amount": 1,
	                "store": "example store 1"
	            },
	            {
	                "product": "example product 2",
	                "amount": 1,
	                "store": "example store 2"	            
	            },
	            {
	                "product": "example product 3",
	                "amount": 1,
	                "store": "example store 3"	            
	            }
	        ]
	    }     
      ```
      
</details>

<details>
 <summary> Ingredients </summary>

 - Descripción: Lista de solicitudes disponibles para ingredients.
 - Acceso: Seller.
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/ingredients
  
   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/ingredients
     <br>Ejemplo body: 
      ```
        {
            "name": "coffee",
	        "amount": 1223,
	        "unit_measure": 3442,
	        "cost": 223,
	        "stock": 345
        }        
      ```
      
   3. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/ingredients/1
     <br>Ejemplo body: 
      ```
        {
            "name": "exported coffee",
	        "amount": 1223,
	        "unit_measure": 3442,
	        "cost": 223,
	        "stock": 345
        }   
      ```
      
   4. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/ingredients/1

</details>

<details>
 <summary> Products </summary>

 - Descripción: Lista de solicitudes disponibles para products.
 - Acceso: Seller.
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/products
  
   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/products
     <br>Ejemplo body: 
      ```
        {
            "name": "example",
	        "description": "example description",
	        "price": 30,
	        "priceNotTax": 28,
	        "isElaborate": false,
	        "stock": 50,
	        "size": "8 onz",
	        "categoryId": 2
        }   
      ```
     
   3. Metodo: POST
     <br>URL: http://localhost:PORT/api/products/superadmin
     <br>Usuario: Solo Superadmin.
     <br>Ejemplo body: 
      ```
        {
            "name": "example",
            "description": "example description",
            "price": 30,
            "priceNotTax": 28,
            "isElaborate": false,
            "stock": 50,
            "size": "8 onz",
            "categoryId": 2
            "sellerEmail": "exampleseller@gmail.com"
        }   
      ```
     
   4. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/products/1
     <br>Ejemplo body: 
      ```
        {
            "name": "edit example",
            "description": "edit example description",
            "price": 30,
            "priceNotTax": 28,
            "isElaborate": false,
            "stock": 50,
            "size": "8 onz",
            "categoryId": 3
        }   
      ```
     
   5. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/products/1 

</details>

<details>
 <summary> Categories </summary>

 - Descripción: Lista de solicitudes disponibles para categories.
 - Acceso: Seller.
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/categories
  
   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/categories
     <br>Ejemplo body: 
      ```
        {
            "name": "example category"
        }   
      ```
     
   3. Metodo: PATCH
     <br>URL: http://localhost:PORT/api/categories/1
     <br>Ejemplo body: 
      ```
        {
            "name": "edit category seller"
        }   
      ```
     
   4. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/categories/1 

</details>

<details>
 <summary> Recipes </summary>

 - Descripción: Lista de solicitudes disponibles para recipes.
 - Acceso: Superadmin [CRD], Seller [CRD] y otros usuarios [R].
 - Rutas: 
   1. Metodo: GET
     <br>URL: http://localhost:PORT/api/recipes
  
   2. Metodo: POST
     <br>URL: http://localhost:PORT/api/recipes
     <br>Ejemplo body: 
      ```
        {
            "ingredientId": 4,
            "productId": 5
        }     
      ```
  
   3. Metodo: DELETE
     <br>URL: http://localhost:PORT/api/recipes/1

</details>

<br>

----