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

# --- Database Informasi Penyakit ---
DISEASE_INFO = {
    'anthracnose': {
        'name': 'Antraknosa',
        'description': 'Penyakit jamur yang menyebabkan bercak coklat kehitaman pada daun teh dengan tepi yang jelas. Penyakit ini dapat menyebabkan daun gugur prematur dan menurunkan kualitas pucuk teh.',
        'symptoms': [
            'Bercak coklat kehitaman pada daun',
            'Bercak dengan tepi yang jelas dan tajam',
            'Daun menguning dan gugur prematur',
            'Pucuk daun layu dan mengering'
        ],
        'causes': [
            'Kelembaban udara tinggi (>80%)',
            'Curah hujan berlebihan',
            'Sirkulasi udara yang buruk',
            'Tanaman yang terlalu rapat'
        ],
        'treatment': [
            'Semprot dengan fungisida berbahan aktif mankozeb atau klorotalonil',
            'Pangkas bagian tanaman yang terinfeksi dan bakar',
            'Perbaiki drainase untuk mengurangi kelembaban berlebih',
            'Atur jarak tanam untuk sirkulasi udara yang baik',
            'Aplikasi fungisida preventif setiap 2-3 minggu selama musim hujan'
        ],
        'prevention': [
            'Pilih varietas teh yang tahan penyakit',
            'Jaga kebersihan kebun dari sisa-sisa tanaman',
            'Hindari penyiraman pada daun, siram hanya pada akar',
            'Lakukan pemangkasan rutin untuk sirkulasi udara',
            'Monitor kelembaban dan suhu secara berkala'
        ]
    },
    'algal leaf': {
        'name': 'Bercak Alga',
        'description': 'Infeksi yang disebabkan oleh alga Cephaleuros virescens yang membentuk bercak orange-kemerahan pada permukaan daun. Penyakit ini umum terjadi di daerah dengan kelembaban tinggi.',
        'symptoms': [
            'Bercak orange hingga kemerahan pada daun',
            'Permukaan bercak terasa kasar seperti beludru',
            'Bercak berkembang dari kecil menjadi besar',
            'Daun menguning di sekitar area bercak'
        ],
        'causes': [
            'Kelembaban tinggi dan suhu hangat',
            'Sirkulasi udara yang buruk',
            'Intensitas cahaya rendah',
            'Genangan air pada permukaan daun'
        ],
        'treatment': [
            'Semprot dengan fungisida tembaga (copper sulfate)',
            'Aplikasi bordeaux mixture (1:1:100)',
            'Pangkas cabang-cabang yang menghambat sirkulasi udara',
            'Kurangi frekuensi penyiraman overhead',
            'Tingkatkan intensitas cahaya dengan pemangkasan selektif'
        ],
        'prevention': [
            'Pastikan drainase yang baik di area penanaman',
            'Hindari penyiraman pada sore/malam hari',
            'Atur jarak tanam yang cukup',
            'Bersihkan gulma yang menghambat aliran udara',
            'Lakukan pemangkasan rutin untuk penetrasi cahaya'
        ]
    },
    'bird eye spot': {
        'name': 'Bercak Mata burung',
        'description': 'Penyakit jamur yang ditandai dengan bercak bulat kecil dengan pusat berwarna abu-abu dan tepi coklat gelap, menyerupai mata burung. Disebabkan oleh jamur Cercospora theae.',
        'symptoms': [
            'Bercak bulat kecil dengan pusat abu-abu',
            'Tepi bercak berwarna coklat gelap',
            'Bercak berkembang dari 2-5mm diameter',
            'Daun berlubang jika bercak gugur'
        ],
        'causes': [
            'Kelembaban tinggi dan suhu 25-30°C',
            'Daun yang sering basah',
            'Nutrisi tanaman yang tidak seimbang',
            'Stres pada tanaman'
        ],
        'treatment': [
            'Aplikasi fungisida sistemik (propikonazol atau tebukonazol)',
            'Semprot dengan mankozeb 80% setiap 15 hari',
            'Buang dan bakar daun yang terinfeksi',
            'Perbaiki nutrisi tanaman dengan pupuk seimbang',
            'Kurangi kelembaban dengan perbaikan drainase'
        ],
        'prevention': [
            'Pilih varietas yang toleran terhadap penyakit',
            'Jaga kebersihan kebun dari daun gugur',
            'Aplikasi mulsa untuk mengurangi percikan air',
            'Pemupukan berimbang sesuai kebutuhan tanaman',
            'Monitoring rutin dan deteksi dini'
        ]
    },
    'brown blight': {
        'name': 'Hawar Coklat',
        'description': 'Penyakit serius yang disebabkan oleh jamur Colletotrichum camelliae, menyerang pucuk dan daun muda teh, menyebabkan kerugian ekonomi yang signifikan.',
        'symptoms': [
            'Bercak coklat pada pucuk dan daun muda',
            'Pucuk layu dan mengering',
            'Daun muda berubah warna menjadi coklat',
            'Pertumbuhan tanaman terhambat'
        ],
        'causes': [
            'Curah hujan tinggi dan kelembaban >85%',
            'Suhu udara 20-25°C',
            'Angin kencang yang melukai tanaman',
            'Tanaman yang lemah dan stres'
        ],
        'treatment': [
            'Semprot dengan fungisida sistemik (azoksistrobin)',
            'Aplikasi fungisida kontak (mankozeb) secara bergantian',
            'Pangkas pucuk yang terinfeksi hingga jaringan sehat',
            'Tingkatkan nutrisi tanaman dengan pupuk NPK',
            'Perbaiki drainase dan sirkulasi udara'
        ],
        'prevention': [
            'Gunakan varietas teh yang tahan penyakit',
            'Lakukan sanitasi kebun secara rutin',
            'Hindari pemupukan nitrogen berlebihan',
            'Pasang windbreak untuk mengurangi kerusakan angin',
            'Aplikasi fungisida preventif saat musim hujan'
        ]
    },
    'gray light': {
        'name': 'Bercak Abu-abu Terang',
        'description': 'Penyakit yang menyebabkan bercak berwarna abu-abu terang pada daun teh, umumnya disebabkan oleh kondisi lingkungan yang tidak optimal dan infeksi jamur ringan.',
        'symptoms': [
            'Bercak abu-abu terang pada permukaan daun',
            'Bercak tidak beraturan dan menyebar',
            'Daun tampak pucat dan tidak sehat',
            'Pertumbuhan daun menjadi lambat'
        ],
        'causes': [
            'Kelembaban tidak stabil',
            'Kekurangan nutrisi mikro',
            'Stres lingkungan',
            'Infeksi jamur opportunistik'
        ],
        'treatment': [
            'Aplikasi fungisida ringan (sulfur atau tembaga)',
            'Perbaiki nutrisi dengan pupuk mikro',
            'Atur kelembaban dengan mulsa organik',
            'Pangkas bagian yang terinfeksi parah',
            'Semprot dengan larutan baking soda 1% sebagai alternatif organik'
        ],
        'prevention': [
            'Jaga stabilitas kelembaban tanah',
            'Pemupukan berimbang dengan mikro nutrisi',
            'Hindari stres air dengan penyiraman teratur',
            'Monitoring kesehatan tanaman secara rutin',
            'Perbaiki struktur tanah dengan bahan organik'
        ]
    },
    'healthy': {
        'name': 'Daun Sehat',
        'description': 'Daun teh dalam kondisi sehat dengan warna hijau normal, tidak ada tanda-tanda penyakit atau stres. Pertahankan kondisi ini dengan perawatan yang tepat.',
        'symptoms': [
            'Warna hijau segar dan merata',
            'Permukaan daun halus dan mengkilap',
            'Tidak ada bercak atau perubahan warna',
            'Pertumbuhan normal dan vigor baik'
        ],
        'causes': [
            'Kondisi lingkungan optimal',
            'Nutrisi yang cukup dan seimbang',
            'Pengelolaan yang baik',
            'Tidak ada tekanan penyakit'
        ],
        'treatment': [
            'Pertahankan rutinitas perawatan yang sudah baik',
            'Lanjutkan program pemupukan seimbang',
            'Monitor secara rutin untuk deteksi dini masalah',
            'Jaga kebersihan area pertanaman',
            'Pertahankan sistem irigasi yang efisien'
        ],
        'prevention': [
            'Lakukan pemupukan rutin sesuai jadwal',
            'Jaga kelembaban tanah yang optimal',
            'Monitoring hama dan penyakit secara berkala',
            'Pemangkasan sanitasi secara teratur',
            'Rotasi pestisida untuk mencegah resistensi'
        ]
    },
    'red leaf spot': {
        'name': 'Bercak Daun Merah',
        'description': 'Penyakit yang ditandai dengan munculnya bercak-bercak merah pada daun teh, umumnya disebabkan oleh jamur atau stres fisiologis tanaman.',
        'symptoms': [
            'Bercak merah atau kemerahan pada daun',
            'Bercak dapat membesar dan bergabung',
            'Daun menguning di sekitar bercak',
            'Daun gugur prematur pada infeksi berat'
        ],
        'causes': [
            'Infeksi jamur patogen',
            'Kekurangan nutrisi (terutama kalium)',
            'Stres air atau kekeringan',
            'Suhu ekstrem atau fluktuasi suhu besar'
        ],
        'treatment': [
            'Aplikasi fungisida berbahan aktif azoksistrobin',
            'Semprot dengan fungisida tembaga untuk kontrol',
            'Perbaiki nutrisi dengan pupuk kalium',
            'Atur irigasi untuk mencegah stres air',
            'Buang dan musnahkan daun yang terinfeksi berat'
        ],
        'prevention': [
            'Pemupukan berimbang dengan cukup kalium',
            'Jaga kelembaban tanah yang stabil',
            'Hindari fluktuasi suhu dengan naungan',
            'Aplikasi mulsa untuk stabilitas suhu tanah',
            'Pemantauan rutin kondisi tanaman'
        ]
    },
    'white spot': {
        'name': 'Bercak Putih',
        'description': 'Penyakit yang menyebabkan munculnya bercak-bercak putih pada daun teh, biasanya disebabkan oleh jamur atau kondisi lingkungan yang tidak mendukung.',
        'symptoms': [
            'Bercak putih atau putih keabuan pada daun',
            'Bercak bulat atau tidak beraturan',
            'Permukaan bercak tampak seperti tepung',
            'Daun dapat mengkerut pada infeksi parah'
        ],
        'causes': [
            'Infeksi jamur (seperti powdery mildew)',
            'Kelembaban tinggi dengan sirkulasi udara buruk',
            'Kelebihan nitrogen dalam pemupukan',
            'Intensitas cahaya yang rendah'
        ],
        'treatment': [
            'Semprot dengan fungisida sistemik (triademefon)',
            'Aplikasi sulfur sebagai fungisida organik',
            'Pangkas untuk meningkatkan sirkulasi udara',
            'Kurangi pemupukan nitrogen sementara',
            'Tingkatkan intensitas cahaya dengan pemangkasan'
        ],
        'prevention': [
            'Jaga sirkulasi udara yang baik',
            'Hindari pemupukan nitrogen berlebihan',
            'Atur jarak tanam yang cukup',
            'Pemangkasan rutin untuk penetrasi cahaya',
            'Monitor kelembaban dan ventilasi'
        ]
    }
}

