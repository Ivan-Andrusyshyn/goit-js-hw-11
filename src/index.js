import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/fetchFood';
import { dataCardTemp } from './js/dataCardTemp';

console.log(SimpleLightbox);

const gallery = document.querySelector('.gallery');
const formGallery = document.querySelector('.search-form');
const btnForm = document.querySelector('[type="submit"]');
const wrapDiv = document.querySelector('.wrapp');
const btn = document.createElement('button');
const lightbox = new SimpleLightbox('.gallery a', {});

btnForm.setAttribute('disabled', 'disabled');
formGallery.addEventListener('submit', newPhotoOnSubmit);
btn.addEventListener('click', createOnClick);

const makeApi = new NewApiService();
disableBtn(btnForm, formGallery);

function newPhotoOnSubmit(e) {
  e.preventDefault();
  let inputForm = e.currentTarget.elements.searchQuery.value.trim();
  makeApi.page = 1;
  makeApi.query = inputForm;
  if (inputForm === '') return;
  makeImgOnSubm();
  cleanImg();
}
function createOnClick() {
  makeImgOnClick();
}
async function makeImgOnSubm() {
  try {
    const { data } = await makeApi.makeFetch();
    makeApi.lengOfValue = data.hits.length;
    makeApi.dataSaver = data;
    noticeDeclaretion(data);
    markup(data);
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}
async function makeImgOnClick() {
  makeApi.page += 1;
  try {
    const { data } = await makeApi.makeFetch();
    newNotice(data);
    markup(data);
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}

function noticeDeclaretion(value) {
  if (value.hits.length == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`);
  }
}

function newNotice(value) {
  if (value.hits.length < 40) {
    btn.remove();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  btnForm.removeAttribute('disabled');
}

btnForm.setAttribute('disabled', 'disabled');
function disableBtn(btnForm, formGallery) {
  let input = formGallery.firstElementChild;
  input.addEventListener('input', e => {
    const target = e.target.value;
    cleanImg();
    if (target == '') {
      cleanImg();
    } else {
      btnForm.removeAttribute('disabled');
    }
  });
}

function markup(response) {
  if (response.hits.length == 0) {
    btn.remove();
  } else {
    makeNewBtn();
    lightbox.refresh();
    gallery.insertAdjacentHTML('beforeend', dataCardTemp(response));
  }
}

function makeNewBtn() {
  btn.classList.add('load-more');
  btn.classList.add('btn');
  btn.classList.add('btn-15');
  btn.textContent = 'Load more';
  wrapDiv.append(btn);
}

function cleanImg() {
  gallery.innerHTML = '';
  btn.remove();
  btnForm.setAttribute('disabled', 'disabled');
}

let g = wrapDiv.firstElementChild.getBoundingClientRect();
const { height: cardHeight } = g;
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
