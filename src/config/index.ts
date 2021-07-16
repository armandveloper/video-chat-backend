export default {
	PORT: process.env.PORT || 5000,
	DB_URI: process.env.DB_URI || '',
	CLIENT_URL: process.env.CLIENT_URL || '',
	JWT_SECRET: process.env.JWT_SECRET || '',
	SESSION_SECRET: process.env.SESSION_SECRET || '',
	GOOGLE: {
		clientID: process.env.GOOGLE_CLIENT_ID || '',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
	},
};
