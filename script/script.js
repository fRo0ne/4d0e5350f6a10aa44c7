const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});
