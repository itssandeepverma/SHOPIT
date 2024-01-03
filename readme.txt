First npm init - to initliase the project // add up the basic details like author and all.

- npm i express dotenv mongoose --save
- npm i nodemon --save-dev 

app.js - entry file just like the index.html // initally write up the basic code for connections of the port (listen)

Instead of running node app.js everytime we can set the path in package.json 
  "scripts": {
    "start": "node backend/app.js",
    "dev": "set NODE_ENV=DEVELOPMENT && nodemon backend/app.js",
    "prod": "set NODE_ENV=PRODUCTION && nodemon backend/app.js"
  },

and can run using node run dev for development
and node run prod for production.

write "type"  : "model" if getting errors with import.
Node js gives facility to export all certain things which can be manually told. 


Conifg file contains the basic configurations file
Like - port no. (global varible)
dbconnect code - ( so to structure well the things.)

Routes:  (for handling different urls)

Definition: Routes define the paths (URLs) in your application and how they respond to client requests.
Purpose: Routes determine what should happen when a user visits a specific URL. They help in mapping URLs to specific functionalities or actions in your application.
Implementation: In Express, you define routes using the express.Router class. A route can be associated with an HTTP method (GET, POST, PUT, DELETE, etc.) and a specific URL path. 


Controllers:  ( for writing up the logic)

Definition: Controllers are responsible for handling the logic of your application. They contain the functions that are called when a route is matched.
Purpose: Controllers help keep your code organized by separating the logic from the route definitions. They handle data processing, interact with the database, and decide what response to send back.
Implementation: Each route can be associated with a specific controller function.


------------------------------Section - 2--------------------------------

Models created to write the schema
Write different url 
and get/post/delete/update methods in logics
1.) add products. add the products into the database
2.) Get products. simply return all products.
Check with postman with dummy file.

Seeder File -
seeder.js - script written to connect to database then delelte all data and then add all data. 
data.js - all data.  