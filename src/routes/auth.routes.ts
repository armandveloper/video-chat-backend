import { Router } from 'express';
import { body } from 'express-validator';
import checkErrors from '../validations/check-errors';
import { googleSignin } from '../controllers/auth.controller';

const router = Router();

router.post(
	'/',
	[
		body('idToken', 'the idToken field is required').not().isEmpty(),
		checkErrors,
	],
	googleSignin
);

export default router;
