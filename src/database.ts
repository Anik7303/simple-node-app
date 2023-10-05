import { PrismaClient } from "@prisma/client";

let instance: PrismaClient | null = null;

export default function getInstance(): PrismaClient {
  if (!instance) {
    instance = new PrismaClient();
  }
  return instance;
}
