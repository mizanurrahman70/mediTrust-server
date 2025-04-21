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
userRouter.get("/", auth(USER_ROLE.admin), userController.getUser);
userRouter.get("/:userId", auth(USER_ROLE.admin, USER_ROLE.customer), userController.getSingleUser);
userRouter.put(
  "/:userId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(updateUserValidationSchema),
  userController.updateUser
);
userRouter.put(
  "/change-status/:userId",
  auth(USER_ROLE.admin),
  validateRequest(changeUserStatusValidationSchema),
  userController.changeUserStatus
);
userRouter.put(
  "/change-role/:userId",
  auth(USER_ROLE.admin),
  validateRequest(changeUserRoleValidationSchema),
  userController.changeUserRole
);
userRouter.delete("/:userId", auth(USER_ROLE.admin), userController.deleteUser);

export default userRouter;
