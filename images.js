// Import fetched data
import {getData} from './data.js';

// Arrays with all images and alternative texts
const IMAGES = [];
const ALTS = [];
const GALLERY_SIZE = 240;

// Wait for 'window' to load before running the rest of the script
addEventListener('load', main);

async function main() {
    removeEventListener('load', main);  // 'window' loaded, no need to listen for it.

    createGallery(GALLERY_SIZE);

    await getData().then((data) => {
        createImageFromUrl(data);
    });


    fillGallery();
}

// Push image URL:s to IMAGES according to Flickr's Photo Source URLS.
function createImageFromUrl(data) {
    //console.log(data)
    let photos = data.photos.photo;
    for (let i = 0; i < photos.length; ++i) {
        IMAGES.push(`https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`);
        ALTS.push(photos[i].title);
    }
}

// Create gallery template with loading images.
function createGallery(numberOfImages) {

    var gallery = document.getElementById("gallery");

    for(let i = 0; i < numberOfImages; ++i) {
        var image = new Image();
        image.classList.add("loading-img");
        image.src = "images/loader_ripple.gif";
        image.alt = "The image is either loading or cannot be found."
        gallery.appendChild(image);
    }
}

// Replace loading icons with images when fully loaded.
function fillGallery() {

    var galleryImgs = document.images;  // Get all <img>-tags on page.
    for(let i = 0; i < GALLERY_SIZE; i++)
    {
        // Create a new image that will be used to load the correct src.
        var loadingImage = new Image();
        loadingImage.onload = function() {  // Only when image is fully loaded, the loading gif will be replaced.
            galleryImgs[i].classList.replace("loading-img", "gallery-img");
            galleryImgs[i].src = this.src;        
            galleryImgs[i].alt = ALTS[i];
        };
        if(i == 2)
            loadingImage.src ="afosihasof";
        else
            loadingImage.src = IMAGES[i];
        
        loadingImage.onerror = function() { // If the image could not be found (broken link etc.) use local error image.
            
            galleryImgs[i].alt="Failed to load image.";
            galleryImgs[i].src="images/error.png";
        };
    }
}
