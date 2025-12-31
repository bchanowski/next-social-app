import { ObjectId } from "mongoose";

export type PostT = {
  _id: ObjectId;
  title: string;
  description: string;
  authorId: string;
  topic: string;
  stars: number;
  createdAt: Date;
  updatedAt?: Date;
};
