import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with duplicate license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name Car1',
      description: 'Description Car1',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Name Car2',
        description: 'Description Car2',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      })
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('Should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car Available',
      description: 'Description Car Available',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });
});
