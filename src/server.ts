import express, { Request, Response } from 'express';
import passport from 'passport';
import config from './config';
import configPassport from './auth/passport';
import indexRoutes from './routes/index.routes';

const app = express();

configPassport(passport);

// Configuraciones

app.set('PORT', config.PORT);

// Middlewares
app.use(express.json());

app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Hello' });
});

app.use('/api', indexRoutes);

export default app;
