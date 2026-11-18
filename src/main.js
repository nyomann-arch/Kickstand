const PIP_CSS = `
:root {
  --pip-bg: #171A20;
  --pip-image-padding: 10px;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: var(--pip-bg);
}

.pip-stage {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--pip-image-padding);
}

.pip-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}
`;

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MiB provisional limit

const PIP_MAX_WIDTH = 640;
const PIP_MAX_HEIGHT = 480;

const fileInput = document.getElementById('fileInput');
const chooseButton = document.getElementById('chooseButton');
const replaceButton = document.getElementById('replaceButton');
const removeButton = document.getElementById('removeButton');
const popoutButton = document.getElementById('popoutButton');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const statusMessage = document.getElementById('statusMessage');

const isPiPSupported = 'documentPictureInPicture' in window;

let currentBlobUrl = null;
let pipWindow = null;
let pipImageElement = null;
let isOpeningPiP = false;

function setStatus(message) {
  statusMessage.textContent = message;
}

function isPiPOpen() {
  return pipWindow !== null;
}

function updateControls() {
  const hasImage = currentBlobUrl !== null;
  const popOutBlocked =
    !isPiPSupported || isOpeningPiP || isPiPOpen() || !hasImage;
  popoutButton.disabled = popOutBlocked;

  if (!isPiPSupported) {
    setStatus('This browser does not support Document Picture-in-Picture. Preview only.');
  } else if (isPiPOpen()) {
    setStatus('Floating window is open. Keep this tab open.');
  }
}

function computePipSize() {
  const w = previewImage.naturalWidth || PIP_MAX_WIDTH;
  const h = previewImage.naturalHeight || PIP_MAX_HEIGHT;
  const scale = Math.min(PIP_MAX_WIDTH / w, PIP_MAX_HEIGHT / h, 1);
  return {
    width: Math.max(1, Math.round(w * scale)),
    height: Math.max(1, Math.round(h * scale)),
  };
}

function revokeAfterSwitch(oldUrl) {
  if (!oldUrl) return;
  const done = () => URL.revokeObjectURL(oldUrl);
  previewImage.addEventListener('load', done, { once: true });
  previewImage.addEventListener('error', done, { once: true });
}

function handleFile(file) {
  if (!file) return;

  if (!ALLOWED_TYPES.has(file.type)) {
    setStatus('This image type is not supported. Use PNG, JPG, or WebP.');
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    setStatus('This image is too large. The maximum size is 20 MB.');
    return;
  }

  const newUrl = URL.createObjectURL(file);
  const oldUrl = currentBlobUrl;

  currentBlobUrl = newUrl;
  previewSection.hidden = false;
  previewImage.src = newUrl;
  previewImage.alt = file.name || 'Image preview';

  if (pipImageElement && pipWindow) {
    pipImageElement.src = newUrl;
    pipImageElement.alt = previewImage.alt;
  }

  revokeAfterSwitch(oldUrl);
  setStatus('Image ready to float.');
  updateControls();
}

function clearImage() {
  const oldUrl = currentBlobUrl;
  currentBlobUrl = null;
  previewImage.removeAttribute('src');
  previewImage.alt = 'Image preview';
  previewSection.hidden = true;

  if (pipImageElement) {
    pipImageElement.removeAttribute('src');
  }

  if (oldUrl) URL.revokeObjectURL(oldUrl);
  setStatus('Paste or choose an image to get started.');
  updateControls();
}

document.addEventListener('paste', (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        event.preventDefault();
        handleFile(file);
        return;
      }
    }
  }
});

fileInput.addEventListener('change', () => {
  handleFile(fileInput.files?.[0]);
  fileInput.value = '';
});

chooseButton.addEventListener('click', () => fileInput.click());
replaceButton.addEventListener('click', () => fileInput.click());
removeButton.addEventListener('click', clearImage);

previewImage.addEventListener('error', () => {
  if (currentBlobUrl) {
    setStatus('The image could not be loaded. Try another file.');
  }
});

async function openPiP() {
  if (!isPiPSupported || isOpeningPiP || isPiPOpen() || !currentBlobUrl) {
    console.log('openPiP blocked:', { isPiPSupported, isOpeningPiP, isPiPOpen, hasBlob: !!currentBlobUrl });
    return;
  }

  isOpeningPiP = true;
  popoutButton.disabled = true;

  try {
    const { width, height } = computePipSize();
    const pipWin = await window.documentPictureInPicture.requestWindow({ width, height });
    pipWindow = pipWin;
    const pipDoc = pipWin.document;

    const style = pipDoc.createElement('style');
    style.textContent = PIP_CSS;
    pipDoc.head.appendChild(style);

    const stage = pipDoc.createElement('div');
    stage.className = 'pip-stage';

    const img = pipDoc.createElement('img');
    img.className = 'pip-image';
    img.src = currentBlobUrl;
    img.alt = previewImage.alt || 'Floating image preview';

    stage.appendChild(img);
    pipDoc.body.appendChild(stage);

    pipImageElement = img;

    pipWin.addEventListener('pagehide', () => {
      pipWindow = null;
      pipImageElement = null;
      isOpeningPiP = false;
      setStatus('Floating window closed. Your image is still here.');
      updateControls();
    });

    setStatus('Floating window is open. Keep this tab open.');
  } catch (error) {
    console.error('Document PiP request failed:', error);
    pipWindow = null;
    pipImageElement = null;
    setStatus('Could not open the floating window. Try again.');
  } finally {
    isOpeningPiP = false;
    updateControls();
  }
}

popoutButton.addEventListener('click', () => {
  openPiP();
});

updateControls();