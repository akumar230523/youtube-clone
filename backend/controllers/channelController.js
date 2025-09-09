import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import User from "../models/User.js";

// Get all Channels.
export const getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        return res.status(200).json(channels);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to fetch channels." });
    }
};

// Get a Channel by channelId.
export const getChannelById = async (req, res) => {
    const { channelId } = req.params;
    try {
        const channel = await Channel.findOne({ channelId });
        if (!channel) return res.status(404).json({ message: "Channel not found." });
        return res.status(200).json(channel);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to fetch channel." });
    }
};

// Create a Channel.
export const createChannel = async (req, res) => {
    const { channelName, owner, description, channelBannerURL, channelAvatarURL } = req.body;
    try {
        const existingchannel = await Channel.findOne({ channelName });
        if (existingchannel) return res.status(400).json({ message: "Channel name already taken. Please try different name." });
        const newChannel = await Channel.create({ channelId: channelName, channelName, owner, description, channelBannerURL, channelAvatarURL });
        const updatedUser = await User.findOneAndUpdate({ userId: owner }, { $push: {channels: newChannel.channelId} }, { new: true });     // Add channelId to user's channels
        return res.status(201).json({ message: "Channel created successfully.", user: updatedUser });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to create channel." });
    }
};

// Edit a Channel by channelId.
export const editChannel = async (req, res) => {
    const { channelId } = req.params;
    try {
        const editedChannel = await Channel.findOneAndUpdate({ channelId }, req.body, { new: true });
        if (!editedChannel ) return res.status(404).json({ message: "Channel not found." });
        return res.status(200).json({ message: "Channel edited successfully." });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error! Failed to edit Channel." });
    }
};

// Delete a Channel by channelId.
export const deleteChannel = async (req, res) => {
    const { channelId } = req.params;
    try {
        const deletedChannel = await Channel.findOneAndDelete({ channelId });
        if (!deletedChannel) return res.status(404).json({ message: "Channel not found." });
        await Video.deleteMany({ channelId });     // Delete all videos associated with the channel
        const updatedUser = await User.findOneAndUpdate({ userId: deletedChannel.owner }, { $pull: { channels: channelId } }, { new: true } );     // Remove channelId from user's channels
        return res.status(200).json({ message: "Channel deleted successfully.", user: updatedUser });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error! Failed to delete channel." });
    }
};