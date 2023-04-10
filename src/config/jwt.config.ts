import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: process.env.JWT_EXPIRATION_ACCESS_TOKEN,
  refreshTokenExpiration: process.env.JWT_EXPIRATION_REFRESH_TOKEN,
}));
