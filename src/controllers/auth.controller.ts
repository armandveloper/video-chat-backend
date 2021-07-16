import { Request, Response } from 'express';
import User from '../models/User';
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
		const token = await generateToken(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: 'Google Token de Google is not valid',
		});
	}
};
