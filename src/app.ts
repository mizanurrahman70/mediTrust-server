import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "./module/user/user.router";
import authRouter from "./module/auth/auth.router";
import { medicineRoutes } from "./module/products/products.route";
import { OrderRoutes } from "./module/order/order.route";
import { globalErrorHandler } from "./errors/GlobalErrorHandler";
import { instrumentRoutes } from "./module/healthInstrument/instrument.routes";
import { reviewRoutes } from "./module/reviews/review.route";
import { ContactRoutes } from "./module/contactUs/contact.route";
const app: Application = express();
app.use(
  cors({
    origin: ["https://medimart-sh-v4.vercel.app", "http://localhost:5000/api"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", medicineRoutes);
app.use("/api", OrderRoutes);
app.use("/api", reviewRoutes);
app.use("/api", instrumentRoutes);
app.use("/api", ContactRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from Express and TypeScript");
});
app.use(globalErrorHandler);

// not found error handler =====
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});
export default app;
