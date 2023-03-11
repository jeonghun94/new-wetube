import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

const getHashtags = async () => {
  const hashtags = [];
  const videos = await Video.find();

  videos.forEach((video) => {
    video.hashtags.forEach((hashtag) => {
      if (!hashtags.includes(hashtag)) {
        hashtags.push(hashtag);
      }
    });
  });
  return hashtags;
};

export const home = async (req, res) => {
  const hashtags = await getHashtags();
  const videos = await Video.find()
    .sort({ createdAt: "desc" })
    .populate("owner");

  return res.render("home", { pageTitle: "Home", videos, hashtags });
};

export const search = async (req, res) => {
  const hashtags = await getHashtags();
  const { title, hashtag } = req.query;
  let videos = [];

  console.log(title, "title");

  const regex = (pattern) => new RegExp(`.*${pattern}.*`);
  const titleRegex = regex(title); // .*토끼.*

  if (title) {
    videos = await Video.find({
      title: {
        $regex: titleRegex,
      },
    })
      .sort({ createdAt: "desc" })
      .populate("owner");
  } else if (hashtag) {
    videos = await Video.find({
      hashtags: {
        $regex: new RegExp(`${hashtag}$`, "i"),
      },
    })
      .sort({ createdAt: "desc" })
      .populate("owner");
  }

  return res.render("home", {
    pageTitle: "Search",
    videos,
    hashtags,
    searchBy: title || hashtag,
    searchByTitle: title,
  });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  console.log(video, "dsdasd");

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video", noSearchBar: true });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const registerView = async (req, res) => {
  console.log("registerView");
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });

  video.comments.push(comment._id);
  video.save();

  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { commentId },
  } = req;

  const comment = await Comment.findById(commentId).populate("owner");
  const videoId = comment.video;
  if (String(_id) !== String(comment.owner._id)) {
    return res.sendStatus(404);
  }
  const video = await Video.findById(videoId);
  if (!video) {
    return res.sendStatus(404);
  }

  video.comments.splice(video.comments.indexOf(commentId), 1);
  await video.save();
  await Comment.findByIdAndDelete(commentId);

  return res.sendStatus(200);
};
