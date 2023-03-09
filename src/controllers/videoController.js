import Video from "../models/Video";
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
    });
  } else if (hashtag) {
    videos = await Video.find({
      hashtags: {
        $regex: new RegExp(`${hashtag}$`, "i"),
      },
    });
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
  const video = await Video.findById(id);
  const users = await User.find({});
  console.log(users);

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
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: req.session.user._id,
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
