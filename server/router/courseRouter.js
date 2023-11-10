import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLectureByCourseId,
  updateCourse,
} from "../controllers/courseController.js";
import { isLoggedIn } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleWare.js";

const router = Router();

router.route("/")
.get(getAllCourses)
.post(
    upload.single('thumbnail'),
    createCourse
);

router
  .route("/:id")
  .get(isLoggedIn, getLectureByCourseId)
  .put(updateCourse)
  .delete(deleteCourse);

export default router;
