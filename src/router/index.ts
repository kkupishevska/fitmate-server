import {
  getUser,
  getMyInfo,
  updateMyInfo,
  getUsersList,
} from '../controllers/users.controller';
import { signup, signin, sendResetToken, resetPassword, logout } from '../controllers/auth.controller';
import express from 'express';
import { isAuthenticated } from '../middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/send-reset', sendResetToken);
router.post('/reset-password', resetPassword);
router.post('/logout', isAuthenticated, logout);

router.get('/users', isAuthenticated, getUsersList);
router.get('/users/:id', isAuthenticated, getUser);

router.get('/me', isAuthenticated, getMyInfo);
router.put('/me', isAuthenticated, updateMyInfo);


export default router;
