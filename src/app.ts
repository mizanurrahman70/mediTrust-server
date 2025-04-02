import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
const app : Application = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true,
  }))
app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World from Express and TypeScript");
});

export default app;
