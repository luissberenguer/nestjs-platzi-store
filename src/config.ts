import { registerAs } from '@nestjs/config';

export default registerAs('consfig', () => {
  return {
    database: {
      host: process.env.DATABSE_HOST,
      name: process.env.DATABASE_NAME,
    },
    postgres: {
      host: process.env.POSTGRES_HOST,
      dbName: process.env.POSTGRES_NAME,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT),
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      dbName: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
    },
    typeorm: {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      dbName: process.env.TYPEORM_DATABASE,
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT),
      isSync: process.env.TYPEORM_SYNCHRONIZE,
      isLoging: process.env.TYPEORM_LOGGING,
      entities: process.env.TYPEORM_ENTITIES,
    },
    apiKey: process.env.API_KEY,
  };
});
