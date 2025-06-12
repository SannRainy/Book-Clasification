// frontend/src/App.js
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const API_URL = '/predict'; // URL final untuk production dengan Docker

function App() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Klasifikasi Genre Buku (ViT)</h1>
          <p className="text-gray-500 mt-2">Unggah sampul buku dan biarkan AI menebak genrenya.</p>
        </div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          {preview ? ( <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-md shadow-md" /> ) : 
          ( <p className="text-gray-500">{isDragActive ? "Jatuhkan file di sini..." : "Jatuhkan gambar sampul buku di sini, atau klik untuk memilih file"}</p> )}
        </div>
        <div className="flex justify-center">
          <button onClick={handleUpload} disabled={loading || !selectedFile} className="w-full md:w-1/2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform active:scale-95">
            {loading ? 'Menganalisis...' : 'Klasifikasikan'}
          </button>
        </div>
        {error && (<div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"><p><span className="font-bold">Error:</span> {error}</p></div>)}
        {result && !error && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700">Hasil Prediksi:</h2>
            <p className="text-4xl font-bold text-green-600 my-2 capitalize">{result.prediction.replace(/_/g, ' ').replace(/-/g, ' ')}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(result.confidence * 100).toFixed(2)}%` }}></div></div>
            <p className="text-md text-gray-500 mt-2">Keyakinan: {(result.confidence * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
      <footer className="text-center mt-8 text-gray-500 text-sm"><p>Dibuat dengan React, Flask, dan Vision Transformer.</p></footer>
    </div>
  );
}
export default App;