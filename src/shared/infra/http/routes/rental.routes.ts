import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
