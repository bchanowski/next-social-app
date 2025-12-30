import { ObjectId } from "mongoose";

export type UserT = {
  _id: ObjectId;
  auth0Id: string;
  email: string;
  name: string;
  position: string;
  description: string;
  subscribedTo: string[];
  avatarUrl: string;
  createdAt: Date;
};
