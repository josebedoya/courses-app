import { Router } from 'express';
import { ChapterController } from './../controller/ChapterController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all chapters by courseId
router.get('/:courseId', [checkJwt], ChapterController.getAllByCourseId);

// Get by Id
// router.get('/:id', [checkJwt], ChapterController.getById);

// Create a new chapter
router.post('/', [checkJwt], ChapterController.create);

// Update chapter
// router.put('/:id', [checkJwt], ChapterController.update);

// Delete chapter
router.delete('/', [checkJwt], ChapterController.delete);

export default router;
