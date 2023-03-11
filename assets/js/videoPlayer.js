/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst videoController = document.getElementById(\"videoController\");\nconst psBtn = videoController.querySelector(\"#playPauseBtn\");\nconst volumeBtn = videoController.querySelector(\"#volume\");\nconst volumeRange = videoController.querySelector(\"#volumeRange\");\n\n//my code\nconst currentTime = document.querySelector(\"#currentTime\");\nconst totalTime = document.querySelector(\"#totalTime\");\nconst timeLine = document.querySelector(\"#timeLine\");\nconst fullScreenBtn = document.querySelector(\"#fullScreenBtn\");\nconst fullScreenBtnIcon = fullScreenBtn.querySelector(\"i\");\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nconst handlePlayAndStop = () => {\n  if (video.paused) {\n    video.play();\n    psBtn.className = \"fas fa-pause\";\n  } else {\n    video.pause();\n    psBtn.className = \"fas fa-play\";\n  }\n};\nconst handleSound = () => {\n  if (video.muted) {\n    video.muted = false;\n    volumeRange.value = volumeValue;\n    volumeBtn.className = \"fas fa-volume-up\";\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n};\nconst handleVolume = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (video.muted) {\n    video.muted = false;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n  if (value === \"0\") {\n    volumeBtn.className = \"fas fa-volume-off\";\n  } else {\n    volumeBtn.className = \"fas fa-volume-up\";\n  }\n  video.volume = volumeValue = value;\n};\n\n// my code\n\nconst timeFormat = time => new Date(time * 1000).toISOString().slice(14, -5);\nconst handleCurrentTime = () => {\n  currentTime.innerHTML = timeFormat(Math.floor(video.currentTime));\n  timeLine.value = Math.floor(video.currentTime);\n};\nconst handleTotalTime = () => {\n  totalTime.innerHTML = timeFormat(Math.floor(video.duration));\n  timeLine.max = Math.floor(video.duration);\n};\nconst handleTimeLine = e => {\n  const {\n    target: {\n      value\n    }\n  } = e;\n  video.currentTime = value;\n};\nconst handleFullScreen = () => {\n  const fullscreen = document.fullscreenElement;\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenBtnIcon.className = \"fas fa-expand\";\n  } else {\n    videoController.requestFullscreen();\n    fullScreenBtnIcon.className = \"fas fa-compress\";\n  }\n};\nconst handleKeyDown = e => {\n  switch (e.key) {\n    case \" \":\n      handlePlayAndStop();\n      break;\n    case \"ArrowLeft\":\n      video.currentTime -= 5;\n      break;\n    case \"ArrowRight\":\n      video.currentTime += 5;\n      break;\n    case \"ArrowUp\":\n      video.volume += 0.1;\n      volumeRange.value = video.volume;\n      volumeBtn.className = \"fas fa-volume-up\";\n      break;\n    case \"ArrowDown\":\n      video.volume -= 0.1;\n      if (video.volume <= 0) {\n        volumeBtn.className = \"fas fa-volume-off\";\n      }\n      volumeRange.value = video.volume;\n      break;\n    case \"f\":\n      handleFullScreen();\n      break;\n  }\n};\nconst handleEnded = () => {\n  const {\n    id\n  } = videoController.dataset;\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  });\n};\npsBtn.addEventListener(\"click\", handlePlayAndStop);\nvolumeBtn.addEventListener(\"click\", handleSound);\nvolumeRange.addEventListener(\"input\", handleVolume);\nvideo.addEventListener(\"timeupdate\", handleCurrentTime);\nvideo.addEventListener(\"loadedmetadata\", handleTotalTime);\nvideo.addEventListener(\"ended\", handleEnded);\ntimeLine.addEventListener(\"input\", handleTimeLine);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\nwindow.addEventListener(\"keydown\", handleKeyDown);\n\n//# sourceURL=webpack://new-wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;