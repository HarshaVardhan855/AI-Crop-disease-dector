# ============================================
# 🌿 AI Plant Disease Detection Model Training
# Local version adapted from Colab notebook
# ============================================

import os
import json
import zipfile
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator  # type: ignore
from tensorflow.keras.applications import MobileNetV2  # type: ignore
from tensorflow.keras import layers, models  # type: ignore

# ✅ STEP 1: Install dependencies (if not already installed)
# Assuming requirements.txt has them, but run pip install if needed
# !pip install tensorflow kaggle matplotlib --quiet

# ✅ STEP 2: Download the PlantVillage Dataset from Kaggle
# Note: You need kaggle.json in ~/.kaggle/ or set KAGGLE_USERNAME and KAGGLE_KEY env vars

# Check if kaggle is configured
try:
    import kaggle
    print("Kaggle API available.")
except ImportError:
    print("Kaggle not installed. Installing...")
    os.system("pip install kaggle")

# Download dataset
dataset_path = "new-plant-diseases-dataset.zip"
if not os.path.exists(dataset_path):
    print("Downloading dataset...")
    os.system("kaggle datasets download -d vipoooool/new-plant-diseases-dataset -p ./")
else:
    print("Dataset already downloaded.")

# ✅ STEP 3: Extract dataset
extract_path = "dataset"
if not os.path.exists(extract_path):
    print("Extracting dataset...")
    with zipfile.ZipFile(dataset_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
else:
    print("Dataset already extracted.")

# ✅ STEP 4: Prepare training and validation sets
# Note: The extracted dataset has a nested structure
nested_path = os.path.join(extract_path, "New Plant Diseases Dataset(Augmented)")
train_dir = os.path.join(nested_path, "train")
valid_dir = os.path.join(nested_path, "valid")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

train_datagen = ImageDataGenerator(rescale=1./255)
valid_datagen = ImageDataGenerator(rescale=1./255)

train_data = train_datagen.flow_from_directory(
    train_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

valid_data = valid_datagen.flow_from_directory(
    valid_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

num_classes = len(train_data.class_indices)
print(f"✅ Found {num_classes} classes.")

# ✅ STEP 5: Build Model (Transfer Learning)
base_model = MobileNetV2(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False  # freeze base layers

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# ✅ STEP 6: Train the Model
EPOCHS = 5  # you can increase to 10-15 for higher accuracy

history = model.fit(
    train_data,
    validation_data=valid_data,
    epochs=EPOCHS
)

# ✅ STEP 7: Save the model
model_path = "plant_disease_model.h5"
model.save(model_path)
print(f"✅ Model saved at: {model_path}")

# ✅ STEP 8: Save class labels
label_path = "class_labels.json"
class_labels = list(train_data.class_indices.keys())
with open(label_path, "w") as f:
    json.dump(class_labels, f)

print("✅ Class labels saved successfully!")
