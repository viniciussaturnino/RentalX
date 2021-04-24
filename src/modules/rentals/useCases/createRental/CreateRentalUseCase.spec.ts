import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      user_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not to be able to create a new rental when user already have a rental in progress', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '121212',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '123456',
        user_id: '121212',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not to be able to create a new rental when user already have a rental in progress', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '123456',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '654321',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not to be able to create a new rental with invalid expected return date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        user_id: '123456',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
