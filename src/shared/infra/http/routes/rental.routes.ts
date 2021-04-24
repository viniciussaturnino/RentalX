import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
