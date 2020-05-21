import { Router } from 'express';
import { LanguageController } from './../controller/LanguageController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all languages
router.get('/', LanguageController.getAll);

// Get by Id
router.get('/:id', LanguageController.getById);

// Create a new language
router.post('/', [checkJwt], LanguageController.create);

export default router;
