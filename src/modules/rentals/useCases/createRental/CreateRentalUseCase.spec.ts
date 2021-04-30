import dayjs from 'dayjs';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 133,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not to be able to create a new rental when user already have a rental in progress for the same user', async () => {
    const user: ICreateUserDTO = {
      name: 'Vinicius Saturnino',
      email: 'vinicius@email.com',
      password: '123456',
      driver_license: '000123',
    };
    await createUserUseCase.execute(user);

    const car: ICreateCarDTO = {
      name: 'Car',
      description: 'Car test',
      category_id: '1234',
      brand: '111000',
      daily_rate: 40,
      fine_amount: 150,
      license_plate: 'BWESSS',
    };
    await createCarUseCase.execute(car);

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '123456',
        user_id: user.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError(`There's a rental in progress for this user`)
    );
  });

  it('Should not to be able to create a new rental when user already have a rental in progress for the same car', async () => {
    const user1: ICreateUserDTO = {
      name: 'Vinicius Saturnino',
      email: 'vinicius@email.com',
      password: '123456',
      driver_license: '000123',
    };
    await createUserUseCase.execute(user1);

    const user2: ICreateUserDTO = {
      name: 'Julio Silva',
      email: 'julio@email.com',
      password: '123456',
      driver_license: '000111',
    };
    await createUserUseCase.execute(user2);

    const car: ICreateCarDTO = {
      name: 'Car',
      description: 'Car test',
      category_id: '1234',
      brand: '111000',
      daily_rate: 40,
      fine_amount: 150,
      license_plate: 'BWESSS',
    };
    await createCarUseCase.execute(car);

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user1.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: user2.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError(`Car isn't available`));
  });

  it('Should not to be able to create a new rental with invalid expected return date', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: '123456',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError('The Rental must have minimal of 24h hours of duration')
    );
  });
});
