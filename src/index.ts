import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database';
import app from './server';

connectDB();

app.listen(app.get('PORT'), () =>
	console.log('Server started on PORT:', app.get('PORT'))
);
