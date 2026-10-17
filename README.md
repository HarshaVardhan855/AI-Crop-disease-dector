# 🌿 AI Crop Disease Detector

Detects plant leaf diseases from an uploaded photo using a trained convolutional neural network (MobileNetV2 transfer learning). Designed as a simple Flask web app so students and mentors can run it locally or on Colab for learning and demos.

---

## What this is
An end-to-end teaching/demo project that:
- Trains a plant-disease classifier on the PlantVillage dataset (transfer learning with MobileNetV2).
- Serves the trained model in a small Flask web app where users upload leaf images and receive:
  - Predicted disease class
  - Prediction confidence (percentage)
  - Practical cure/suggestion text for the predicted class
- Includes training scripts, a Colab notebook, and a pre-trained model file for immediate use.

Perfect for learners who want to understand image classification pipelines, model deployment with Flask, and simple front-end integration. 🎓✨

---

## Quick demo (run in ~5 minutes)
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the web app:
```bash
python app.py
```

3. Open http://127.0.0.1:5000 in your browser, upload a leaf image, and see the prediction + suggested cure. 🚀

Notes:
- The repo contains a pre-trained model `plant_disease_model.h5` so you can try predictions immediately.
- If you want to retrain, see the Training section below.

---

## Tech stack & notable libs 🧰
- Language: Python 3.x
- Web framework: Flask (simple server + Jinja2 templates)
- ML: TensorFlow / Keras (MobileNetV2 transfer learning)
- Frontend: HTML, CSS, JavaScript (templates/index.html + static/)
- Notable Python libs: tensorflow, numpy, pillow (via Keras image utilities)
- Packaging: requirements.txt lists runtime dependencies

---

## Project structure (top-level)
```
.
├─ app.py                     # Flask web app (prediction + session history)
├─ train.py                   # Local training script (MobileNetV2 transfer learning)
├─ plant_disease_training.ipynb # Full Colab notebook to train on Kaggle dataset
├─ plant_disease_model.h5     # Pre-trained model (Keras .h5) — large binary
├─ class_labels.json          # Ordered list of class labels used by the model
├─ test_model.py              # Small script to test loading the .h5 file
├─ requirements.txt           # Python dependencies
├─ templates/
│   └─ index.html             # Frontend: upload form, results, history
└─ static/
    ├─ style.css
    ├─ script.js
    └─ <images...>            # Example images and uploaded images
```

**How it fits together:** The runtime is a single Flask process (app.py). The model file is loaded once on startup. When a user uploads a file via the index page, Flask saves it to static/ and the prediction flow runs as described above.

---

## Files you should know
- app.py — core web server and prediction logic. Loads model, handles `/` and `/predict` routes, manages session image history (last 3).
- class_labels.json — list of labels in the same order the model outputs (used to translate argmax index).
- plant_disease_model.h5 — Keras model file. If missing, run training or use the notebook to generate one.
- train.py — script for local training using the PlantVillage dataset (downloads via Kaggle API if available).
- plant_disease_training.ipynb — step-by-step Colab-ready notebook for training and saving the model + labels.
- templates/index.html and static/* — frontend UI, styles and JS.

---

## How prediction works (step-by-step) 🤖
1. The uploaded image is saved to static/ (app.py).
2. Keras loads it with target_size=(224,224).
3. The image array is converted to float and normalized (/255).
4. model.predict returns a vector of probabilities.
5. Take argmax -> class index -> get label from class_labels.json.
6. Confidence is max(probabilities) * 100 (rounded).
7. Cure suggestions are looked up from a dictionary in app.py and presented to the user.

Example output fields:
- prediction: "Tomato___Early_blight"
- confidence: "92.34"
- cure: "Apply fungicides. Mulch to prevent soil splash."

---

## How to train or retrain the model 🛠️
Option A — Colab (recommended if you don't have GPU locally)
- Open `plant_disease_training.ipynb` in Google Colab.
- Provide Kaggle credentials, download the PlantVillage dataset, and run cells.
- Save the model to your Google Drive then copy `plant_disease_model.h5` and `class_labels.json` into the repo root.

Option B — Local (if you have GPU and Kaggle configured)
```bash
# Ensure kaggle CLI is configured (kaggle.json in ~/.kaggle/)
python train.py
# This downloads the dataset, trains for EPOCHS (default 5), and saves:
# - plant_disease_model.h5
# - class_labels.json
```

Notes:
- The training scripts use MobileNetV2 as a frozen base for transfer learning and a small top classifier.
- Increase EPOCHS in train.py or Colab to improve accuracy (monitor validation metrics).

---

## requirements.txt (quick)
Install with:
```bash
pip install -r requirements.txt
```
If you need GPU-accelerated TensorFlow, install the appropriate tensorflow package for your CUDA/cuDNN configuration.

---

## Troubleshooting & tips 🩺
- "Model file not found" — place `plant_disease_model.h5` in repo root or run training. Use `python test_model.py` to confirm the .h5 loads.
- If predictions are garbage, check that `class_labels.json` matches the model's output order.
- For production use, remove debug=True and use a proper WSGI server (gunicorn) and configure file upload limits + security.
- If the app crashes on import of tensorflow: ensure your Python/TensorFlow versions are compatible (use virtualenv).

---

## Ideas to extend / For mentors & students (learning prompts) 💡
- Add Grad-CAM visualization to show which parts of the leaf informed the prediction.
- Expose a REST API endpoint returning JSON prediction results (useful for mobile apps).
- Convert the model to TensorFlow Lite and run on-device on Android.
- Add dataset augmentation or unfreeze some base layers and fine-tune for better accuracy.
- Add unit tests for data preprocessing and model loading.

---

## Contribution & License
- Feel free to open issues or PRs with improvements, bug fixes, or better cure suggestions.
- Add a LICENSE file if you want a specific open-source license applied.

---

## Contact / Author
Repository owner: HarshaVardhan855

---

Thank you for building this lovely teaching project — it's clear, practical, and a great base for students to learn ML + deployment. 🌱🚜👏
