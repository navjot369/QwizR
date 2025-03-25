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

app.use("/auth", UserRouter);