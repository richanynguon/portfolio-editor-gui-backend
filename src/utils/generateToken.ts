import * as jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/index'


export const generateJWT = user => {
	const payload = {
		subject: user.user_name,
	};
	const options = {
		expiresIn: "8h"
	};
	return jwt.sign(payload, jwtSecret, options);
};