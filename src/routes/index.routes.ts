import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth/google', authRoutes);

export default router;
