import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use(authenticateRoutes);

export { router };
