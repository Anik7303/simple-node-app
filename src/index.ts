import dotenv from "dotenv";
import express from "express";
import path from "node:path";

import getInstance from "./database";
import { getIPAddress } from "./lib/utils";
import { catchAllErrors, notFound } from "./middlewares/error";
import postsRouter from "./routes/posts";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(".env") });
}

// variables
const PORT: string = process.env.PORT || "8000";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(postsRouter);

app.use(notFound);
app.use(catchAllErrors);

async function main() {
  try {
    await getInstance().$connect();
    await app.listen(parseInt(PORT));
    console.log(`Local Address:\t\thttp://localhost:${PORT}`);
    const ipAddress = getIPAddress();
    console.log(`Network Address:\thttp://${ipAddress}:${PORT}`);
  } catch (error: unknown) {
    console.error(error);
  }
}

main();
