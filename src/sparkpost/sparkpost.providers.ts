import { Connection } from 'mongoose';
import { SparkpostSchema } from './repository/schemas/sparkpost.schema';

export const SparkpostProviders = [
  {
    provide: 'SPARKPOST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Sparkpost', SparkpostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
