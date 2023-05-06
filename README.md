Prerequisites:

    Make sure you have the following installed on your system:
        Node.js
        MongoDB

Create a new Node.js project

Install dependencies:

    npm install express mongoose bcrypt jsonwebtoken dotenv cors

    express: A web framework for Node.js.

    mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.

    bcrypt: A library to help you hash passwords.

    jsonwebtoken: A library to help you generate and verify JSON Web Tokens (JWTs).

    dotenv: A zero-dependency module that loads environment variables from a .env file.

    cors: A library to help you 'ALLOW-CROSS-ORGIN-CORS'

Set up the environment variables:

    Create a .env file in the root directory of your project and add the following variables:
    
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/inventory
        JWT_SECRET=<secret-key>

    PORT: The port on which your API will listen.
    MONGODB_URI: The URI of your MongoDB database.
    JWT_SECRET: The secret key used to sign your JWTs.