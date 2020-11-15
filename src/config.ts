import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    ALLOW_CORS: process.env.ALLOW_CORS || 'false',
    CORS_HOST: process.env.CORS_HOST || 'https://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: +process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
