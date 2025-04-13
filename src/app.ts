import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "./module/user/user.router";
import authRouter from "./module/auth/auth.router";
import { medicineRoutes } from "./module/medicines/medicines.route";
import { OrderRoutes } from "./module/order/order.route";
import { globalErrorHandler } from "./errors/GlobalErrorHandler";
const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", medicineRoutes);
app.use("/api", OrderRoutes);

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
