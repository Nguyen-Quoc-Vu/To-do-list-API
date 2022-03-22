# NodeJS x Express x MongoDB Project
Requirements:
• Mandatory npm start script.
• Please check that your app can be launched with 'npm install' and 'npm start'
commands just after git pull;
• Ability to run server on port which is defined as PORT environment variable,
default to 8080;
• Use express to implement web-server;
• Use express Router for scaling your app and MVC pattern to organize project
structure;
• Follow REST API rules described in Swagger file;
• Encode all users password with BCRYPT npm package
• Use config or dotenv npm packages to store configuration for your project;
• Use jsonwebtoken package for jwt authorization;
• Use Mongo Atlas for MongoDB connection;
• Server handles errors for all requests;
• Write every request info to logs;
• Application code should follow eslint rules described in .eslintrc.json file(requires
eslint and eslint-config-google packages install);
Acceptance criteria:
• Ability to register users;
• User is able to login into the system;
• User is able to view his profile info;
• User is able to view only personal notes, provide pagination parameters for notes
list, request note by id;
• User is able to add, delete personal notes;
• User can check/uncheck any note;
• User can manage notes and personal profile only with valid JWT token in
request;
