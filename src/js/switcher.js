const nightInputCheck = document.querySelector('[type="checkbox"]');
let intervalID;
const styleChangebtn = document.querySelectorAll('.btn');
const inputChangeStyle = document.querySelector('input');
nightInputCheck.addEventListener('click', e => {
  const checkbox = e.target.checked;

  if (checkbox === true) {
    intervalID = setInterval(() => {
      const body = document.querySelector('body');
      inputChangeStyle.style.borderColor = `${getRandomHexColor()}`;
     inputChangeStyle.style.opacity = '0.5'
      body.style.backgroundColor = `${getRandomHexColor()}`;

      styleChangebtn.forEach(el => {
        return (el.style.backgroundColor = `${getRandomHexColor()}`);
      });
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
