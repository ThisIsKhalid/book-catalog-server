import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/get-user', auth(), UserController.getUser);

export const UserRoutes = router;
