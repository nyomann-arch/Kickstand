import './styles.css';

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
const dropzone = document.getElementById('dropzoneLabel');
const chooseButton = document.getElementById('chooseButton');
const replaceButton = document.getElementById('replaceButton');
const removeButton = document.getElementById('removeButton');
const popoutButton = document.getElementById('popoutButton');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const statusMessage = document.getElementById('statusMessage');

const isPiPSupported = 'documentPictureInPicture' in window;

let currentBlobUrl = null;
let currentImageWidth = 0;
let currentImageHeight = 0;
let pipWindow = null;
let pipImageElement = null;
let isOpeningPiP = false;
let inputRequestId = 0;
let suppressPiPClosedStatus = false;

function setStatus(message) {
  statusMessage.textContent = message;
}

function isPiPOpen() {
  return pipWindow !== null;
}

function updateControls() {
  const hasImage = currentBlobUrl !== null;
  const pipActive = isPiPOpen();
  const canPopOut = hasImage && isPiPSupported && !isOpeningPiP && !pipActive;

  popoutButton.disabled = !canPopOut;
  if (isOpeningPiP) {
    popoutButton.textContent = 'Opening…';
  } else if (pipActive) {
    popoutButton.textContent = 'PiP active';
  } else {
    popoutButton.textContent = 'Pop Out';
  }

  if (!isPiPSupported) {
    setStatus('This browser does not support Document Picture-in-Picture. Preview only.');
  } else if (pipActive) {
    setStatus('Floating window is open. Keep this tab open.');
  }
}

function computePipSize() {
  const w = currentImageWidth || previewImage.naturalWidth || PIP_MAX_WIDTH;
  const h = currentImageHeight || previewImage.naturalHeight || PIP_MAX_HEIGHT;
  const scale = Math.min(PIP_MAX_WIDTH / w, PIP_MAX_HEIGHT / h, 1);
  return {
    width: Math.max(1, Math.round(w * scale)),
    height: Math.max(1, Math.round(h * scale)),
  };
}

function allowedMimeType(file) {
  const type = file.type?.toLowerCase();
  if (type === 'image/jpg') return 'image/jpeg';
  return ALLOWED_TYPES.has(type) ? type : null;
}

function decodeImage(url) {
  return new Promise((resolve, reject) => {
    const probe = new Image();
    probe.onload = () => {
      if (probe.naturalWidth > 0 && probe.naturalHeight > 0) {
        resolve({ width: probe.naturalWidth, height: probe.naturalHeight });
      } else {
        reject(new Error('Image has no dimensions'));
      }
    };
    probe.onerror = () => reject(new Error('Image could not be decoded'));
    probe.src = url;
  });
}

function revokeAfterSwitch(oldUrl) {
  if (oldUrl) {
    queueMicrotask(() => URL.revokeObjectURL(oldUrl));
  }
}

function ensurePiPDocument(doc) {
  if (!doc.documentElement) return;
  if (!doc.head) {
    const head = doc.createElement('head');
    doc.documentElement.insertBefore(head, doc.documentElement.firstChild);
  }
  if (!doc.body) {
    const body = doc.createElement('body');
    doc.documentElement.appendChild(body);
  }
}

async function handleFile(file) {
  if (!file) return;

  const requestId = ++inputRequestId;

  if (!allowedMimeType(file)) {
    setStatus('This image type is not supported. Use PNG, JPG, or WebP.');
    return;
  }

  if (file.size === 0) {
    setStatus('This file is empty. Choose a valid image.');
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    setStatus('This image is too large. The maximum size is 20 MB.');
    return;
  }

  const newUrl = URL.createObjectURL(file);
  setStatus('Checking image…');

  let dimensions;
  try {
    dimensions = await decodeImage(newUrl);
  } catch {
    URL.revokeObjectURL(newUrl);
    if (requestId === inputRequestId) {
      setStatus('The image could not be loaded. Try another file.');
    }
    return;
  }

  if (requestId !== inputRequestId) {
    URL.revokeObjectURL(newUrl);
    return;
  }

  const oldUrl = currentBlobUrl;
  const alt = file.name || 'Image preview';

  currentBlobUrl = newUrl;
  currentImageWidth = dimensions.width;
  currentImageHeight = dimensions.height;

  previewSection.hidden = false;
  previewImage.src = newUrl;
  previewImage.alt = alt;

  if (pipImageElement) {
    pipImageElement.src = newUrl;
    pipImageElement.alt = alt;
  }

  revokeAfterSwitch(oldUrl);
  setStatus(isPiPOpen() ? 'Floating window is open. Keep this tab open.' : 'Image ready to float.');
  updateControls();
}

