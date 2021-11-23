import 'reflect-metadata';
import createServer from './create-server';
import mongoose from 'mongoose';

async function bootstrap() {
  const server = await createServer();
  
  // Connect to Mongo
  await mongoose.connect('mongodb://localhost:27017/books', { autoIndex: false })

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap();
