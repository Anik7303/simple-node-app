import getInstance from "../database";
import Post from "../entities/post";
import { generateSlugFromTitle } from "../lib/utils";
import { ErrorWithStatus } from "../types";

export async function findAll(limit: number = 10, offset: number = 0) {
  return getInstance().post.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });
}

export async function findOne(id: string) {
  const post = await getInstance().post.findFirst({ where: { id } });
  if (!post) {
    const error: ErrorWithStatus = new Error(`Post #${id} not found.`);
    error.statusCode = 404;
    throw error;
  }
  return post;
}

interface CreatePost {
  title: string;
  content: string;
}

export async function create(info: CreatePost) {
  const { title, content } = info;
  const slug = generateSlugFromTitle(title);
  const data = {
    title,
    content,
    slug,
  };
  return getInstance().post.create({ data });
}

interface UpdatePost {
  id: string;
  title?: string;
  content?: string;
}

export async function update(info: UpdatePost) {
  const { id, title, content } = info;

  await findOne(id);

  const data: Partial<Post> = {};
  if (title) {
    data.title = title;
    data.slug = generateSlugFromTitle(title);
  }
  if (content) data.content = content;
  return getInstance().post.update({ where: { id }, data });
}

export async function remove(id: string) {
  await findOne(id);
  return getInstance().post.delete({ where: { id } });
}
