import express from "express";
import { remove, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
