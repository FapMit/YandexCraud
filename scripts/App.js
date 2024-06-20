let slides = document.querySelectorAll(".players__slide");
let numbers = document.querySelector(".players__count");

let slider = [];

for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i];
  slides[i].remove();
}

let activeSlide = 0;
const slidePlace = document.querySelector(".players__slider");
const widthOffset = document.querySelector(".players__slider").clientWidth;

function initSlider() {
  slidePlace.innerHTML = ``;
  slidePlace.appendChild(slider[activeSlide]);
  if (window.innerWidth > 768) {
    prevSlideGenerate();
  }
  if (window.innerWidth > 500) {
    nextSlideGenerate();
  }
  updateNumbers();
}

const nextSlideGenerate = () => {
  let nextSlide = activeSlide + 1;

  if (nextSlide >= slides.length) nextSlide = 0;

  slidePlace.append(slider[nextSlide]);
};

const prevSlideGenerate = () => {
  let prevSlide = activeSlide - 1;

  if (prevSlide < 0) prevSlide = slides.length - 1;

  slidePlace.prepend(slider[prevSlide]);
};

const nextSlide = () => {
  activeSlide++;
  if (activeSlide >= slides.length) activeSlide = 0;
  document.querySelector(".players__slider .players__slide").remove();
  nextSlideGenerate();

  updateNumbers();
};

const prevSlide = () => {
  activeSlide--;

  if (activeSlide < 0) activeSlide = slides.length - 1;
  document
    .querySelector(".players__slider .players__slide:last-child")
    .remove();
  prevSlideGenerate();
  updateNumbers();
};

const updateNumbers = () => {
  let numSlide = activeSlide;
  if (window.innerWidth > 768) {
    if (numSlide + 3 == slides.length + 1) numSlide = -2;
    if (numSlide + 3 == slides.length + 2) numSlide = -1;
    numbers.innerHTML = `${numSlide + 3} <span>/ ${slides.length}</span>`;
  } else if (window.innerWidth > 500) {
    if (numSlide + 2 == slides.length + 1) numSlide = -1;
    if (numSlide + 2 == slides.length + 2) numSlide = 0;
    numbers.innerHTML = `${numSlide + 2} <span>/ ${slides.length}</span>`;
  } else {
    numbers.innerHTML = `${numSlide + 1} <span>/ ${slides.length}</span>`;
  }
};

initSlider();

document.querySelector(".players__btn-next").addEventListener("click", () => {
  nextSlide();
});
document.querySelector(".players__btn-prev").addEventListener("click", () => {
  prevSlide();
});

setInterval(nextSlide, 4000);

// STAGES SLIDER

let stagesSlides = document.querySelectorAll(".stages__item");
let stagesDots = document.querySelectorAll(".stages__dot");

let stagesStep = 0;

document.querySelector(".stages__btn-next").addEventListener("click", () => {
  stagesDots.forEach((dot) => {
    dot.classList.remove("stages__dot--active");
  });
  stagesSlides.forEach((slide) => {
    slide.style.transform = `translateX(-${
      slide.clientWidth * (stagesStep + 1) + 30 * (stagesStep + 1)
    }px)`;
  });
  if (stagesStep + 1 == 4) {
    document.querySelector(".stages__btn-next").disabled = true;
  }
  if (stagesStep == 0) {
    document.querySelector(".stages__btn-prev").disabled = false;
  }
  stagesStep++;
  stagesDots[stagesStep].classList.add("stages__dot--active");
});

document.querySelector(".stages__btn-prev").addEventListener("click", () => {
  stagesDots.forEach((dot) => {
    dot.classList.remove("stages__dot--active");
  });
  stagesSlides.forEach((slide) => {
    slide.style.transform = `translateX(-${
      slide.clientWidth * (stagesStep - 1) + 30 * (stagesStep - 1)
    }px)`;
  });
  if (stagesStep + 1 == 5) {
    document.querySelector(".stages__btn-next").disabled = false;
  }
  if (stagesStep == 1) {
    document.querySelector(".stages__btn-prev").disabled = true;
  }
  stagesStep--;
  stagesDots[stagesStep].classList.add("stages__dot--active");
});

let resizeObserver = new ResizeObserver(() => {
  initSlider();
  if (window.innerWidth > 600) {
    stagesSlides.forEach((slide) => {
      slide.style.transform = `translateX(0px)`;
    });
    return;
  }
  stagesStep = 0;
  stagesSlides.forEach((slide) => {
    slide.style.transform = `translateX(-${
      slide.clientWidth * stagesStep + 30 * stagesStep
    }px)`;
  });
  stagesDots.forEach((dot) => {
    dot.classList.remove("stages__dot--active");
  });
  stagesDots[stagesStep].classList.add("stages__dot--active");
  document.querySelector(".stages__btn-next").disabled = false;
  document.querySelector(".stages__btn-prev").disabled = true;
});
const body = document.getElementsByTagName("body")[0];
resizeObserver.observe(body);

// SCROLL

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
  });
}

let options = {
  threshold: [0.5],
};
let observe = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");

for (let elm of elements) {
  observe.observe(elm);
}
