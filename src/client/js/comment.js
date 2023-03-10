const videoController = document.getElementById("videoController");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoController.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const deleteButton = document.querySelectorAll(
  ".video__comment span:last-child"
);

const handleDelete = async (event) => {
  const {
    target: { parentNode },
  } = event;
  const commentId = parentNode.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    parentNode.remove();
  }
};

deleteButton.forEach((button) => {
  button.addEventListener("click", handleDelete);
});

if (form) {
  form.addEventListener("submit", handleSubmit);
}
