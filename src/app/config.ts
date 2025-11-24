import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  databaseUri: process.env.DATABASE_URI,
  secret: process.env.JWT_SECRET,
  prodURL: process.env.CLIENT_URL,
};
