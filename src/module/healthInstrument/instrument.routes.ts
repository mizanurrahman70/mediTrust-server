import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { addInstrument, getAllInstrument } from "./instrument.controller";
import { createHealthInstrumentValidationSchema } from "./instrument.validation";

const router = express.Router();
router.post(
  "/instrument",
  auth(USER_ROLE.admin),
  validateRequest(createHealthInstrumentValidationSchema),
  addInstrument
);
router.get("/instruments", getAllInstrument);

export const instrumentRoutes = router;
