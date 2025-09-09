import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const commentSchema = new mongoose.Schema({
    commentId: { type: String, required: true, default: uuidv4 },
    userId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, default: uuidv4 },
    title: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true },
    category: { type: Array, required: true},
    channelId: { type: String, required: true},
    uploader: { type: String, required: true},     // userId
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    uploadDate: { type: Date, default: Date.now },
    comments: { type: [commentSchema], default: [] },
});

const VideoData = mongoose.model("Video", videoSchema);

export default VideoData;
