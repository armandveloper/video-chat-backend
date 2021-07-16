import path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import passport from './auth/passport';
import isAuthenticated from './middlewares/isAuthenticated';
import indexRoutes from './routes/index.routes';

const app = express();

// Configuraciones

app.set('PORT', config.PORT);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
	cors({
		origin: config.CLIENT_URL,
	})
);

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRoutes);

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Hello' });
});

app.get('/dashboard', isAuthenticated, (req: Request, res: Response) => {
	console.log(req.user);
	res.redirect('http://localhost:3000');
	// res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

export default app;
