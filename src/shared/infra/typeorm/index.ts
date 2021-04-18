import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_ignite'): Promise<Connection> => {
  const deafultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(deafultOptions, {
      host,
    })
  );
};
