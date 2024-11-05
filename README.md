# Documentation of "Simple Carousel Project" #
Detailed how-to-use instructions and code explanation.

## How to use: ##

### 1-HTML ###

Open the Html document.
Find the #slides div (#header > #carousel > #slides).
Set up as many img as you need inside this div.

### 2-CSS ###

Open the CSS document.
In :root you can find some variables you can edit:

    --navbar-height: How tall your NavBar is (vh or px);
    --header-height: How tall your *Carousel* is at its full state (vh);

    --slide-transition-duration: How long it takes to transition from one slide to another;

    --current-slide-shower-bar-color: Bar color behind the dots (useful when slideShowerOffset is positive);

    --current-slide-shower-gap: The gap you have between the current slide shower dots (px);
    --current-slide-shower-alignment: Vertical alignment of the dots;

    --slide-indicator-color: Base color of the dots;
    --slide-indicator-width: Width of an inactive dot (px);
    --slide-indicator-height: Height of an inactive dot (px);
    --slide-indicator-border-radius: Radius of dots (px);
    --slide-indicator-transition-duration: How long it takes to transition from one active dot to another;

    --slide-indicator-hover-color: Hover color of the dots;
    --slide-indicator-hover-height: Height of dots when hovered;

### 3-JS ###

Open the JS document.
Inside you can find some variables you can edit:
    
    minCarouselHeight = Minimum heigh of the carousel (%)
        (will not go bellow twice as big as your main title's height);
    
    autoSlide = How long till the slides change themselves without action (ms)
        (0 to disable);
    
    currentSlideShowerOffset = Negative values: Inside carousel/ Positive values: Outside carousel;

## Code explanation: ##

Explanation of the variables : See "How to use: > 3-JS"

Gets the following variables from the DOM:
    - The carousel;
    - The main title and it's height in px to an int; 
    - The sub title;
    - The carousel height in VH (height in px / viewport height * 100) to an int;
    - The navBar height in px to an int.

Offsets the carousel below the navBar: 
    - If navBar height set in px: navBar height + px;
    - If navBar height set in vh: 
        Each time screen is resized: get new navBar height in px, then navBar height + px.

(There is no if statements so it will do both but it won't actually change anything since there is nothing to change).

### Carousel slide mechanic ###

Gets images from the DOM and puts them inside an array (slides);
Creates a new array (slidesUrl) of all the urls inside "slides".

The carouselCurrentSlideID variable stores the current id of the slide currently shown to the user; It will be used to know where we are in slidesUrl array.

Creates inside "currentSlideShower" as many "dots" (slideIndicators) as there are slides with a loop. Then groups them in an array: "slideIndicator".

Gives currentSlideShower a size relative to :
    Width of inactive indicator * (number of slides + 1) + gaps * number of indicators;
Which basically makes flex-grow work : active dots can take around *2 their size.

Checks if the currentSlideShower's offset is set to negative or positive :
    - Negative : Offsets it inside the carousel by giving it a negative marginTop relative to its height * offset value;
    - Positive : Offsets it outside the carousel by giving it a positive paddingTop and paddingBottom relative to its height * offset value; Then offsets the main content to be below currentSlideShower.

Calls:
    - showCurrentSlideID();
    - changeSlide();
    - autoSlideBehavior() if autoSlide is enabled (> 0).

When clicking on the carousel:
Calls:
    - slideIDChange();
    - changeSlide();
    - autoSlideBehavior() if autoSlide is enabled.

When clicking on a indicator: Sets carouselCurrentSlideID to the index of the indicator clicked; Then calls:
    - changeSlide();
    - autoSlideBehavior() if autoSlide is enabled.

Explanation of the functions:

slideIDChange():
Increments carouselCurrentSlideID or sets it back to 0 when it's greater than the number of slides.

showCurrentSlideID():
Reset flex-grow of each indicators; Then grows the indicator corresponding to the current slide ID.

changeSlide():
Changes the carousel background img to the corresponding url (carouselCurrentSlideID) from the slidesUrl array; Then calls showCurrentSlideID().

If autoSlide is enabled :

    autoSlideBehavior():
    Set an interval of the value of autoSlide; Then calls slideIDChange() and changeSlide().

    autoSlideBehaviorClear():
    Clears the interval of autoSlideBehavior(); Then resets it after "autoSlide" ms.


### Carousel shrinking mechanic ###

Defines a shrink speed relative to the carousel's and navBar's heights;
To be honest I just tested a bunch of values and noticed that the only one that would gave a pleasant value would result from this calculation; I don't know why this works but it works.

Having a navBar > 100px would break it so I just applied carouselVH / 10 in that case; It's good enough I guess.

On each scroll:
    - Defines the new carousel height by subtracting its base height to the scrollY value of the window divided by the shrink speed (lets the carousel look like its shrinking before making the main content scroll);
    
    - Checks if the new carousel height is greater than its minimum height:
      - True: applies the new carousel height;
      - False: applies the minimum carousel height;

    - Then checks if the current carousel height is less than twice the main title's height:
      - True: sets the new carousel height to be twice the height of main title; Then hides the sub title and puts currentSlideShower on the left;
      - False: sets it back to default.
(This is to prevent carousel from shrinking too much when scrolling or zooming in)


## To do : ##
- Make slide-indicator's values work with vw;
- Cap currentSlideShower width if too many slides;
- Higher customizability!"# Simple-Carousel-Project" 
"# Simple-Carousel-Project" 
