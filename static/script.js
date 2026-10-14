const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const resultText = document.getElementById("resultText");
const predictButton = document.getElementById("predictButton");
const previewBox = document.getElementById("previewBox");

const uploadBox = document.querySelector(".upload-box");
uploadBox.addEventListener("click", () => imageInput.click());

// Show image preview
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewBox.style.display = "block";
    };
    reader.readAsDataURL(file);
    resultText.textContent = "";
  }
});

// Handle Predict Button
predictButton.addEventListener("click", () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  resultText.textContent = "🔍 Analyzing...";
  const formData = new FormData();
  formData.append("file", file);

  fetch("/predict", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.disease) {
        resultText.textContent = "🩺 Result: " + data.disease.replace(/___/g, " ");
      } else {
        resultText.textContent = "⚠️ Error: " + data.error;
      }
    })
    .catch((err) => {
      console.error(err);
      resultText.textContent = "❌ Something went wrong. Try again!";
    });
});

// Modal functions
function openHistory() {
  document.getElementById('historyModal').style.display = 'flex';
}

function closeHistory() {
  document.getElementById('historyModal').style.display = 'none';
}
