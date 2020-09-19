var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role = "trigger"]';
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;

}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
        alterCount(thumb);
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 500);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        //console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}


function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}


// Arrays to cycle through images, initialized with the 5 given values
var otterImages = ["img/otter1.jpg", "img/otter2.jpg", "img/otter3.jpg", "img/otter4.jpg", "img/otter5.jpg"];
var otterText = ["Stayin' Alive", "How Deep Is Your Love", "You Should Be Dancing", "Night Fever", "To Love Somebody"];
var counter = 0; // determines current position of Array (0-4 correspond to images 1-5)




function prevButton() {
    if (counter > 0) {
        counter--;
        document.getElementById("text").innerHTML = otterText[counter];
        document.getElementById("image").src = otterImages[counter];
    }

}

function nextButton() {
    if (counter < 4) {
        counter++;
        document.getElementById("text").innerHTML = otterText[counter];
        document.getElementById("image").src = otterImages[counter];
    }
}

function alterCount(thumb) // changes the counter to correspond to the buttons
// If an image is clicked on (called in addthumbclickHandler Function)
{
    if (imageFromThumb(thumb) === "img/otter1.jpg") {
        counter = 0;
    } else if (imageFromThumb(thumb) === "img/otter2.jpg") {
        counter = 1;
    } else if (imageFromThumb(thumb) === "img/otter3.jpg") {
        counter = 2;
    } else if (imageFromThumb(thumb) === "img/otter4.jpg") {
        counter = 3;
    } else if (imageFromThumb(thumb) === "img/otter5.jpg") {
        counter = 4;
    }

}

initializeEvents();
