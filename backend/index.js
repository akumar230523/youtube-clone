import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

import channelRouter from "./routes/channelRouter.js";
import userRouter from "./routes/userRouter.js";
import videoRouter from "./routes/videoRouter.js";

app.use("/channels", channelRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const PORT = process.env.PORT || 5000;

// Function to connect to database and start server.
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


