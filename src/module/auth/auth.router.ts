import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const authRouter = Router();

authRouter.post('/register',validateRequest(authValidation.registerUserValidationSchema),AuthControllers.registerUser);

authRouter.post('/login',validateRequest(authValidation.loginUserValidationSchema),  AuthControllers.loginUser);

authRouter.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(authValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export default authRouter;