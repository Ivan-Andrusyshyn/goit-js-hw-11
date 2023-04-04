export const dataCardTemp = response => {
  return response.hits
    .map(el => {
      return `
        <div class="photo-card">
        <div class="thumb">
      <a class="gallery__item" href="${el.webformatURL}">       
          <img src="${el.largeImageURL}"alt="${el.tags}"  loading="lazy" />
      </a>
          </div>
          <div class="info">
          <p class="info-item">
            <b>Likes</b>${el.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${el.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${el.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${el.downloads}
          </p>
        </div>
      </div>
      `;
    })
    .join('');
};
