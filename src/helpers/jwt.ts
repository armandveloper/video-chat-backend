import jwt from 'jsonwebtoken';
import config from '../config/';
import { IUser } from '../models/User';

export const generateToken = (user: IUser) => {
	return jwt.sign({ uid: user._id, email: user.email }, config.JWT_SECRET, {
		expiresIn: '8h',
	});
};
