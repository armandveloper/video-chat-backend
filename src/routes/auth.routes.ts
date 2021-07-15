import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('google', { scope: ['profile'] }));

router.get(
	'/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
		successRedirect: '/dashboard',
	})
);

router.get('/logout', (req: Request, res: Response) => {
	req.logout();
	res.redirect('/');
});

export default router;
