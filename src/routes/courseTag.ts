import { Router } from 'express';
import { CourseTagController } from './../controller/CourseTagController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all tags
router.get('/', CourseTagController.getAll);

// Get by Id
router.get('/:id', CourseTagController.getById);

// Create a new tag
router.post('/', [checkJwt], CourseTagController.create);

export default router;
