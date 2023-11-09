import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required : [true, 'Title is required'],
      minLength : [5, 'Title must be at least 5 character'],
      maxLength : [100, 'Title must not exceede over 100 characters'],
      trim : true
    },
    description: {
      type: String,
      required : [true, 'Description is required'],
      minLength : [8, 'Description must be at least 10 character'],
      maxLength : [500, 'Description must not exceede over 500 characters'],
      trim : true
    },
    category: {
      type: String,
      required : [true, 'Category is required'],
    },
    thumbnail: {
      public_id: {
        type: String,
        required : true,
      },
      secure_url: {
        type: String,
        required : true,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required : true,

          },
          secure_url: {
            type: String,
            required : true,

          },
        },
      },
    ],
    numbersOfLecture: {
      type: Number,
      default : 0
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model('lms-course',courseSchema)

export default Course;
