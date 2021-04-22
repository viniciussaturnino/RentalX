import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '121212',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not to be able to create a new rental when user already have a rental in progress', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '121212',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: '123456',
        user_id: '121212',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not to be able to create a new rental when user already have a rental in progress', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '123456',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '654321',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
