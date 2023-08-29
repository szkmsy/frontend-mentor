const sliderList = document.querySelector(".slider__list");
const sliderItem = document.querySelector(".slider__item");
const sliderItemCount = document.querySelectorAll(".slider__item").length;

const [topSliderNo, bottomSliderNo] = [1, sliderItemCount];
let sliderNo = topSliderNo;

const getSlideMoveWidth = () => {
  const gap = window
    .getComputedStyle(sliderList)
    .getPropertyValue("--list-item-gap");
  const itemWidth = sliderItem.clientWidth;

  return `calc(${itemWidth}px - ${gap})`;
};

const moveSlider = () => {
  const moveCount = sliderNo - 1;
  const moveWidth = getSlideMoveWidth();
  sliderList.style.transform = `translateX(calc(-1 * ${moveCount} * ${moveWidth}))`;
};

const sliderPrevButton = document.querySelector(".slider__button--prev");

sliderPrevButton.addEventListener("click", () => {
  const prevSliderNo = sliderNo - 1;
  sliderNo = prevSliderNo < topSliderNo ? bottomSliderNo : prevSliderNo;
  moveSlider();
});

const sliderNextButton = document.querySelector(".slider__button--next");

sliderNextButton.addEventListener("click", () => {
  const nextSliderNo = sliderNo + 1;
  sliderNo = nextSliderNo > bottomSliderNo ? topSliderNo : nextSliderNo;
  moveSlider();
});
