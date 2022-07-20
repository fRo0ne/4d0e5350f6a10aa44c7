// все стрелки в пейдже
const arrowLeftAll = document.querySelectorAll('.arrow_left');
const arrowRightAll = document.querySelectorAll('.arrow_right');
// индикаторы в пейдже
const sliderIndicatorsAll = document.querySelectorAll('.slider__indicator');
// дефолтный шаг для индикатора и система координат.
const defautlTransformIndicator = 15;
// дефолтный шаг для слайдеров мобильной версии
const defaultTransformMobileStep = 80;
let y = 0;
let x = 0;
let isDrawing = false;
// слайдеры projito
const sliderJournal = document.querySelectorAll('.journal-projito__card');
const countSliderJournal = sliderJournal.length * stepPosition;
const defaultZindex = -sliderJournal.length;
// слайдеры материалы
const materials = document.querySelector('.materials');
const cardsContainer = materials.querySelector('.cards');
const buttonsMaterials = materials.querySelectorAll('.button');
const buttonsContainerMaterials = materials.querySelector('.materials__slider');

/**
 * метод обработки слайдера, проверка разницы координат, вызов экшинов по кнопкам, установка значений
 * @param {int} xOne ось и координаты где произошло события захвата ползунка
 * @param {int} xTwo ось и координаты куда произошел сдвиг
 * @param {object} sliderContainer объект типа элемент, контейнер где лежат наши слайды
 * @param {object} indicatorContainer объект типа элемент, ползунок для слайдов
 * @param {NodeList} itemSlider коллекция слайдов
 * @param {object} buttonLeft
 * @param {object} buttonRight
 * @returns
 */
function swiping(xOne,xTwo,sliderContainer,indicatorContainer,itemSlider,buttonLeft,buttonRight) {
  const valueTransform = getTransformValue(indicatorContainer);
  if(xOne < xTwo) {
    actionButtonRight(buttonRight,sliderContainer,indicatorContainer,itemSlider,buttonLeft);
    swipingRight(+valueTransform + defautlTransformIndicator,indicatorContainer,itemSlider);
    return;
  }
  actionButtonLeft(buttonLeft,sliderContainer,indicatorContainer,buttonRight,itemSlider);
  swipingLeft(+valueTransform - defautlTransformIndicator,indicatorContainer);
}
// свайп ползунка влево, проверка значения translateX. Вызов сеттера
function swipingLeft(value,sliderIndicator) {
  value >= 0 ? setTransformValueIndicator(value,sliderIndicator) : false;
}
// свайп ползунка вправо, проверка максов и значения translateX. Вызов сеттера
function swipingRight(value,sliderIndicator,itemSlider) {
  const maxTransformValue = itemSlider.length * defautlTransformIndicator - defautlTransformIndicator;
  if(getTransformValue(sliderIndicator) < maxTransformValue) {
    setTransformValueIndicator(value,sliderIndicator);
  }
}
// проверка и установка доступности кнопок, в зависимости от значения translateX.
function disableButtonLeft (button,container) {
  const valueTransform = getTransformValue(container);
  if (valueTransform > 0) {
    button.disabled = false;
    return;
  }
  button.disabled = true;
}

function disableButtonRight(value,button,itemSliderWidth,itemSlider) {
  const maxTransform = itemSlider.length * itemSliderWidth - itemSliderWidth;
  if(value >= maxTransform) {
    button.disabled = true;
    return;
  }
  button.disabled = false;
}
// метод получения цифрового занчения трансформа
function getTransformValue(container) {
  return container.style.transform.replace(/[^\d.]/g, '');
}
// метод установки значения для translate по оси Х для контейнера слайдеров
function setTransformValue(container, value) {
  container.style.transform = `translateX(-${value}px)`;
}
// метод установки значения для translate по оси Х для ползунка слайдеров
function setTransformValueIndicator(value,sliderIndicator) {
  sliderIndicator.style.transform = `translateX(${value}px)`;
}
/**
 * метод обработки события при клике на кнопку влево. установка значений, проверка кнопок на доступность.
 * @param {object} button сама кнопка на которую сделали click
 * @param {object} container объект типа элемент, контейнер где лежат наши слайды
 * @param {object} parentContainer объект типа элемент, ползунок для слайдов
 * @param {object} buttonRight
 * @param {NodeList} itemSlider коллекция слайдов
 * @returns
 */
