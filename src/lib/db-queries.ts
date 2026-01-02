import Post from "@/models/Post";
import { User } from "@auth0/nextjs-auth0/types";

export interface TrendingTopic {
  topic: string;
}

export async function getTrendingPeople(): Promise<User[]> {
  try {
    const results = await Post.aggregate([
      {
        $group: {
          _id: "$authorId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "auth0Id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $replaceRoot: { newRoot: "$userDetails" },
      },
    ]);

    return JSON.parse(JSON.stringify(results)).map((u: User) => ({
      ...u,
      sub: u.auth0Id,
      picture: u.avatarUrl,
    }));
  } catch (error) {
    console.error("Trending fetch error:", error);
    return [];
  }
}

export async function getPopularTopics(): Promise<string[]> {
  try {
    const results = await Post.aggregate([
      {
        $match: {
          topic: { $ne: "General" },
        },
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return results.map((item: { _id: string }) => item._id);
  } catch (error) {
    console.error("Error fetching popular topics:", error);
    return [];
  }
}
