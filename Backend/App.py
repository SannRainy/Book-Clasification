import torch
import torch.nn as nn
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from torchvision import models, transforms
import io
import os

# --- Inisialisasi Aplikasi Flask ---
app = Flask(__name__)
CORS(app)

# --- Konfigurasi dan Pemuatan Model ---
# Menggunakan nama file model dari training terakhir Anda
MODEL_PATH = 'cnn_tea_disease_classifier.pth'
CLASS_NAMES_PATH = 'class_names.txt'

try:
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = [line.strip() for line in f.readlines()]
    NUM_CLASSES = len(class_names)
except FileNotFoundError:
    print(f"FATAL ERROR: File '{CLASS_NAMES_PATH}' tidak ditemukan. Pastikan file ada di folder Backend.")
    exit()

if not os.path.exists(MODEL_PATH):
    print(f"FATAL ERROR: File model '{MODEL_PATH}' tidak ditemukan. Pastikan file ada di folder Backend.")
    exit()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Menggunakan device untuk inferensi: {device}")

# --- Inisialisasi Arsitektur Model CNN (ResNet50) ---
model = models.resnet50()
num_ftrs = model.fc.in_features

# PERBAIKAN DI SINI: Samakan arsitektur dengan saat training
model.fc = nn.Sequential(
    nn.Dropout(p=0.5),
    nn.Linear(num_ftrs, NUM_CLASSES)
)

# Muat bobot yang sudah dilatih
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

# --- Fungsi Transformasi untuk Inferensi ---
def transform_image(image_bytes):
    image_size = 224
    transform = transforms.Compose([
        transforms.Resize(image_size),
        transforms.CenterCrop(image_size),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0).to(device)

# --- Endpoint API ---
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'File tidak ditemukan dalam request'}), 400
    
    file = request.files.get('file')
    if not file or file.filename == '':
        return jsonify({'error': 'Tidak ada file yang dipilih'}), 400

    try:
        image_bytes = file.read()
        tensor = transform_image(image_bytes)
        with torch.no_grad():
            outputs = model(tensor)
        
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probabilities, 1)
        
        predicted_class = class_names[predicted_idx.item()]
        
        response = {
            'prediction': predicted_class.replace('_', ' ').replace('-', ' '),
            'confidence': confidence.item()
        }
        
        return jsonify(response)
    except Exception as e:
        app.logger.error(f"Error saat prediksi: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)