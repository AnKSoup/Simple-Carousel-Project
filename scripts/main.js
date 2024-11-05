const carousel = document.getElementById("carousel");
const mainTitle = document.getElementById("mainTitle");
const mainTitleHeight = parseInt(getComputedStyle(mainTitle).height)
const subTitle = document.getElementById("subTitle");
const carouselVH = Math.round(parseInt(getComputedStyle(carousel).height) / document.documentElement.clientHeight * 100);
let navBarHeight = parseInt(getComputedStyle(document.getElementById("navBar")).height);

// - SET JS PROPERTIES HERE -

// Carousel height properties (Between 100% and twice over mainTitle's height):
const carouselBaseHeight = 100; // Don't edit this one but rather the header height in the CSS document. 
const minCarouselHeight = 20;
// Carousel auto slide duration property (ms):
const autoSlide = 5000; //0 to disable it
// Current slide shower offset property :
const currentSlideShowerOffset = -1.5;

// - CODE HERE -

// Offsets carousel below navBar:
const header = document.getElementById('header');
header.style.top = navBarHeight + "px";
// In case of a navBar Height set in vh:
visualViewport.addEventListener("resize", () => {
    let navBarHeight = parseInt(getComputedStyle(document.getElementById("navBar")).height);
    header.style.top = navBarHeight + "px";
})

// - Carousel slide mechanic -

// Finds all <img> within .slides and creates an array of its urls:
const slides = Array.from(document.getElementById("slides").children);
const slidesUrl = new Array;

slides.forEach(element => {
    slidesUrl.push(element.getAttribute("src"));
});

// Stores the current slide ID:
let carouselCurrentSlideID = 0

// Creates slideIndicators inside #currentSlideShower: 
const currentSlideShower = document.getElementById("currentSlideShower");

for (let i = 0; i < slidesUrl.length; i++) {
    const slideIndicator = document.createElement("div");
    slideIndicator.classList.add("slideIndicator");
    currentSlideShower.appendChild(slideIndicator);
}

// Creates an array of those slideIndicators:
const slideIndicators = Array.from(currentSlideShower.children);

// Gives currentSlideShower a width based on a slideIndicator's width in px (let flex-grow works):
currentSlideShower.style.width = Math.round(slideIndicators[0].getBoundingClientRect().width) * (slideIndicators.length + 1)
    + parseInt(getComputedStyle(currentSlideShower).gap) * slideIndicators.length + "px";

if (currentSlideShowerOffset < 0) {
    // Offsets currentSlideShower to be inside the carousel:
    currentSlideShower.style.marginTop = Math.round(slideIndicators[0].getBoundingClientRect().height) * currentSlideShowerOffset + "px";

} else if (currentSlideShowerOffset >= 0) {
    // Offsets main content if curent slide shower is outside the carousel: 
    let newOffset = Math.round(slideIndicators[0].getBoundingClientRect().height) * currentSlideShowerOffset

    document.getElementById("currentSlideShowerBar").style.paddingTop = newOffset + "px"
    document.getElementById("currentSlideShowerBar").style.paddingBottom = newOffset + "px"

    document.getElementById("main").style.marginTop = newOffset * 2 + Math.round(slideIndicators[0].getBoundingClientRect().height) * 2 + "px";
}

// Increments current slide ID or sets it to 0 if too high:
function slideIDChange() {
    carouselCurrentSlideID++;
    if (carouselCurrentSlideID > slidesUrl.length - 1) carouselCurrentSlideID = 0;
}

// Indicates to slideShower the new ID to "grow":
function showCurrentSlideID() {
    slideIndicators.forEach(element => {
        element.style.flexGrow = "0"
    });
    slideIndicators[carouselCurrentSlideID].style.flexGrow = "1";
}
showCurrentSlideID();

// Changes the url relative to the corresponding slide ID:
function changeSlide() {
    carousel.style.backgroundImage = `url(${slidesUrl[carouselCurrentSlideID]})`;
    showCurrentSlideID();
};
changeSlide();

if (autoSlide > 0) {
    // Creates an auto scroll behavior that can be temporarily disabled:
    function autoSlideBehavior() {
        autoSlideBehaviorInterval = setInterval(() => {
            slideIDChange();
            changeSlide();
        }, autoSlide);
    }
    autoSlideBehavior();

    function autoSlideBehaviorClear() {
        clearInterval(autoSlideBehaviorInterval);
        setTimeout(autoSlideBehavior(), autoSlide);
    }
}

// Changes the url background  to the next slide when clicking on the carousel:
carousel.addEventListener("click", () => {
    slideIDChange();
    changeSlide();
    if (autoSlide > 0) autoSlideBehaviorClear();
});

// Changes the url background according to the ID of the slideIndicator clicked:
slideIndicators.forEach((element, index) => {
    element.addEventListener("click", () => {
        carouselCurrentSlideID = index;
        changeSlide();
        if (autoSlide > 0) autoSlideBehaviorClear();
    })
});

// - Carousel shrinking mechanic -

// Shrink speed of the carousel relative to : carousel vh/10 - navBar px/100 unless navBar is greater than 100px :
let shrinkSpeed = carouselVH / 10 - navBarHeight / 100;
if (navBarHeight > 100) {
    shrinkSpeed = carouselVH / 10
}

// Each scroll calculates a new size relative to scrollY or sets it to min if newCarouselHeight is too low:
// If carousel height drops below #subTitle's height or twice over mainTitle's height:
// Hides subTitle, offsets currentSlideShower to the left and stops shrinking
window.onscroll = () => {
    let newCarouselHeight = carouselBaseHeight - window.scrollY / shrinkSpeed;

    if (newCarouselHeight >= minCarouselHeight) {
        carousel.style.height = newCarouselHeight + "%"
    } else {
        carousel.style.height = minCarouselHeight + "%"
    }

    if (parseInt(getComputedStyle(carousel).height) <= mainTitleHeight * 2) {
        carousel.style.height = mainTitleHeight * 2 + "px"
        subTitle.style.display = "none";
        currentSlideShower.style.marginInline = "1em";
    } else {
        subTitle.style.display = "block";
        currentSlideShower.style.marginInline = "auto";
    }
};