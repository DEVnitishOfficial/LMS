import Course from "../models/courseModel.js";
import AppErr from "../utils/errorUtils.js";

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

    if(!course){
      return next (new AppErr('Invalid course id',400))
    }
    res.status(200).json({
        success : true,
        message : "course lecture fetched successfully",
        lectures : course.lectures
    })
  } catch (error) {
    return next(new AppErr("error.message", 500));
  }
};

export { getAllCourses, getLectureByCourseId };
