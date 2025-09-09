import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

const app = express();

dotenv.config();

app.use(cors()); 
app.use(express.json()); 

import channelRouter from "./routes/channelRouter.js";
import userRouter from "./routes/userRouter.js";
import videoRouter from "./routes/videoRouter.js";

app.use("/channels", channelRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// Function to connect to database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } 
    catch (error) {
        console.error("Failed to start server: ", error.message);
        process.exit(1);
    }
};

startServer();


