import dotenv from 'dotenv';
dotenv.config();
import app from './server';

app.listen(app.get('PORT'), () =>
	console.log('Server started on PORT:', app.get('PORT'))
);
