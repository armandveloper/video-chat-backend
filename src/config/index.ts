export default {
	PORT: process.env.PORT || 5000,
	DB_URI: process.env.DB_URI || '',
	SESSION_SECRET: process.env.SESSION_SECRET || '',
	GOOGLE: {
		clientID: process.env.GOOGLE_CLIENT_ID || '',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
	},
};
