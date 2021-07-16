import { OAuth2Client } from 'google-auth-library';
import config from '../config';

export interface UserProfile {
	email: string;
	displayName: string;
	firstName: string;
	lastName: string;
	picture: string;
}

const client = new OAuth2Client(
	config.GOOGLE.clientID,
	config.GOOGLE.clientSecret
);

export const validateGoogleIdToken = async (
	token: string
): Promise<UserProfile | null> => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: config.GOOGLE.clientID,
		});
		const payload = ticket.getPayload();

		if (!payload) return null;

		return {
			email: payload.email || '',
			displayName: payload.name || '',
			firstName: payload.given_name || '',
			lastName: payload.family_name || '',
			picture: payload.picture || '',
		};
	} catch (error) {
		return null;
	}
};
