const sliderContainer = document.querySelector('.slider__items');
const itemSliderWidth = document.querySelector('.item_slider').offsetWidth;
const itemSlider = document.querySelectorAll('.item_slider');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const sliderIndicators = document.querySelector('.slider__indicators');
const sliderIndicator = document.querySelector('.slider__indicator');
const defaultTransform = 30;
const defautlTransformIndicator = 15;
let y = 0;
let x = 0;
let isDrawing = false;

function swiping(xOne, xTwo) {
  const valueTransform = getTransformValue(sliderIndicator);
  if(xOne < xTwo) {
    actionButtonRight();
    swipingRight(+valueTransform + defautlTransformIndicator);
    return;
  }
  actionButtonLeft();
  swipingLeft(+valueTransform - defautlTransformIndicator);
}

function swipingLeft(value) {
  value >= 0 ? setTransformValueIndicator(value) : false;
}

function swipingRight(value) {
  const maxTransformValue = itemSlider.length * defautlTransformIndicator - defautlTransformIndicator;
  if(getTransformValue(sliderIndicator) < maxTransformValue) {
    setTransformValueIndicator(value);
  }
}

function disableButtonLeft () {
  const valueTransform = getTransformValue(sliderContainer);
  if (valueTransform > 0) {
    arrowLeft.disabled = false;
    return;
  }
  arrowLeft.disabled = true;
}

function disableButtonRight(value) {
  const maxTransform = itemSlider.length * itemSliderWidth - itemSliderWidth;
  if(value >= maxTransform) {
    arrowRight.disabled = true;
    return;
  }
  arrowRight.disabled = false;
}

function getTransformValue(container) {
  return container.style.transform.replace(/[^\d.]/g, '');
}

function setTransformValue(container, value) {
  container.style.transform = `translateX(-${value}px)`;
}

function setTransformValueIndicator(value) {
  sliderIndicator.style.transform = `translateX(${value}px)`;
}

function actionButtonLeft() {
  const valueTransform = getTransformValue(sliderContainer);
  const valueTransformIndicator = getTransformValue(sliderIndicator);
  if(valueTransform >= defaultTransform) {
    setTransformValue(sliderContainer, +valueTransform - +itemSliderWidth);
    swipingLeft(+valueTransformIndicator - defautlTransformIndicator);
    disableButtonRight(+valueTransform - +defaultTransform);
    disableButtonLeft();
    return;
  }
  setTransformValue(sliderContainer, '');
  swipingLeft(+valueTransformIndicator - defautlTransformIndicator);
  disableButtonLeft();
}

function actionButtonRight() {
  const valueTransform = getTransformValue(sliderContainer);
  const valueTransformIndicator = getTransformValue(sliderIndicator);
  const newTransform = +valueTransform + +itemSliderWidth;
  const checkMaxTransform = itemSlider.length * itemSliderWidth - itemSliderWidth;
  if(newTransform > checkMaxTransform) {
    return false;
  }
  if(valueTransform >= itemSliderWidth) {
    swipingRight(+valueTransformIndicator + defautlTransformIndicator);
    setTransformValue(sliderContainer, newTransform);
    disableButtonRight(newTransform);
    return;
  }
  swipingRight(+valueTransformIndicator + defautlTransformIndicator);
  setTransformValue(sliderContainer, itemSliderWidth);
  disableButtonLeft();
}

arrowLeft.addEventListener('click', () => {
  actionButtonLeft();
});

arrowRight.addEventListener('click', () => {
  actionButtonRight();
});

sliderIndicator.addEventListener('mousedown', e => {
  isDrawing = true;
  x = e.offsetX;
});

sliderIndicator.addEventListener('mousemove', e => {
    if(isDrawing) {
      swiping(x, e.offsetX);
      isDrawing = false;
    }
});

sliderIndicator.addEventListener('mouseup', () => {
  isDrawing = false;
});

disableButtonLeft();
