import { error } from "console";
import Course from "../models/courseModel.js";
import AppErr from "../utils/errorUtils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {
  const courses = await Course.find({}).select("-lectures");

  if (!courses) {
    return next(new AppErr("Failed to get courser from db", 400));
  }

  res.status(200).json({
    success: true,
    message: "successfully get the course details",
    courses,
  });
};

const getLectureByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppErr("Invalid course id", 400));
    }
    res.status(200).json({
      success: true,
      message: "course lecture fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppErr("error.message", 500));
  }
};
const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppErr("All fields are mandatory to create a course", 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "dummy",
      secure_url: "dummy",
    },
  });

  if (!course) {
    return next(new AppErr("Course not created,please try again", 500));
  }

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms",
    });

    if (result) {
      course.thumbnail.public_id = result.public_id;
      course.thumbnail.secure_url = result.secure_url;
    } else {
      return next(new AppErr(error.message, 400));
    }

    fs.rm(`uploads/${req.file.filename}`);
  }
  await course.save();
  res.status(200).json({
    success: true,
    message: "course created successfully",
    course,
  });
};

const addLectureToCourseById = async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!title || !description) {
      return next(new AppErr("please provide title and descriptioon", 400));
    }

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppErr("course not found with the given id", 500));
    }

    const lectureData = {
      title,
      description,
      lecture: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          chunk_size: 50000000, // 50 mb size
          resource_type: 'video',
        });
  
        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        } else {
          return next(new AppErr(error.message, 400));
        }
  
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppErr(error.message,400))
      }
    }
    course.lectures.push(lectureData);
    course.numbersOfLecture = course.lectures.length;
    await course.save();
    res.status(200).json({
      success: true,
      message: "lectures added successfully to the course",
      course,
    })
  }

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!course) {
      return next(new AppErr("course with given id does not exist", 500));
    }
    res.status(200).json({
      success: true,
      message: "course updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppErr(error.message, 400));
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppErr("Course not found with the given id", 500));
    }
    await course.deleteOne();
    // you can also use findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 400));
  }
};

export {
  getAllCourses,
  getLectureByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourseById,
};
