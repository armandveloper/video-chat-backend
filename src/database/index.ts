import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log(
			'Connection has been established with the DB: ',
			conn.connection.host
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
