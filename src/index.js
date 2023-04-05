import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/fetchFood';
import { dataCardTemp } from './js/dataCardTemp';

const gallery = document.querySelector('.gallery');
const formGallery = document.querySelector('.search-form');
const btnForm = document.querySelector('[type="submit"]');
const wrapDiv = document.querySelector('.wrapp');
const btnLoadMore = document.querySelector('[is-hidden]');
const lightbox = new SimpleLightbox('.gallery a', {});

formGallery.addEventListener('submit', newPhotoOnSubmit);
btnLoadMore.addEventListener('click', createOnClick);

btnLoadMore.classList.add('is-hidden');
const makeApi = new NewApiService();

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
  makeImgOnSubm();
}
async function makeImgOnSubm() {
  try {
    const { data } = await makeApi.makeFetch();
    makeApi.lengOfValue = data.hits.length;
    makeApi.dataSaver = data;
    noticeDeclaretion(data);
    markup(data);
    makeIncriment();
    hiddenBtn(data);
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}

function noticeDeclaretion(value) {
  if (value.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (value.hits.length > 0 && makeApi.page == 1) {
    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`);
  } else if (makeApi.lengOfValue < 40) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnForm.removeAttribute('disabled');
  }
}
btnLoadMore.classList.add('is-hidden');

function markup(response) {
  gallery.insertAdjacentHTML('beforeend', dataCardTemp(response));
  lightbox.refresh();
}
function makeIncriment() {
  makeApi.page += 1;
}
function hiddenBtn(value) {
  if (value.hits.length < 40) {
    btnLoadMore.classList.add('is-hidden');
    return;
  }
  btnLoadMore.classList.remove('is-hidden');
}

function cleanImg() {
  gallery.innerHTML = '';
  btnLoadMore.classList.add('is-hidden');
}

let g = wrapDiv.firstElementChild.getBoundingClientRect();
const { height: cardHeight } = g;
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
