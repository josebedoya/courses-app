import { Router } from 'express';
import { CourseController } from './../controller/CourseController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all courses
router.get('/', [checkJwt], CourseController.getAll);

// Get by Id
router.get('/:id', [checkJwt], CourseController.getById);

// Create a new course
router.post('/', [checkJwt], CourseController.create);

// Update course
router.put('/:id', [checkJwt], CourseController.update);

// Delete course
router.delete('/', [checkJwt], CourseController.delete);

export default router;
