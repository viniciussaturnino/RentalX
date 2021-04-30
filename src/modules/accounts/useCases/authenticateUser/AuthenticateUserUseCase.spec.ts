import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticante an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Vinicius Saturnino',
      email: 'vinicius@email.com',
      password: '123456',
      driver_license: '000123',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not to be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('Should not to be able to authenticate an user with wrong password', async () => {
    const user: ICreateUserDTO = {
      name: 'Vinicius Saturnino',
      email: 'vinicius@email.com',
      password: '123456',
      driver_license: '000123',
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongpassword',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
