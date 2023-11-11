import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLectureByCourseId,
  updateCourse,
} from "../controllers/courseController.js";
import { authorizedRoles, isLoggedIn } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleWare.js";

const router = Router();

router.route("/")
.get(getAllCourses)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
);

router
  .route("/:id")
  .get(isLoggedIn, getLectureByCourseId)
  .put( isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
  .delete( isLoggedIn, authorizedRoles('ADMIN'), deleteCourse);

export default router;
