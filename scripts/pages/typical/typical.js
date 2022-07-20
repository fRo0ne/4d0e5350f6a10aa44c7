const contensButton = document.querySelector(".button__contens");
const contensPopup = document.querySelector(".popup-contens");
const closeContensPopup = document.querySelector(
  ".popup-contest__close-button"
);
const closeInfPopup = document.querySelector(".popup-inf__close-button");
const infPopup = document.querySelector(".popup-inf");

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
