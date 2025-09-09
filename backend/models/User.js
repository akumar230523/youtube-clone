import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatarURL: { type: String, required: true, trim: true },
    channels: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);

export default User;
