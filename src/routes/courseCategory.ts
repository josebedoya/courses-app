import { Router } from 'express';
import { CourseCategoryController } from './../controller/CourseCategoryController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all categories
router.get('/', [checkJwt], CourseCategoryController.getAll);

// Get by Id
router.get('/:id', [checkJwt], CourseCategoryController.getById);

// Create a new category
router.post('/', [checkJwt], CourseCategoryController.create);

// Update category
router.put('/:id', [checkJwt], CourseCategoryController.update);

// Delete category
router.delete('/', [checkJwt], CourseCategoryController.delete);

export default router;
