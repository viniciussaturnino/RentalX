import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_ignite'): Promise<Connection> => {
  const deafultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(deafultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : deafultOptions.database,
    })
  );
};
