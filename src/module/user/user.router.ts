import { Router } from "express";
import { userController } from "./user.contoller";
import validateRequest from "../../middlewares/validateRequest";
import { changeUserRoleValidationSchema, changeUserStatusValidationSchema } from "./user.validation";

const userRouter = Router();
userRouter.get("/", userController.getUser);
userRouter.get("/:userId", userController.getSingleUser);
userRouter.put("/:userId", userController.updateUser);
userRouter.put(
  "/change-status/:userId",
  validateRequest(changeUserStatusValidationSchema),
  userController.changeUserStatus
);
userRouter.put(
  "/change-role/:userId",
  validateRequest(changeUserRoleValidationSchema),
  userController.changeUserRole
);
userRouter.delete("/:userId", userController.deleteUser);

export default userRouter;
