import * as mongoose from 'mongoose';

export const SparkpostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z\-_ ]+$/i.test(v);
        },
        message: '{VALUE} must not contain invalid characters!',
      },
      minlength: 2,
      maxlength: 32,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
  },
  { versionKey: false },
);
