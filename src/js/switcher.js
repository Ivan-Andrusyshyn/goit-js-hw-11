const nightInputCheck = document.querySelector('[type="checkbox"]');
const formGallery = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('[is-hidden]');
const body = document.querySelector('body');

let intervalID;
nightInputCheck.addEventListener('click', e => {
  const checkbox = e.target.checked;
  if (checkbox === true) {
    intervalID = setInterval(() => {
      makeStyle();
    }, 1000);
  } else {
    stopChangeColorOnClick();
  }
});
function makeStyle() {
  let style = getRandomHexColor();
  formGallery.firstElementChild.style.borderColor = `${style}`;
  formGallery.firstElementChild.style.opacity = '0.5';
  btnLoadMore.style.backgroundColor = `${style}`;
  body.style.backgroundColor = `${style}`;
  if (screen.availWidth > 500) {
    formGallery.lastElementChild.style.backgroundColor = `${style}`;
  }
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function stopChangeColorOnClick(e) {
  clearInterval(intervalID);
}
console.log();
