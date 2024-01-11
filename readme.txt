First npm init - to initliase the project // add up the basic details like author and all.

- npm i express dotenv mongoose --save
- npm i nodemon --save-dev 
- npm i jsonwebtoken --save
- npm i cookie-parser --save
- npm install nodemailer

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
Also added the script in the package.json and can run now using the command npm run seeder.

----------------------------Section 3 ------------------------------------------------

ERROR handling

Middlewear - it is a function that runs before ech requests to make sure that there is no error in our code. 
next is Middlewear provided by the express that will basically executes the next middlewear in the middlewear stack.




---------------------------------Section 4------------------------
ADDING FILTER, SEARCH, PAGINATION
Written up the api in Controllers
and search, pagination , fiter working in apiFilter.js

Called the object defined in apiFilters from controllers by importin git with passing constructors.

search keyword = apple
price[gte] = 100


--------------------------Section -5 -------------------------

User Model

Till now we workedon product model, now we will focus on user model, things related to the users.

model/users.js - to add the schema for the users.

Note : Controllers import the models

Json Web Token - Used for authentication of the user, when user login- a token (id) is given with expiry data and
once that expires, user need to login again.

npm i jsonwebtoken --save

We can check the register, login api into the postman
On successful register/login, we get the token in json that would be used to store in the cokkie.( Cookie Based Authentication)

JWT.io - to check the validity of the token


cookie-parser need to import for authentication through middlewear.

// console.log(process.env.NODE_ENV.trim()==='DEVELOPMENT'); 
// console.log(process.env.NODE_ENV); 
//trim was missiing so not able to enter into the if condition. 

HTTP only cookie, it can be placed only on the server side not on the client side. ( in options, it is set to true) 
register/login - cookie is added in sendToken.js as token,option(expiry date)

in app.js - add cookie parser t
o use 
in routes/product.js -
in routes of products, before calling getproducts, call the middlewear function, for authentication that will check cookie is there or not.
This will help unauthenticated user to hit the api and get the products. 
Also read about the middlewear stack. 

Role added, so that admin things are only accessible through admin roles. 



const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // This specifies that the 'user' field should be of type ObjectId
    ref: "User", // This is the model to which the ObjectId refers, in this case, the 'User' model
    required: true, // This indicates that the 'user' field is required and must have a value
  },
  // Other fields in your schema
});

const YourModel = mongoose.model('YourModel', yourSchema);
In this example:

mongoose.Schema.Types.ObjectId is used to define a field as an ObjectId, which is commonly used as the unique identifier for documents in MongoDB.
ref: "User" specifies that the user field is referencing the User model. This establishes a relationship between the current model and the User model.
required: true ensures that the user field must be present in any document created using this schema.
This schema is likely part of a larger Mongoose model that includes other fields as well. The user field is referencing a user document from the User model, creating an association between the two models.

RESET PASSWORD - written function models/auth.js to regenerate the token wiht hash key
Use nodemailer npm install nodemailer 
mailtrap.io - site to send the email - register on it , go to inboxes, change the integration to the node.js
Added sendEmail.js file to handle the sending mail by importing the nodemailer.
Added the html,css template in the emailTemplates to show the respective files.  


Now added forget password, reset password logic in controllers/authControllers.