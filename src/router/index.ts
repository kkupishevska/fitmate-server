import { getUser, getUsersList } from '../controllers/users';
import { signup, signin } from '../controllers/auth';
import express from 'express';
import { isAuthenticated } from '../middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/users', isAuthenticated, getUsersList);
router.get('/users/:id', isAuthenticated, getUser);

export default router;
