import galleryItems from './gallery-items.js';

// Variables

const galleryContainer = document.querySelector('.js-gallery');

const imageMarkup = createGalleryImages(galleryItems);

const lightboxEl = document.querySelector('.lightbox');

const lightboxImage = document.querySelector('.lightbox__image');

const lightBoxOverlay = document.querySelector('.lightbox__overlay');

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

let imgIndex = 0;

galleryContainer.insertAdjacentHTML('beforeend', imageMarkup);

// Create Gallery

function createGalleryImages(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, idx) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${idx}"
      alt="${description}"
    />
  </a>
</li>
    </ul> `;
    })
    .join('');
}

// Open Modal

const onOpenModal = evt => {
  evt.preventDefault();

  const isGalleryImageEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }

  imgIndex = Number(evt.target.dataset.index);

  lightboxEl.classList.add('is-open');

  const srcEl = evt.target.dataset.source;
  const altEl = evt.target.alt;

  window.addEventListener('keydown', handleSwipe);
  window.addEventListener('keydown', onEscKeyPress);

  changeAttribute(srcEl, altEl);

  document.body.style.overflow = 'hidden';
};

// Close Modal

const onCloseModal = () => {
  window.removeEventListener('keydown', handleSwipe);
  window.removeEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.remove('is-open');
  changeAttribute('', '');

  document.body.style.overflow = '';
};

// Change Attribute

const changeAttribute = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
};

// On Overlay Click

const onOverlayClick = evt => {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
};

// On Escape Press

const onEscKeyPress = evt => {
  const isEscKey = evt.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
};

// Slider

const increment = () => {
  if (imgIndex === galleryItems.length - 1) return (imgIndex = 0);
  imgIndex++;
};

const decrement = () => {
  if (imgIndex === 0) return (imgIndex = galleryItems.length - 1);
  imgIndex--;
};

const handleSwipe = evt => {
  evt.code === 'ArrowLeft' && decrement();
  evt.code === 'ArrowRight' && increment();
  const { original, description } = galleryItems[imgIndex];
  changeAttribute(original, description);
};

// EventListeners

galleryContainer.addEventListener('click', onOpenModal);
lightBoxOverlay.addEventListener('click', onOverlayClick);
closeModalBtn.addEventListener('click', onCloseModal);
