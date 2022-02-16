//unsplash api
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

const count = 30;
const apiKey = "YYMySw5IRNW6CVOQbRCtoBppkYYs6a_6wvgyg5oL3Mc";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all emages are imageLoaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready=", ready);
  }
}

// helper Function

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos(photos) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("totalImages", totalImages);
  photos.forEach((photo) => {
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listrener ,check when each is finished loading
    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    // console.log(response);
    photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (err) {
    alert("there is some error");
    console.log(err);
  }
}

// check to seee if scrolling near bottom of page, load more photosArray

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
