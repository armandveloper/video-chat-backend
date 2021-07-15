import { CallbackError } from 'mongoose';
import { PassportStatic } from 'passport';
import {
	Profile,
	Strategy as GoogleStrategy,
	VerifyCallback,
} from 'passport-google-oauth20';
import User, { IUser } from '../models/User';
import config from '../config';

const configPassport = (passport: PassportStatic) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: config.GOOGLE.clientID,
				clientSecret: config.GOOGLE.clientSecret,
				callbackURL: '/auth/google/callback',
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: Profile,
				cb: VerifyCallback
			) => {
				const { id, displayName, name, photos } = profile;
				let userData = {
					googleID: id,
					displayName,
					firstName: name?.familyName,
					lastName: name?.givenName,
					image: photos !== undefined ? photos[0].value : '',
				};
				try {
					let user = await User.findOne({ googleID: id });
					if (user) {
						return cb(null, user);
					}
					user = new User(userData);
					user = await user.save();
					return cb(null, user);
				} catch (err) {
					console.error(err);
					return cb(err);
				}
			}
		)
	);
	passport.serializeUser((user, done) => {
		const { _id } = user as IUser;
		done(null, _id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err: CallbackError, user: any) => done(err, user));
	});
};

export default configPassport;
