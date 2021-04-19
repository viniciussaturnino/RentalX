import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all availables cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'BMW 325i',
      description: 'Carro esportivo',
      daily_rate: 120.0,
      license_plate: 'FKK-4729',
      fine_amount: 100,
      brand: 'BMW',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Sould be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Carro potente',
      daily_rate: 180.0,
      license_plate: 'ABC-1234',
      fine_amount: 150,
      brand: 'Audi',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });

  it('Sould be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Carro potente',
      daily_rate: 180.0,
      license_plate: 'ABC-1234',
      fine_amount: 150,
      brand: 'Audi',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Audi A3',
    });

    expect(cars).toEqual([car]);
  });

  it('Sould be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Carro potente',
      daily_rate: 180.0,
      license_plate: 'ABC-1234',
      fine_amount: 150,
      brand: 'Audi',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
