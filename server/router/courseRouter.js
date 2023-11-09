
import {Router} from 'express'
import { getAllCourses, getLectureByCourseId } from '../controllers/courseController.js';
import { isLoggedIn } from '../middleware/authMiddleWare.js';

const router =  Router();

router.route('/').get(getAllCourses)
router.route('/:id').get(isLoggedIn , getLectureByCourseId)

export default router;
