import express from "express";
import { contactControllers } from "./contact.controller";
import auth from "../../middlewares/auth";
const router = express.Router();
router.post("/contact", contactControllers.createContactMessage);
router.get("/contacts", auth("admin"), contactControllers.getAllContactMessage);
export const ContactRoutes = router;
