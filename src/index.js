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
    scrollSmooth();
    makeIncriment();
    btnHidden();
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}
function btnHidden() {
  if (makeApi.lengOfValue < 40) {
    btnLoadMore.classList.add('is-hidden');
    return;
  } else if (makeApi.page == 13) {
    btnLoadMore.classList.add('is-hidden');
  }
  btnLoadMore.classList.remove('is-hidden');
}
function noticeDeclaretion(value) {
  if (value.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      { timeout: 3000 }
    );
  } else if (value.hits.length > 0 && makeApi.page == 1) {
    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`, {
      timeout: 2000,
    });
  } else if (makeApi.lengOfValue < 40) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      { timeout: 3000 }
    );
    btnForm.removeAttribute('disabled');
  }
}

function markup(response) {
  gallery.insertAdjacentHTML('beforeend', dataCardTemp(response));
  lightbox.refresh();
}
function makeIncriment() {
  makeApi.page += 1;
}

function cleanImg() {
  gallery.innerHTML = '';
  btnLoadMore.classList.add('is-hidden');
}
function scrollSmooth() {
  let hScreen = wrapDiv.firstElementChild.getBoundingClientRect();
  const { height: cardHeight } = hScreen;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
