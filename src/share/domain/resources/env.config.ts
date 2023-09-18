import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  PORT: process.env.PORT,
  TIMEOUT: parseInt(process.env.TIMEOUT),
  APM: {
    HOST: process.env.ELASTIC_APM_SERVER_URL,
    ENVIRONMENT: process.env.ELASTIC_APM_ENVIRONMENT,
    ISACTIVE: process.env.ELASTIC_APM_ACTIVE,
  },
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
}));
