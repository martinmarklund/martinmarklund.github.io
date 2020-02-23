// Import 
import {getData} from './data.js';

const IMAGES = [];

// Wait for 'window' to load before running the rest of the script
addEventListener('load', main);

async function main() {
    removeEventListener('load', main);  // 'window' loaded, no need to listen for it.

    await getData().then((data) => {
        createImageFromUrl(data);
    });

    createGallery();

}

// Push image URL:s to IMAGES according to Flickr's Photo Source URLS.
function createImageFromUrl(data) {
    let photos = data.photos.photo;
    for (let i = 0; i < photos.length; ++i) {
        IMAGES.push(`https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`);
    }
}

function createGallery() {

    var gallery = document.getElementById("gallery");

    for(let i = 0; i < IMAGES.length; ++i) {
        var galleryImg = document.createElement("IMG");
        galleryImg.setAttribute("src", IMAGES[i]);
        galleryImg.classList.add("gallery-img");
        gallery.appendChild(galleryImg);
    }
    
}


/*
getData().then((myJson) => {

    

    var photos = myJson.photos.photo;
    for(let i = 0; i < photos.length; ++i) {
        //console.log(photos[i]);
        let url = `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`
        images[i] = url;
    }
});
*/