function actionButtonLeft(button,container,parentContainer,buttonRight,itemSlider) {
  const valueTransform = getTransformValue(container);
  const valueTransformIndicator = getTransformValue(parentContainer);
  const itemSliderWidth = calculateWidthElement(container);

  if(valueTransform >= itemSliderWidth) {
    setTransformValue(container, +valueTransform - +itemSliderWidth);
    swipingLeft(+valueTransformIndicator - defautlTransformIndicator,parentContainer);
    disableButtonRight(+valueTransform - +itemSliderWidth,buttonRight,itemSliderWidth,itemSlider);
    disableButtonLeft(button,container);
    return;
  }
  setTransformValue(container, '');
  swipingLeft(+valueTransformIndicator - defautlTransformIndicator,parentContainer);
  disableButtonLeft(button,container);
}
/**
 * метод обработки события при клике на кнопку вправо. установка значений, проверка кнопок на доступность.
 * @param {object} button сама кнопка на которую сделали click
 * @param {object} container объект типа элемент, контейнер где лежат наши слайды
 * @param {object} parentContainer объект типа элемент, ползунок для слайдов
 * @param {NodeList} itemSlider коллекция слайдов
 * @param {object} buttonLeft
 * @returns
 */
function actionButtonRight(button,container,parentContainer,itemSlider,buttonLeft) {
  const valueTransform = getTransformValue(container);
  const valueTransformIndicator = getTransformValue(parentContainer);
  const itemSliderWidth = calculateWidthElement(container);

  const newTransform = +valueTransform + +itemSliderWidth;
  const checkMaxTransform = itemSlider.length * itemSliderWidth - itemSliderWidth;
  if(newTransform > checkMaxTransform) {
    return false;
  }
  if(valueTransform >= itemSliderWidth) {
    swipingRight(+valueTransformIndicator + defautlTransformIndicator,parentContainer,itemSlider);
    setTransformValue(container, newTransform);
    disableButtonRight(newTransform,button,itemSliderWidth,itemSlider);
    return;
  }
  swipingRight(+valueTransformIndicator + defautlTransformIndicator,parentContainer,itemSlider);
  setTransformValue(container, itemSliderWidth);
  disableButtonLeft(buttonLeft,container);
}

/**
 *
 * @param {*} element
 * @returns
 */
function actionMobileSlider(container, step,index,el) {

    const dataIdCard = el.dataset.id;
    if(dataIdCard == 0) {
      return false;
    };
    changeMaterialsCard(dataIdCard,container,step);
}

function getValuePositionCard(container,step) {
  const valueTransform = getTransformValue(container);
  const stepTransform = step + +valueTransform;
  const stepPosition = stepTransform - step;
  const newCardLeft = valueTransform !== '' ? +stepPosition + countSliderJournal : countSliderJournal;
  setTransformValue(container,stepTransform);
  return newCardLeft;
}

function setLeftPosition(element, position) {
  element.style.left = ""+position+"px";
}

function setIndexCard(element,index) {
  element.style.zIndex = index;
}

function setDatasetId(element,container) {
  element.dataset.id = container.length + +element.dataset.id;
}

function changeMaterialsCard(dataIdCard,container,step) {
  sliderJournal.forEach( el => {
    if(dataIdCard > +el.dataset.id) {
      const newPositionCard = getValuePositionCard(container,step);
      setLeftPosition(el, newPositionCard);
      setIndexCard(el,defaultZindex);
      setDatasetId(el,sliderJournal);
      renderNewsPrepend(el,container,step);
    }
  })
}

// геттеры на элементы
function prepareSliderContainer(element) {
  return element.querySelector('.slider__items');
}

