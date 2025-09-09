import express from "express";
import { getAllChannels ,getChannelById, createChannel, editChannel, deleteChannel } from "../controllers/channelController.js";
import auth from "../middleware/authMiddleware.js";

const channelRouter = express.Router();

channelRouter.get("/", getAllChannels);                                   // Get all channels
channelRouter.get("/:channelId", getChannelById);                         // Get channel by channelId
channelRouter.post("/create", auth, createChannel);                       // Create channel
channelRouter.put("/edit/:channelId", auth, editChannel);                 // Edit channel
channelRouter.delete("/delete/:channelId", auth, deleteChannel);          // Delete channel

export default channelRouter;
