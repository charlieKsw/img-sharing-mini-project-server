import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as Controllers from './controllers';
import * as Configs from './config';
import * as Middleware from './middleware';

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use('/assets', express.static('assets'));
const port = Configs.generalConfig.port;

// API Routes
app.get('/', (_, res) => {
	res.send('Hello World! Server is up.');
});

// Sample API
app.post('/create-sample', Controllers.createSample);

// User APIs for Login & Sign up
app.post('/login', Controllers.login);
app.post('/sign-up', Controllers.createUser); // Middleware.jwtVerify,

// Update Password
app.post('/reset-password', Middleware.jwtVerify, Controllers.updateResetPassword);

// Get all users
app.get('/users', Middleware.jwtVerify, Controllers.getAdminUserInfo);

// Create Media posts
app.post('/create-post', Middleware.jwtVerify, Controllers.createPost);

// Get all Media posts
app.get('/get-post', Middleware.jwtVerify, Controllers.getUserPost);

// Delete Media Post
app.delete('/user-post/:id', Middleware.jwtVerify, Controllers.deleteUserPost);

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
	return;
});

export default app;
