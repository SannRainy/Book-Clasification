'use client'; // Baris ini wajib ada di Next.js untuk komponen interaktif

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

// URL ini menunjuk ke backend Flask yang berjalan di komputer Anda
const API_URL = 'http://127.0.0.1:5000/predict';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      setResult(null);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Pilih atau jatuhkan file gambar terlebih dahulu!");
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Terjadi kesalahan saat menghubungi server.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Klasifikasi Penyakit Daun Teh</h1>
          <p className="text-gray-500 mt-2">Unggah gambar daun teh untuk dideteksi oleh AI.</p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-md shadow-lg" />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p>{isDragActive ? "Jatuhkan file di sini..." : "Klik atau jatuhkan gambar di sini"}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? 'Menganalisis...' : 'Klasifikasikan'}
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center animate-pulse">
            <p><span className="font-bold">Error:</span> {error}</p>
          </div>
        )}

        {result && !error && (
          <div className="p-6 bg-green-50 rounded-lg text-center border border-green-200">
            <h2 className="text-xl font-semibold text-gray-700">Hasil Prediksi:</h2>
            <p className="text-4xl font-bold text-green-600 my-2 capitalize">{result.prediction.replace(/_/g, ' ')}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(result.confidence * 100).toFixed(2)}%` }}></div>
            </div>
            <p className="text-md text-gray-500 mt-2">Keyakinan: {(result.confidence * 100).toFixed(2)}%</p>
          </div>
        )}

      </div>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Dibuat dengan Next.js, Flask, dan CNN (ResNet50).</p>
      </footer>
    </main>
  );
}