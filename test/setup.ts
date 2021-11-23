import 'reflect-metadata';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod;
let conn;

beforeAll(async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  conn = await mongoose.connect(uri, { autoIndex: false })
});

afterAll(async () => {
  await conn.disconnect();
  await mongod.stop();
});