# --- Konfigurasi dan Pemuatan Model ---
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

model.fc = nn.Sequential(
    nn.Dropout(p=0.5),
    nn.Linear(num_ftrs, NUM_CLASSES)
)

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

# --- Helper Function untuk mendapatkan info penyakit ---
def get_disease_info(prediction):
    """Mendapatkan informasi lengkap tentang penyakit berdasarkan prediksi"""
    # Normalize prediction untuk matching dengan database
    normalized_prediction = prediction.lower().replace(' ', ' ').replace('_', ' ').strip()
    
    # Cari matching key di database
    for key, info in DISEASE_INFO.items():
        if key.replace('_', ' ') == normalized_prediction or key == normalized_prediction.replace(' ', '_'):
            return info
    
    # Default jika tidak ditemukan
    return {
        'name': prediction.replace('_', ' ').title(),
        'description': 'Informasi detail untuk penyakit ini belum tersedia. Konsultasikan dengan ahli pertanian untuk diagnosis lebih lanjut.',
        'symptoms': ['Gejala spesifik belum terdefinisi'],
        'causes': ['Penyebab spesifik belum terdefinisi'], 
        'treatment': ['Konsultasikan dengan ahli pertanian setempat'],
        'prevention': ['Lakukan perawatan umum tanaman teh']
    }

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
        
        # Dapatkan informasi lengkap tentang penyakit
        disease_info = get_disease_info(predicted_class)
        
        response = {
            'prediction': predicted_class.replace('_', ' ').replace('-', ' '),
            'confidence': confidence.item(),
            'disease_info': disease_info
        }
        
        return jsonify(response)
    except Exception as e:
        app.logger.error(f"Error saat prediksi: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint untuk check status aplikasi"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'classes_count': NUM_CLASSES,
        'device': str(device)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)