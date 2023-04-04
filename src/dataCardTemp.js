export const dataCardTemp = response => {
  return response.hits
    .map(el => {
      return `<a class="gallery__item" href=${el.webformatURL} ">
        <div class="photo-card">
        <img src="${
          el.webformatURL
        }" alt="photo" width="${(el.webformatWidth = 300)}" loading="lazy" />
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
        </a>`;
    })
    .join('');
};
