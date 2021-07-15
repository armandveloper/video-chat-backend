import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated()) {
		return res.status(501).json({
			success: false,
			msg: 'You must be authenticated to access this resource',
		});
	}
	next();
};
