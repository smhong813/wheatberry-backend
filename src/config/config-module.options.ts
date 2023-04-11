import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';

/**
 * Returns path of the .env file based on the current NODE_ENV.
 * Note: the path starts from the root directory.
 *
 * @returns {string} `./${first three characters of NODE_ENV}.env`
 *
 * @example
 *  ./dev.env
 *  ./sta.env
 *  ./pro.env
 */
const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) {
    throw new Error(
      `NODE_ENV must be provided in the .env file for the current running environment.`,
    );
  }

  return `./${nodeEnv.substring(0, Math.min(3, nodeEnv.length))}.env`;
};

const joiValidationSchema: Joi.PartialSchemaMap<any> = {
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  PORT: Joi.number().default(3081),
  // @todo: add schema for database and jwt
};

/**
 * Note: Please follow the instructions below if you want to add environment
 * variables.
 *
 * 1. Add variables to env files.
 * 2. Create a config file in /src/config folder.
 * 3. Update validationSchema for the new variables.
 * 4. Import and add the config file to the array of the `load` option below.
 */
const configModuleOptions: ConfigModuleOptions = {
  envFilePath: getEnvFilePath(),
  validationSchema: Joi.object(joiValidationSchema),
  load: [databaseConfig, jwtConfig],
  cache: true,
};

export default configModuleOptions;
