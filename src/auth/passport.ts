import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config';
import User from '../models/User';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET,
};

passport.use(
	new Strategy(opts, async (payload, done) => {
		try {
			const user = await User.findById(payload.uid, 'email');
			if (!user) {
				return done(null, false);
			}
			return done(null, user);
		} catch (err) {
			console.log(err);
			return done(err, false);
		}
	})
);

export default passport;
