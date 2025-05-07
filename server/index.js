import express from 'express';
import connectDB from './config/db.js';
import cors from "cors";

const app = express();
const port = 5050;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello QwizR');
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});

import UserRouter from "./routes/user.route.js";
import TutorRouter from "./routes/tutor.route.js";
import StudentRouter from "./routes/student.route.js";
import VerifyTokenStudent from './middlewares/authStudent.js';
import VerifyTokenTutor from './middlewares/authTutor.js';

app.use("/auth", UserRouter);
app.use("/student", VerifyTokenStudent, StudentRouter);
app.use("/tutor", VerifyTokenTutor, TutorRouter);