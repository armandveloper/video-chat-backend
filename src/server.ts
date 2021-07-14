import express, { Request, Response } from 'express';
import config from './config';

const app = express();

// Configuraciones

app.set('PORT', config.PORT);

// Middlewares
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Hello' });
});

export default app;
