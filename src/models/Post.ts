import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
