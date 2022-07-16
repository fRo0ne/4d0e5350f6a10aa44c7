const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const sectionNews = document.querySelector(".news-main");
const sectionNewsMain = document.querySelector(".news-main__all");
const templateButtonNewsMain = document.querySelector("#button__tablet").content;
const templateButtonDesktop = document.querySelector("#button__desktop").content;

function checkWidthElement() {
  return window.innerWidth;
}

function replacedButtonNews() {
  const widthSection = checkWidthElement(sectionNews);
  if(widthSection < 1024) {
    checkTabletButton() == null ? sectionNewsMain.replaceChild(createButtonTablet(), checkDesktopButton()) : false;
    return;
  }
  checkDesktopButton() == null ? sectionNewsMain.replaceChild(createButtonDesktop(), checkTabletButton()) : false;
}

function checkTabletButton() {
  return sectionNewsMain.querySelector('.news-main__tablet-container');
}

function checkDesktopButton() {
  return sectionNewsMain.querySelector('.button_news');
}

function createButtonTablet() {
  return templateButtonNewsMain.querySelector('.news-main__tablet-container').cloneNode(true);
}

function createButtonDesktop() {
  return templateButtonDesktop.cloneNode(true);
}

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});


window.addEventListener('resize', function(event){
  replacedButtonNews();
});

replacedButtonNews();

