Instructions on building a full-stack tracker application (MERN).

The MERN Stack is comprised of the following technologies:

MongoDB: A document-based open source database.
Express: A web application framework for Node.js that allows you to create routes to send information to the database.
React: A JavaScript front-end library for building user interfaces using components.
Node.js: A JavaScript run-time environment that executes JavaScript code outside of a browser (such as a server).

Dependencies needed: 
Mongoose: A schema-based solution to model application data. It makes MongoDB easier to manage essentially. 
Dotenv: Allows you implement environment variables such as the mongoDB string that we'll need in order to access the database. 
Nodemon: This will automatically refresh the application (restart the server) anytime we make changes to our files and it will also provide us information about our code. 
CORS: Stands for "Cross Origin Resource Sharing. This allows AJAX requests to skip the same origin policy and access resources from remote hosts. 

What is AJAX you might ask? AJAX stands for Asynchronistic JavaScript and XML. It's super useful to developers because it allows us to read data from a web server after a web page has loaded, update a web page without reloading the page and send data to a web server - in the background. This is how it works in a step by step process: 

1. An event occurs in a web page (the page is loaded, a button is clicked)
2. An XMLHttpRequest object is created by JavaScript
3. The XMLHttpRequest object sends a request to a web server
4. The server processes the request
5. The server sends a response back to the web page
6. The response is read by JavaScript
7. Proper action (like page update) is performed by JavaScript

Got it? Okay, lets begin!

Sign in to MongoDB Atlas and create a new project to store information in your database. Create a cluster. 

In your IDE, verify that node.js is installed by running "node -v". Then go ahead and create react app by running "npx create-react-app sample-app".

CD into "sample-app" (in this case, we named our file "mern-ticket-tracker", so you will cd into "mern-ticket-tracker"). We'll build out the backend first. Create a folder called "backend" by running "mkdir backend". 

CD into "backend" and run "npm init -y" to create the package.json file. 

Install dependencies into the backend folder. Run "npm install express cors mongoose dotenv". Then globally install nodemon by running "npm install -g nodemon". If you recieve an error, run "sudo install -g nodemon". 

Now it's time to create our server and connect to our mongoDB database!

Create a new file in the "backend" folder called "server.js". Refer to "server.js" for code. 

In order for the connection to be successfully established to MongoDB, we need to create a ".env' file in our "backend" folder and pass in the uri from our MongoDB Atlas. 

Restart the server. Your server should be running and you should now be connected to the MongoDB database!

Now it's time to create the schema for your document-based models that will be stored into the MongoDB database. 

Create a folder called "models" inside of the "backend" folder. Then create 2 files called "userModel.js" and "ticketModel.js" in the "models" folder. Refer to those files to see the code and how the schema is set up for each one. 

Now that we have our models set up with their schemas. We now have to set up our API endpoint routes so that the server can be used to perform the CRUD operations. 

Inside of the "backend" folder, create a folder called "routes". Inside of "routes", create 2 files called "users.js" and "tickets.js". We have to now tell the server to use these files that we've just created. Refer to server.js where we require and use the "users.js" and "tickets.js" files. 

Along with setting up the routes, create User Authentication (using bcrypt and jwt) in the "users.js" file. Refer to the routes in "users.js" to see the code behind it. You'll also need to set up a "middleware" folder in the backend and add "auth.js" so you can set up user verification (as if it's not enough to just log in a user, huh? We need to verify our logged in users to protect them from hackers..those sneaky bastards). After that, set up the routes in "tickets.js".

Test out your routes in Postman. If all routes work properly, we can now go ahead and start working on the front end!