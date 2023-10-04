import Post from "../entities/post";
import { ErrorWithStatus } from "../types";

let posts: Post[] = [
  {
    id: 1,
    title: "post 1",
    content: "post content 1",
    userId: 1,
  },
  {
    id: 2,
    title: "post 2",
    content: "post content 2",
    userId: 1,
  },
  {
    id: 3,
    title: "post 3",
    content: "post content 3",
    userId: 1,
  },
  {
    id: 4,
    title: "post 4",
    content: "post content 4",
    userId: 1,
  },
  {
    id: 5,
    title: "post 5",
    content: "post content 5",
    userId: 2,
  },
  {
    id: 6,
    title: "post 6",
    content: "post content 6",
    userId: 2,
  },
  {
    id: 7,
    title: "post 7",
    content: "post content 7",
    userId: 2,
  },
  {
    id: 8,
    title: "post 8",
    content: "post content 8",
    userId: 3,
  },
  {
    id: 9,
    title: "post 9",
    content: "post content 9",
    userId: 3,
  },
  {
    id: 10,
    title: "post 10",
    content: "post content 10",
    userId: 4,
  },
];

export function findAll(): Post[] {
  return posts satisfies Post[];
}

export function findOne(id: number): Post | undefined {
  return posts.find((post) => post.id === id);
}

interface CreatePost {
  title: string;
  content: string;
}

export function create(info: CreatePost): Post {
  const { title, content } = info;
  const post = {
    id: posts.length + 1,
    title,
    content,
    userId: 5,
  };
  posts.push(post);
  return post;
}

interface UpdatePost {
  id: number;
  title?: string;
  content?: string;
}

export function update(info: UpdatePost): Post {
  const { id, title, content } = info;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const error: ErrorWithStatus = new Error(`Post #${id} not found.`);
    error.statusCode = 404;
    throw error;
  }

  const updatedPost = {
    ...post,
    title: title || post.title,
    content: content || post.content,
  };
  posts = posts.map((post) => (post.id === id ? updatedPost : post));
  return updatedPost;
}

export function remove(id: number): Post {
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const error: ErrorWithStatus = new Error(`Post #${id} not found.`);
    error.statusCode = 404;
    throw error;
  }

  posts = posts.filter((p) => p.id !== id);
  return post;
}
