import { Router } from "express";

import { create, findAll, findOne, remove, update } from "../controllers/posts";

const router = Router();

router.route("/posts").get(findAll).post(create);
router.route("/posts/:id").get(findOne).patch(update).delete(remove);

export default router;
