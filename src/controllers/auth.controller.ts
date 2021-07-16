import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { UserProfile, validateGoogleIdToken } from '../helpers/google-verify';
import { generateToken } from '../helpers/jwt';

export const googleSignin = async (req: Request, res: Response) => {
	const { idToken } = req.body;

	try {
		const userData: UserProfile | null = await validateGoogleIdToken(
			idToken
		);
		if (!userData) {
			return res.status(400).json({
				success: false,
				msg: 'The id_token field is not valid',
			});
		}
		let user = await User.findOne({ email: userData?.email });

		if (!user) {
			// Tengo que crearlo
			user = new User(userData);
			await user.save();
		}

		// Generar el JWT
		const token = await generateToken(user);

		res.json({
			success: true,
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: 'Google Token is not valid',
		});
	}
};

export const renewToken = async (req: Request, res: Response) => {
	try {
		const userToken = req.user as IUser;
		const user = await User.findById(userToken._id);
		const token = await generateToken(user);
		return res.json({
			success: true,
			msg: 'Token renewed',
			user,
			token,
		});
	} catch (err) {
		console.log('Token renewal error:', err);
		res.status(500).json({ success: false, msg: 'Error renewing token' });
	}
};
