const nightInputCheck = document.querySelector('[type="checkbox"]');
let intervalID;
const btnForm = document.querySelector('.search-btn');
const btnLoadMore = document.querySelector('[is-hidden]');
const styleChangebtn = document.querySelectorAll('.btn');
const inputChangeStyle = document.querySelector('input');
const body = document.querySelector('body');

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
  inputChangeStyle.style.borderColor = `${getRandomHexColor()}`;
  inputChangeStyle.style.opacity = '0.5';
  btnLoadMore.style.backgroundColor = `${getRandomHexColor()}`;
  body.style.backgroundColor = `${getRandomHexColor()}`;
  btnForm.style.backgroundColor = `${getRandomHexColor()}`;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function stopChangeColorOnClick(e) {
  clearInterval(intervalID);
}
