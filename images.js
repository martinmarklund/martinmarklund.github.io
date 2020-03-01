// Import fetched data and search function
import {getData} from './data.js';

// Arrays with all images and alternative texts
const IMAGES = [];
const ALTS = [];

const GALLERY_SIZE = 60;
var page = 1;

// Wait for 'window' to load before running the rest of the script
addEventListener('load', main);

var reloadButton = document.getElementById("reload-button");
reloadButton.addEventListener("click", loadNextPage);

function main() {
    removeEventListener('load', main);  // 'window' loaded, no need to listen for it.
    loadNextPage();
}

// Push image URL:s to IMAGES according to Flickr's Photo Source URLS.
function createImageFromUrl(data) {
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
    let start_pos = GALLERY_SIZE * (page-1);    // Indexing variable used to make sure we collect images from the right position of IMAGES.
    for(let i = start_pos; i < start_pos + GALLERY_SIZE; i++)
    {
        // Create a new image that will be used to load the correct src.
        var loadingImage = new Image();
        loadingImage.onload = function() {  // Only when image is fully loaded, the loading gif will be replaced.
            galleryImgs[i].classList.replace("loading-img", "gallery-img");
            galleryImgs[i].src = this.src;        
            galleryImgs[i].alt = ALTS[i];
        };
        loadingImage.src = IMAGES[i];
        
        loadingImage.onerror = function() { // If the image could not be found (broken link etc.) use local error image.
            
            galleryImgs[i].alt="Failed to load image.";
            galleryImgs[i].src="images/error.png";
        };
    }
}

// Loads next page by calling getData with new page number and gallery size.
async function loadNextPage() {
    // Set-up gallery before loading data.
    createGallery(GALLERY_SIZE);

    await getData(page, GALLERY_SIZE).then((data) => {
        createImageFromUrl(data);
    });

    // Now fill gallery with loaded data.
    fillGallery();

    page++;
}

// Infinite scroll effect.
window.addEventListener("scroll", function() {
    // Checks if button for reloading content is visible in viewport, if so load more images.
    if(reloadButton.getBoundingClientRect().top < window.innerHeight) {
        loadNextPage();
    }
});