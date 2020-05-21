import { Router } from 'express';
import { UserController } from './../controller/UserController';
import { checkJwt } from './../middleware/jwt';

const router = Router();

// Get all users
router.get('/', [checkJwt], UserController.getAll);

// Get by Id
router.get('/:id', [checkJwt], UserController.getById);

// Create a new user
router.post('/', [checkJwt], UserController.create);

export default router;
