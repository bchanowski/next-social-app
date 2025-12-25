import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, unique: true },
  name: String,
  avatarUrl: String,
  description: String,
  position: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
