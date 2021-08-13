import jwt from 'jsonwebtoken';
import { securityConfig } from '../config/index';
import * as Utils from '../utils';
import * as Configs from '../config';

const jwtTime = securityConfig.jwtTime;
const jwtKey = securityConfig.jwtKey;

const jwtEncryption = (loginDetails) => {
	const token = jwt.sign(
		{
			username: loginDetails.email
		},
		jwtKey,
		{
			algorithm: 'HS256',
			expiresIn: jwtTime
		}
	);
	return token;
};

const jwtRefresh = (user, token) => {
	// a new token will only be issued if the old token is within 30 mins of expiry
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
	if (user.exp - nowUnixSeconds > jwtTime) {
		return token;
	}

	// Now, create a new token for the current user, with a renewed expiration time
	// Assign roleLevel in jwtFresh && allows frontend to identify user role level
	const newToken = jwt.sign(
		{
			username: user.username
		},
		jwtKey,
		{
			algorithm: 'HS256',
			expiresIn: jwtTime
		}
	);

	return newToken;
};

// Verify JWT token && Roles Level
const jwtVerify = async (req, res, then) => {
	try {
		let bearerHeader = req['headers']['authorization'];
		if (!bearerHeader) {
			return Utils.returnApiResponse(res, { error: `403 Forbidden` }, 403);
		}
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		let token = bearerToken;
		let user = jwt.verify(token, jwtKey);
		// if (Configs.generalConfig.mode === 'DEV') {
		req.user = {
			token,
			email: user['username']
		};
		// return then();
		// }

		// a new token will only be issued if the old token is within 30 mins of expiry
		let newToken = jwtRefresh(user, token);
		req.user = {
			token: newToken,
			email: user['username']
		};
		then();
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return Utils.returnApiResponse(
				res,
				{ error: `401 Unauthorized - ${e}` }, // otherwise, return a bad request error
				401
			);
		}
		return Utils.returnApiResponse(res, { error: `500 Bad request- ${e}` }, 500);
	}
};

export { jwtEncryption, jwtRefresh, jwtVerify };
