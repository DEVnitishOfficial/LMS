import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLectureByCourseId,
  updateCourse,
  addLectureToCourseById,
  removeLectureFromCourse
} from "../controllers/courseController.js";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleWare.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeLectureFromCourse);

router
  .route("/:id")
  .get(isLoggedIn, authorizedSubscriber, getLectureByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteCourse)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("lecture"),
    addLectureToCourseById
  );

export default router;
