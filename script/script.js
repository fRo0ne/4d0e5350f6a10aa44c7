const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const sectionNews = document.querySelector(".news-main");
const sliderNewsContainer = sectionNews.querySelector('.slider__items');
const sectionNewsMain = document.querySelectorAll(".news-main__all");
const journalMainBlock = document.querySelector('.journal-projito');
const sliderJournalContainer = journalMainBlock.querySelector('.slider__items');
const sectionReaderAll = document.querySelectorAll('.journal-projito__card_reader');
const templateButtonNewsMain = document.querySelector("#button__tablet").content;
const templateButtonDesktop = document.querySelector("#button__desktop").content;
const templateNewsMainBlock = document.querySelector("#template-news").content;
const templateProjitoCard = document.querySelector('#template-projito').content;
const templateProjitoReader = document.querySelector('#template-reader').content;
const limitIndex = 6;
const limitMobile = 3;

function checkWidthElement() {
  return window.innerWidth;
}

function replacedButtonNews(container,parentContainer) {
  const widthSection = checkWidthElement();
  if(widthSection < 1024) {
    checkTabletButton(container) == null ? container.replaceChild(createButtonTablet(parentContainer), checkDesktopButton(container)) : false;
    return;
  }
  checkDesktopButton(container) == null ? container.replaceChild(createButtonDesktop(parentContainer), checkTabletButton(container)) : false;
}

function checkTabletButton(container) {
  return container.querySelector('.news-main__tablet-container');
}

function checkDesktopButton(container) {
  return container.querySelector('.button_news');
}

function createButtonTablet(parentContainer) {
  const newButton = templateButtonNewsMain.querySelector('.news-main__tablet-container').cloneNode(true);
  switch (parentContainer.classList.value) {
    case 'news-main':
      newButton.querySelector('.news-main__text-button').textContent = 'Ко всем новостям';
      break;
    case 'journal-projito':
      newButton.querySelector('.news-main__text-button').textContent = 'Посмотреть всю подборку';
      break;
  }
  return newButton;
}

function createButtonDesktop(parentContainer) {
  const newButton = templateButtonDesktop.cloneNode(true);
  switch (parentContainer.classList.value) {
    case 'news-main':
      newButton.querySelector('.button_news').textContent = 'Ко всем новостям';
      break;
    case 'journal-projito':
      newButton.querySelector('.button_news').textContent = 'Посмотреть всю подборку';
      break;
  }
  return newButton;
}

function createNewsCard(item) {
  const sliderNews = templateNewsMainBlock.querySelector('.item_slider').cloneNode(true);
  const newsDate = sliderNews.querySelector('.item__date');
  const newsTag = sliderNews.querySelector('.item__tag');
  const newsTitle = sliderNews.querySelector('.item__title');
  const newsImage = sliderNews.querySelector('.item__image');
  newsDate.textContent = item.date;
  newsTag.textContent = item.tag;
  newsTitle.textContent = item.title;
  newsImage.src = item.image;
  newsImage.alt = item.alt;
  return sliderNews;

}
function createReaderCard (item) {
  const sliderMaterial = templateProjitoReader.querySelector('.journal-projito__card').cloneNode(true);
  const materialTitle = sliderMaterial.querySelector('.journal-projito__text-title');
  const materialPhoto = sliderMaterial.querySelector('.journal-projito__reader-photo');
  const materialText = sliderMaterial.querySelector('.journal-projito__text-quote');
  const mateirialQuote = sliderMaterial.querySelector('.journal-projito__text-quote_reader');
  materialPhoto.src = item.image;
  materialPhoto.alt = item.alt;
  materialTitle.textContent = item.title;
  mateirialQuote.textContent = item.about;
  materialText.textContent = item.quote;
  return sliderMaterial;
}
function createMaterialsCard(item) {
  if(item.reader) {
    return createReaderCard(item);
  }
  const sliderMaterial = templateProjitoCard.querySelector('.journal-projito__card').cloneNode(true);
  const materialTitle = sliderMaterial.querySelector('.journal-projito__text-title');
  const materialSubtitle = sliderMaterial.querySelector('.journal-projito__text-subtitle');
  const materialAbout = sliderMaterial.querySelector('.journal-projito__about');
  const mateirialQuote = sliderMaterial.querySelector('.journal-projito__text-quote');
  materialTitle.textContent = item.title;
  materialSubtitle.textContent = item.subtitle;
  materialAbout.textContent = item.about;
  mateirialQuote.textContent = item.quote;
  sliderMaterial.style.backgroundImage = `url('${item.image}')`;
  return sliderMaterial;

}

function renderNewsPrepend(cardNews,container) {
  container.prepend(cardNews);
}

function checkRenderLimit(index,limit) {
  if(index > limit - 1) {
    return false;
  }
  return true;
}

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});


sectionNewsMain.forEach( item => {
  const parentItem = item.parentNode;
  replacedButtonNews(item,parentItem);
  window.addEventListener('resize', () => {
  replacedButtonNews(item,parentItem);
});
})

sectionReaderAll.forEach ( item => {
  item.querySelectorAll('.journal-projito__text-quote').forEach( item => {
    item.style.display = 'block';
  })
})

newsElement.forEach( (item,index) => {
  const widthSection = checkWidthElement();
  const limitRender = widthSection > 767 ? checkRenderLimit(index,limitIndex) : checkRenderLimit(index,limitMobile);
  if(limitRender) {
    const newCard = createNewsCard(item);
    renderNewsPrepend(newCard,sliderNewsContainer);
  }
});

materialsElement.forEach( (item,index) => {
  const limitRender = checkRenderLimit(index,limitIndex);
  if(limitRender) {
    const newCard = createMaterialsCard(item);
    renderNewsPrepend(newCard,sliderJournalContainer);
  }
});
