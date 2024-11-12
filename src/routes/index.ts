import { Router } from 'express';
import { mutantRoutes } from './mutant.routes';
import { statsRoutes } from './stats.routes';

const router: Router = Router();
router.use('/mutant', mutantRoutes);
router.use('/stats', statsRoutes);

export default router;
