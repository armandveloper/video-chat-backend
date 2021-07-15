import path from 'path';
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import config from './config';
import configPassport from './auth/passport';
import indexRoutes from './routes/index.routes';
import { isAuthenticated } from './middlewares/auth';

const app = express();

configPassport(passport);

// Configuraciones

app.set('PORT', config.PORT);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRoutes);

app.get('/', (req: Request, res: Response) => {
	res.json({ msg: 'Hello' });
});

app.get('/dashboard', isAuthenticated, (req: Request, res: Response) => {
	console.log(req.user);
	res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

export default app;