function clearImage() {
  const oldUrl = currentBlobUrl;
  currentBlobUrl = null;
  currentImageWidth = 0;
  currentImageHeight = 0;

  previewImage.removeAttribute('src');
  previewImage.alt = 'Image preview';
  previewSection.hidden = true;

  const pipWin = pipWindow;
  const pipImg = pipImageElement;
  if (pipWin) {
    suppressPiPClosedStatus = true;
    pipImg?.removeAttribute('src');
    pipWindow = null;
    pipImageElement = null;
    try {
      pipWin.close();
    } catch (error) {
      suppressPiPClosedStatus = false;
      console.error('Could not close floating window:', error);
    }
  }

  if (oldUrl) URL.revokeObjectURL(oldUrl);
  setStatus('Image removed.');
  updateControls();
}

function hasFiles(event) {
  const types = event.dataTransfer?.types;
  const hasFilesType = types ? Array.prototype.includes.call(types, 'Files') : false;
  return hasFilesType || (event.dataTransfer?.files?.length ?? 0) > 0;
}

function isInsideDropzone(event) {
  return event.relatedTarget instanceof Node && dropzone.contains(event.relatedTarget);
}

function setDragOver(active) {
  dropzone.classList.toggle('is-drag-over', active);
}

document.addEventListener('paste', (event) => {
  const clipboard = event.clipboardData;
  const items = clipboard?.items;

  if (items) {
    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile?.();
        if (file) {
          event.preventDefault();
          handleFile(file);
          return;
        }
      }
    }
  }

  const file = clipboard?.files?.[0];
  if (file) {
    event.preventDefault();
    handleFile(file);
  }
});

fileInput.addEventListener('change', () => {
  handleFile(fileInput.files?.[0]);
  fileInput.value = '';
});

dropzone.addEventListener('dragenter', (event) => {
  if (!hasFiles(event)) return;
  event.preventDefault();
  setDragOver(true);
});

dropzone.addEventListener('dragover', (event) => {
  if (!hasFiles(event)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  setDragOver(true);
});

dropzone.addEventListener('dragleave', (event) => {
  if (!isInsideDropzone(event)) setDragOver(false);
});

dropzone.addEventListener('drop', (event) => {
  if (!hasFiles(event)) return;
  event.preventDefault();
  setDragOver(false);
  handleFile(event.dataTransfer?.files?.[0]);
});

window.addEventListener('dragover', (event) => {
  if (hasFiles(event)) event.preventDefault();
});

window.addEventListener('drop', (event) => {
  if (hasFiles(event)) event.preventDefault();
});

chooseButton.addEventListener('click', () => fileInput.click());
replaceButton.addEventListener('click', () => fileInput.click());
removeButton.addEventListener('click', clearImage);

previewImage.addEventListener('error', () => {
  if (!currentBlobUrl) return;
  clearImage();
  setStatus('The image could not be loaded. Try another file.');
});

async function openPiP() {
  if (!isPiPSupported || isOpeningPiP || isPiPOpen() || !currentBlobUrl) {
    return;
  }

  isOpeningPiP = true;
  updateControls();
  setStatus('Opening floating window…');

  let pipWin;
  try {
    const { width, height } = computePipSize();
    pipWin = await window.documentPictureInPicture.requestWindow({ width, height });
  } catch (error) {
    console.error('Document PiP request failed:', error);
    setStatus('Could not open the floating window. Try again.');
    isOpeningPiP = false;
    updateControls();
    return;
  }

  try {
    if (!currentBlobUrl || pipWin.closed) {
      try {
        pipWin.close();
      } catch (error) {
        console.error('Could not close unused floating window:', error);
      }
      setStatus(currentBlobUrl ? 'Could not open the floating window. Try again.' : 'Image removed.');
      return;
    }

    pipWindow = pipWin;
    const pipDoc = pipWin.document;
    if (!pipDoc) {
      throw new Error('PiP document unavailable');
    }
    ensurePiPDocument(pipDoc);

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
      const suppressStatus = suppressPiPClosedStatus;
      suppressPiPClosedStatus = false;
      pipWindow = null;
      pipImageElement = null;
      updateControls();
      if (!suppressStatus) {
        setStatus(currentBlobUrl ? 'Floating window closed. Your image is still here.' : 'Floating window closed.');
      }
    });

    setStatus('Floating window is open. Keep this tab open.');
  } catch (error) {
    console.error('Document PiP setup failed:', error);
    pipWindow = null;
    pipImageElement = null;
    try {
      pipWin.close();
    } catch (closeError) {
      console.error('Could not close failed floating window:', closeError);
    }
    setStatus('Could not open the floating window. Try again.');
  } finally {
    isOpeningPiP = false;
    updateControls();
  }
}

popoutButton.addEventListener('click', () => {
  openPiP();
});

window.addEventListener('pagehide', (event) => {
  if (!event.persisted && currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }
});

updateControls();
