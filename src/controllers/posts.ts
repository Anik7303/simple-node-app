import { NextFunction, Request, Response } from "express";

import Post from "../entities/post";
import * as service from "../services/posts";

export async function findAll(
  _req: Request,
  res: Response<Post[]>,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await service.findAll();
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
    const post = await service.findOne(req.params.id);
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
    const post = await service.create(req.body);
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
    const post = await service.update({ ...req.body, id });
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
    const post = await service.remove(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}
