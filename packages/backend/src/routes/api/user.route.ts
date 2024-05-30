import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import findUserByEmail from '../../middleware/user.middleware';
import { authMiddleware } from '../../middleware/auth.middleware';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	'/register',
	authController.userRegister.bind(authController),

	router.post(
		'/login',
		findUserByEmail,
		authController.userLogin.bind(authController),
	),

	router.post(
		'/refresh',
		authMiddleware.checkRefrehToken.bind(authMiddleware),
		authController.userRefresh.bind(authController),
	),

	router.post(
		'/change-password',
		authMiddleware.checkAccessToken.bind(authMiddleware),
		authController.userChangePassword.bind(authController),
	),

	router.post(
		'/forgot-password',
		findUserByEmail,
		authController.forgotPassword.bind(authController),
	),

	router.put(
		'/forgot-password/:token',
		authController.setForgotPassword.bind(authController),
	),

	router.put(
		'/verify/:token',
		authController.verifyUser.bind(authController),
	),
);

export default router;
