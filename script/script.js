const closeButton = document.querySelector(".popup");

closeButton.addEventListener("click", () => {
  closeButton.classList.remove("popup_opened");
});
