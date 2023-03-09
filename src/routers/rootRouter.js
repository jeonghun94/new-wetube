import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatarFiles,
} from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter
  .route("/edit-profile")
  .all(protectorMiddleware)
  .get(getEditProfile)
  .post(uploadAvatarFiles.single("avatar"), postEditProfile);
rootRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

rootRouter.get("/search", search);
rootRouter.get("/logout", logout);

export default rootRouter;
