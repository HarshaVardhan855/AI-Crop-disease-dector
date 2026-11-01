function openHistory() {
  const modal = document.getElementById('historyModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeHistory() {
  const modal = document.getElementById('historyModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function openCamera() {
  const fileInput = document.querySelector('input[type="file"]');
  if (!fileInput) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Camera access is not supported in this browser.');
    return;
  }

  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const captureBtn = document.createElement('button');

  captureBtn.textContent = 'Capture';
  captureBtn.type = 'button';
  captureBtn.style.background = '#00C853';
  captureBtn.style.color = '#ffffff';
  captureBtn.style.border = 'none';
  captureBtn.style.padding = '10px 20px';
  captureBtn.style.borderRadius = '10px';
  captureBtn.style.cursor = 'pointer';
  captureBtn.style.marginTop = '12px';

  const container = document.querySelector('.container');
  if (!container) return;

  const existingVideo = container.querySelector('video');
  if (existingVideo) {
    existingVideo.remove();
  }

  const existingButton = container.querySelector('button[type="button"][style*="background: rgb(0, 200, 83)"]');
  if (existingButton) {
    existingButton.remove();
  }

  container.appendChild(video);
  container.appendChild(captureBtn);

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch(() => {
      alert('Camera access denied or not available.');
      video.remove();
      captureBtn.remove();
    });

  captureBtn.onclick = () => {
    if (!video.videoWidth || !video.videoHeight) {
      alert('Unable to capture the image yet. Please try again.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;

      if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }

      video.remove();
      captureBtn.remove();
    }, 'image/jpeg');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const historyBtn = document.querySelector('.history-btn');
  if (historyBtn) {
    historyBtn.addEventListener('click', openHistory);
  }

  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeHistory);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeHistory();
    }
  });
});
