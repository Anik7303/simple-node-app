import { NextFunction, Request, Response } from "express";

import * as services from "../services/posts";
import Post from "../entities/post";

export async function findAll(
  _req: Request,
  res: Response<Post[]>,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await services.findAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<{ id: string }, Post>,
  res: Response<Post>,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const post = await services.findOne(parseInt(id));
    res.json(post);
  } catch (error) {
    next(error);
  }
}

interface CreatePostDto {
  title: string;
  content: string;
}

export async function create(
  req: Request<null, Post, CreatePostDto>,
  res: Response<Post>,
  next: NextFunction
): Promise<void> {
  try {
    const post = await services.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

interface UpdatePostDto {
  title?: string;
  content?: string;
}

export async function update(
  req: Request<{ id: string }, Post, UpdatePostDto>,
  res: Response<Post>,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const post = await services.update({ id: parseInt(id), ...req.body });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request<{ id: string }, Post>,
  res: Response<Post>,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const post = await services.remove(parseInt(id));
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}
