### Documentation

Node version please use 10.24.1

## Start Project

Simply install dependencies and start project

```
npm install
npm run start:live

```
## Project Structure

```
├── src
│   ├── config        // config for port, db and jwt
│   ├── connection    // config for db connection
│   ├── controllers   // control server side apiResponse for services
│   ├── services      // handle all the logic for custom functions
│   ├── entities      // entity for adminUser and userPost 
│   ├── middleware    // for jwt token 
│   ├── utils         // global config for utils
├── app.ts            // RESTful api & port set up
```

## Something you should know
- You must clone img-sharing-mini-project-web for fully ui connection
- You can use DBeaver to set up database connection 
- Please visit dot env example to set up your DB config

## Port
- You can set up your own default port - e.g. localhost:4001 

## Others
- Backend tech-stack: Node JS & TypeScript & PostgreSql & bcrypt & typeorm
- Without the frontend repo, you can also run "npm run start:live" to test the Apis with Postman 