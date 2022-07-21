const contensButton = document.querySelector(".button__contens");
const contensPopup = document.querySelector(".popup-contens");
const closeContensPopup = document.querySelector(
  ".popup-contest__close-button"
);
const closeInfPopup = document.querySelector(".popup-inf__close-button");
const infPopup = document.querySelector(".popup-inf");
const audio = document.getElementById("audio");
const playAudio = document.getElementById("button-play");
var count = 0;
const player = document.querySelector(".player");

contensButton.addEventListener("click", () => {
  contensPopup.classList.add("popup_opened");
  infPopup.classList.remove("popup_opened");
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeContensPopup.addEventListener("click", () => {
  closePopup(contensPopup);
  infPopup.classList.add("popup_opened");
});

closeInfPopup.addEventListener("click", () => {
  closePopup(infPopup);
});

function playPause() {
  if (count === 0) {
    count = 1;
    audio.play();
  } else {
    count = 0;
    audio.pause();
  }
}

playAudio.addEventListener("click", () => {
  playPause();
});

player.addEventListener("click", (event) => {
  event.target.classList.toggle("player__button-stop");
});
