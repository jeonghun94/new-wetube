const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");

const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const timeLine = document.querySelector("#timeLine");
const fullScreenBtn = document.querySelector("#fullScreenBtn");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const timeFormat = (time) => new Date(time * 1000).toISOString().slice(14, -5);
const handleCurrentTime = () => {
  currentTime.innerHTML = timeFormat(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTotalTime = () => {
  totalTime.innerHTML = timeFormat(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeLine = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.className = "fas fa-expand";
  } else {
    videoController.requestFullscreen();
    fullScreenBtnIcon.className = "fas fa-compress";
  }
};

const handleKeyDown = (e) => {
  switch (e.key) {
    case " ":
      handlePlayAndStop();
      break;
    case "ArrowLeft":
      video.currentTime -= 5;
      break;
    case "ArrowRight":
      video.currentTime += 5;
      break;
    case "ArrowUp":
      video.volume += 0.1;
      volumeRange.value = video.volume;
      volumeBtn.className = "fas fa-volume-up";
      break;
    case "ArrowDown":
      video.volume -= 0.1;
      if (video.volume <= 0) {
        volumeBtn.className = "fas fa-volume-off";
      }
      volumeRange.value = video.volume;
      break;
    case "f":
      handleFullScreen();
      break;
  }
};

const handleEnded = () => {
  const { id } = videoController.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);

video.addEventListener("timeupdate", handleCurrentTime);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("ended", handleEnded);
timeLine.addEventListener("input", handleTimeLine);
fullScreenBtn.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKeyDown);
