# Chatcord
A Realtime chat app using socket.io, express.js, mongoDB and react

### Steps to start the app:

- Install npm
- Install dependencies of api, socket, & client with command `npm i`
- Create .env file in api folder with following lines:

  DOMAIN=127.0.0.1
  
  PORT=8000
  
  MONGODB= your mongodb url
  
- Create .env file in client folder with following lines:
 
  REACT_APP_PUBLIC_FOLDER = http://localhost:8000/images/
  
  GENERATE_SOURCEMAP=false
  
- Use `npm start` on seperate terminals for api, socket, & client to start the app
