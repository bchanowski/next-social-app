import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true, required: true },
  avatarUrl: String,
  description: String,
  position: String,
  subscribedTo: { type: [String], default: [] },
  bookmarkedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  starredPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
