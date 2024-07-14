import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { mainRouter } from './routes/main.routes';
import { connectToMongoDB } from "./services/mongooseService";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(
    cors({
        methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Origin'],
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

app.use(mainRouter);

app.use(ErrorHandlerMiddleware)

connectToMongoDB()

app.listen(process.env.PORT, () => {
    console.log(`\n========================================`);
    console.log(`Server listening on port ${process.env.PORT}`);
    console.log(`========================================`);
});
