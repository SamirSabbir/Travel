import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  console.log(config.databaseUri);
  await mongoose.connect(config.databaseUri as string);

  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

main();
