import express from "express";

import { getAllVideos, getVideoById, uploadVideo, updateVideo, deleteVideo, addComment, deleteComment } from "../controllers/videoController.js";
import auth  from "../middleware/authMiddleware.js";

const videoRouter = express.Router();

videoRouter.get("/", getAllVideos);                                       // Get all videos
videoRouter.get("/:videoId", getVideoById);                               // Get video by videoId
videoRouter.post("/upload", auth, uploadVideo);                           // Upload video
videoRouter.put("/update/:videoId", auth, updateVideo);                   // Update video
videoRouter.delete("/delete/:videoId", auth, deleteVideo);                // Delete video
videoRouter.post("/addComment", addComment);                      // 
videoRouter.delete("/deleteComment", deleteComment); 

export default videoRouter;