function calculateWidthElement(element) {
  return element.querySelector('.item_slider').offsetWidth;
}

function getParentContainer(element) {
  return element.closest('.slider__container');
}

function getSliderIndicator(element) {
  return element.querySelector('.slider__indicator');
}

function getItemSliderAll(element) {
  return element.querySelectorAll('.item_slider');
}

function getButtonLeft(element) {
  return element.querySelector('.arrow_left');
}

function getButtonRight(element) {
  return element.querySelector('.arrow_right')
}
// слушатель событий на кнопку ВЛЕВО, работа сразу с неограниченным количеством слайдеров.
arrowLeftAll.forEach( el => {
  const parentContainer = getParentContainer(el);
  const sliderContainer = prepareSliderContainer(parentContainer);
  const indicatorContainer = getSliderIndicator(parentContainer);
  const itemSlider = getItemSliderAll(parentContainer);
  const buttonRight = getButtonRight(parentContainer);

  disableButtonLeft(el,sliderContainer);
  el.addEventListener('click', () => {
    actionButtonLeft(el,sliderContainer,indicatorContainer,buttonRight,itemSlider);
  });
});
// слушатель событий на кнопку ВПРАВО, работа сразу с неограниченным количеством слайдеров.
arrowRightAll.forEach( el => {
  const parentContainer = getParentContainer(el);
  const sliderContainer = prepareSliderContainer(parentContainer);
  const indicatorContainer = getSliderIndicator(parentContainer);
  const itemSlider = getItemSliderAll(parentContainer);
  const buttonLeft = getButtonLeft(parentContainer);

  el.addEventListener('click', () => {
    actionButtonRight(el,sliderContainer,indicatorContainer,itemSlider,buttonLeft);
  });
});
// слушатель событий на индикатор, работа сразу с неограниченным количеством слайдеров.
sliderIndicatorsAll.forEach( el => {
  const parentContainer = getParentContainer(el);
  const sliderContainer = prepareSliderContainer(parentContainer);
  const indicatorContainer = getSliderIndicator(parentContainer);
  const itemSlider = getItemSliderAll(parentContainer);
  const buttonLeft = getButtonLeft(parentContainer);
  const buttonRight = getButtonRight(parentContainer);
  el.addEventListener('mousedown', e => {
    isDrawing = true;
    x = e.offsetX;
  });
  el.addEventListener('mousemove', e => {
    if(isDrawing) {
      swiping(x, e.offsetX,sliderContainer,indicatorContainer,itemSlider,buttonLeft,buttonRight);
      isDrawing = false;
    }
  });
  el.addEventListener('mouseup', () => {
    isDrawing = false;
  });
});

sliderJournal.forEach ( (el,index) => {
  const parentContainer = getParentContainer(el);
  const sliderContainer = prepareSliderContainer(parentContainer);
  el.addEventListener('click', () => {
    checkWidthElement() > 767 ? false : actionMobileSlider(sliderContainer,defaultTransformMobileStep,index,el);
  });
});


function actionMaterialsButton(element,index) {
  const itemSliderWidth = calculateWidthElement(cardsContainer);
  const newTransform = +itemSliderWidth * index;
  const itemSlider = getItemSliderAll(cardsContainer);
  const checkMaxTransform = itemSlider.length * itemSliderWidth - itemSliderWidth;
  if(newTransform > checkMaxTransform) {
    return false;
  }
  setTransformValue(cardsContainer, newTransform);

}

function setButtonInactive(element) {
  element.classList.remove('button_current');
}

function setButtonActive(element) {
  element.classList.add('button_current');
}

function checkButtonActive(element) {
  return element.classList.contains('button_current');
}

buttonsMaterials.forEach( (el,index) => {
  el.addEventListener('click', evt => {
    const button = evt.target;
    const activeButton = buttonsContainerMaterials.querySelector('.button_current');
    if(checkButtonActive(button)) {
      return false;
    }
    setButtonInactive(activeButton);
    setButtonActive(button);
    actionMaterialsButton(evt.target,index);
  });
})
