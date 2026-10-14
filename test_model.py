import os
from tensorflow.keras.models import load_model

MODEL_FILE = 'plant_disease_model.h5'

print(f"--- Starting Model Load Test ---")

# 1. Check if file exists
if not os.path.exists(MODEL_FILE):
    print(f"--- ERROR: File not found! ---")
    print(f"I cannot find '{MODEL_FILE}' in this folder.")
    print(f"Current folder contents: {os.listdir('.')}")
else:
    print(f"File '{MODEL_FILE}' was found.")
    
    # 2. Try to load the file
    try:
        print("Attempting to load model...")
        model = load_model(MODEL_FILE)
        print("--- SUCCESS! Model loaded correctly. ---")
        model.summary() # Print model details if successful
    except Exception as e:
        print(f"--- ERROR: Model FAILED to load! ---")
        print(f"The error is: {e}")

print("--- Test Finished ---")
