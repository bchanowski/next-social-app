import { ObjectId } from "mongoose";

export type UserT = {
  _id: ObjectId;
  auth0Id: string;
  email: string;
  name: string;
  position: string;
  description: string;
  subscribedTo: string[];
  bookmarkedPosts: ObjectId[];
  starredPosts: ObjectId[];
  avatarUrl: string;
  createdAt: Date;
};
