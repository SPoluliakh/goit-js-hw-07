import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const gallaryWrapEl = document.querySelector('.gallery');

const galleryItemsEl = createGalery(galleryItems);

gallaryWrapEl.innerHTML = galleryItemsEl;

gallaryWrapEl.addEventListener('click', ongallaryElementClick);

function ongallaryElementClick(ev) {
  ev.preventDefault();
  const event = ev.target;
  const click = event.classList.contains('gallery__image');

  if (!click) {
    return;
  }

  const selectedImage = event.dataset.source;

  createSelectedElement(selectedImage);
}

function createGalery(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source=" ${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

function createSelectedElement(item) {
  const instance = basicLightbox.create(
    `
    <img src="${item}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', closeUsingEscape);
      },

      onClose: () => {
        window.removeEventListener('keydown', closeUsingEscape);
      },
    }
  );

  instance.show();

  function closeUsingEscape(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
}
