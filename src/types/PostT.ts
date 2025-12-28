import { ObjectId } from "mongoose";

export type PostT = {
  _id: ObjectId;
  title: string;
  description: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
};
