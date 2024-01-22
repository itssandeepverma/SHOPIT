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
This will help avoid  unauthenticated user to hit the api and get the products. 
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
When forgot password, a link is sent to mail valid for 30 minutes handled in cookies.
reset token, reset token expiry time is added in database. 

Now remember hitting that link with http not https as in mail its https so change it.
Also mail is not send when connected using ethernet so change it with mobile network.

Also different error is handled in middlewear/error.js


--------------------------------------------Section 6------------------------------------------

HANDLED USER Routes

const user = await User.findById(req?.user?._id).select("+password");    // password id made false in the user model to show up in json, so 
                                                                                    //doing it by select function

Added endpoints for update User, Get All user by admin, get specific user, delete user, update profile in authControllers.js


---------------------------------Section 7-----------------------------------

ORDER MODEL 

Steps : Create Model -> Create endpoints by routing them from routes which is being called from app.js. 

Endpoints : 

Create newOrder :  Only work with COD now. 

Get Order Details : 

 const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );   // would show only the these entry of the user as they only needed in the frontend. 

  myorders - to show the current user all orders
  When user create a order, it orderStatis is processing, 
  UpdateOrder endpoints pricess the order and make it shipped by reducing the stock from products database.

  Note : to add the same products id of a respective product while creating order int orderItems in order. 

  DeleteOrder - to delete the order using its order id.

  So, basically three tables - Order, User, Products with id given in all. Keep track of the proper referencing. 


  --------------------------------------------------Section- 8-----------------------------------

  USER REVIEW Added

  In prductController, three endpoints are added 
  IN product model, schema have array of review and reviewcount
  
  Add Review : 
  Check if user have already reviews ? if already reviewed then update the table, else create new review and update the reviewcount and average rating

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  Can read about the map, reduce and filter function. 

  Get all Review : to get all review of a prodcut using its product id.

  Delete review : admin only, with deleting using product id and review id. 



----------------------------------------------------------frontend--------------------

All commands : 
-npx create-react-app .
-npm start
-npm install react-router-dom       // for routing file in App.js
-npm install react-helmet           // for MetaData.jsx 


  Frontend : 
  In frontend folder, hit npx create-react-app . to iniitalise the frontend app with . means name same as the folder, we can give any name there.
  Use npm start to start the project.

  In public - index.html  is the html file, we added some bootstraping files and font script link.
  in src - keep only app.css, app.js, index.js 

  index.js main file, call the functions in app.js having html codes. 

  Added - Footer.jsx , header.jsx, Home.jsx which are all imported in app.js and called. 

- npm install react-router-dom       // for routing file in App.js
-npm install react-helmet           // for MetaData.jsx 


-------

Redux Tookit - Powerful tool to manange the state - global place to save our application data and to get data from state from any component.
npm install @reduxjs/toolkit react-redux --save
Install redux devtools extension in chrome which would help for better inspection. 

Read about RTK query. Used for fetching data mostly. 
It handles many things, and no need to write code explicitly for many stuffs.
const { data, isLoading, error, isError } = useGetProductsQuery();


react-hot-toast : toast messages . 

api/productapi.js : have endpoints and logic means the UI/HTML is in  src/components/product,

- Added Product item - to show product at glance.
- Added ProductDetails - to show the details, use link instead of href to not to reload the entire page 
- cache behaviour - stored in the cache for the 0 sec the data fetched for example, the data fetched of all products. 

app.js - /home.js - productitem - productDetails 

------

Section 14 : 

SEARCH, PAGINATION, FILTER 

npm install react-js-pagination 
CustomPagination.jsx - added the logic for pagination.
And add it to Home.jsx
Got the value from the page, set the current page number,and then set the pagination component( set active page, resperpage etc..)

Added filter.jsx  , search.jsx : they all are working with product with params get request ( we did in the backend already api)

Navigate - object in route-dom : used to navigate to other url
Also added component and helper folder in componenet
And made changes to Home.jsx to show the filter page as well. 

-------------------------------Section 15------------------------

AUTHENTICATION FRONTEND 

Login User, Register User added

added in componenets/auth  - login.jsx, register.jsx
Made changes in Store.js (middlewear authentication) and App.js(added routes) Home(login link)

Added redux/api/authApi.js and userApi.js

Added up th logic in header file to change when login and logout the name else login


-----------------------------Section 16--------------------------------

Handle User & Protected Routes


Added layout/UserLayout

Side Bar having the options 

Added in component user folder for the profile related things.
Add also in the App.js the routes

A React component is a JavaScript class or function that returns a piece of UI.
Components define the structure, behavior, and appearance of parts of a user interface.

protectedRoutes in auth help to authenticate just like in backend we do. 
Its also added in the app.js 
means if not login , the profile section routes are navigated to the login page.

Set up cloudinary and fill the details in config file.
Issue in uploading big files - express.use(json{limit : 1 mb}) in app.js in backend. 

In App.js , the routes are there, then in redux/apis/userApi/ the connection to backend is there and in layout the logic is there after 
getting up the data. 

----------------------------Section 17---------------------------------------------------------------

HANDLING USER CART 

- increase, decrease count logic in componenet/product/productDetails
- addtoCart logic also

cart componenet is added for showing up the cart page and summary with add,decrease,delete button.
Meta Data added in every page ofr title.

 

  DONE...........................




