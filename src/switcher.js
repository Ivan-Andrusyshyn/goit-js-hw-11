const nightInputCheck = document.querySelector('[type="checkbox"]');
let intervalID;

nightInputCheck.addEventListener('click', e => {
  const checkbox = e.target.checked;
  if (checkbox === true) {
    intervalID = setInterval(() => {
      const body = document.querySelector('body');
      body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
  } else {
    stopChangeColorOnClick();
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function stopChangeColorOnClick(e) {
  clearInterval(intervalID);
}
