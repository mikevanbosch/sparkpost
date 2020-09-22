import * as mongoose from 'mongoose';

const DB_URL = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://localhost:27017/sparkpost';
export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
  },
];
