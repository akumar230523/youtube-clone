import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Get all Videos.
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        return res.status(200).json(videos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to fetch videos." });
    }
};

// Get a Video by videoId.
export const getVideoById = async (req, res) => {
    const { videoId } = req.params;
    try {
        const video = await Video.findOne({ videoId });
        if (!video) return res.status(404).json({ message: "Video not found." });
        return res.status(200).json(video);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to fetch video." });
    }
};

// Upload a Video.
export const uploadVideo = async (req, res) => {
    const { title, thumbnailUrl, videoUrl, description, category, channelId, uploader } = req.body;
    try {
        const newVideo = new Video({ title, thumbnailUrl, videoUrl, description, category, channelId, uploader });
        await newVideo.save();
        await Channel.findOneAndUpdate({ channelId: channelId }, { $push: {videos: newVideo.videoId} }, { new: true });     // Add videoId to channel's videos
        return res.status(201).json({ message: "Video uploaded successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to upload video." });
    }
};

// Update a Video by videoId.
export const updateVideo = async (req, res) => {
    const { videoId } = req.params;
    try {
        const updatedVideo = await Video.findOneAndUpdate({ videoId }, req.body, { new: true });
        if (!updatedVideo) return res.status(404).json({ message: "Video not found." });
        return res.status(200).json({ message: "Video updated successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to update video." });
    }
};

// Delete a Video by videoId.
export const deleteVideo = async (req, res) => {
    const { videoId } = req.params;
    try {
        const deletedVideo = await Video.findOneAndDelete({ videoId });
        if (!deletedVideo) return res.status(404).json({ message: "Video not found." });
        await Channel.findOneAndUpdate({ channelId: deletedVideo.channelId }, { $pull: {videos: videoId} }, { new: true });     // Remove videoId from channel's videos
        return res.status(200).json({ message: "Video deleted successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to delete video." });
    }
};

// Add a comment to the Video.
export const addComment = async (req, res) => {
    const { videoId, userId, commentText } = req.body;
    try {
        const video = await Video.findOne({ videoId });
        if (!video) return res.status(404).json({ message: "Video not found." });
        video.comments.push({ userId, text: commentText });
        await video.save();
        return res.status(201).json({ message: "Comment added successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to add comment." });
    }
};

// Delete a comment from the Video.
export const deleteComment = async (req, res) => {
    const { videoId, userId, commentId } = req.body;
    try {
        const video = await Video.findOne({ videoId });
        if (!video) return res.status(404).json({ message: "Video not found." });
        video.comments = video.comments.filter(c => !(c.userId == userId && c.commentId == commentId));       
        await video.save();
        return res.status(201).json({ message: "Comment deleted successfully." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to delete comment." });
    }
};
