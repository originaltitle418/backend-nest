import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`환경 변수 ${key}가 설정되지 않았습니다.`);
  }
  return value || '';
}

export const Env = {
  DB_HOST: getEnv('DB_HOST'),
  DB_PORT: parseInt(getEnv('DB_PORT')),
  DB_USERNAME: getEnv('DB_USERNAME'),
  DB_PASSWORD: getEnv('DB_PASSWORD'),
  DB_DATABASE: getEnv('DB_DATABASE'),

  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', false) || '1d',
};