import { Router } from "express";
import { userController } from "./user.contoller";
import validateRequest from "../../middlewares/validateRequest";
import {
  changeUserRoleValidationSchema,
  changeUserStatusValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const userRouter = Router();
userRouter.get("/users/", auth(USER_ROLE.admin), userController.getUser);
userRouter.get("/user/me", auth(USER_ROLE.admin, USER_ROLE.customer), userController.getMe);
userRouter.get(
  "/users/:userId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  userController.getSingleUser
);
userRouter.put(
  "/users/:userId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(updateUserValidationSchema),
  userController.updateUser
);
userRouter.put(
  "/users/change-status/:userId",
  auth(USER_ROLE.admin),
  validateRequest(changeUserStatusValidationSchema),
  userController.changeUserStatus
);
userRouter.put(
  "/users/change-role/:userId",
  auth(USER_ROLE.admin),
  validateRequest(changeUserRoleValidationSchema),
  userController.changeUserRole
);
userRouter.delete("/users/:userId", auth(USER_ROLE.admin), userController.deleteUser);

export default userRouter;
