'use client';

import { useState, useCallback, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5000/predict';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simplified drag and drop functionality
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      setResult(null);
      setError('');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      setResult(null);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onDrop([files[0]]);
    }
  };

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
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      const errorMessage = err.message || "Terjadi kesalahan saat menghubungi server.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/30 to-green-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-green-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div 
          className={`w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12 space-y-8 border border-white/20 transform transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                🍃 Klasifikasi Hama Daun Teh
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 rounded-lg blur-lg opacity-30 animate-pulse"></div>
            </div>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Teknologi AI canggih untuk mendeteksi penyakit pada daun teh dengan akurasi tinggi
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
              <span className="inline-block w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>

          {/* Upload Section */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-500 transform hover:scale-[1.02] group ${
              isDragActive 
                ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg scale-105' 
                : 'border-gray-300 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-green-50/50 hover:shadow-xl'
            }`}
          >
            <input 
              id="file-input"
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
            />
            
            {preview ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 sm:max-h-80 mx-auto rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 border-4 border-white/50" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 rounded-xl"></div>
                </div>
                <p className="text-emerald-600 font-semibold text-lg">Gambar siap untuk dianalisis!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500 space-y-4">
                <div className="relative">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 sm:h-20 sm:w-20 text-emerald-400 group-hover:text-emerald-500 transition-all duration-300 group-hover:scale-110" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-700">
                    {isDragActive ? "🎯 Jatuhkan gambar di sini..." : "📸 Klik atau jatuhkan gambar daun teh"}
                  </p>
                  <p className="text-sm text-gray-500">Mendukung format JPEG, PNG, JPG (Max 10MB)</p>
                </div>
              </div>
            )}
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-300/50 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-6 right-8 w-1 h-1 bg-green-400/60 rounded-full animate-ping delay-700"></div>
              <div className="absolute top-1/3 right-6 w-1.5 h-1.5 bg-teal-300/50 rounded-full animate-ping delay-1000"></div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              disabled={loading || !selectedFile}
              className={`group relative px-8 py-4 sm:px-12 sm:py-5 text-white font-bold text-lg rounded-2xl transition-all duration-500 transform focus:outline-none focus:ring-4 focus:ring-emerald-300/50 overflow-hidden ${
                loading || !selectedFile
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:scale-105 hover:shadow-2xl active:scale-95'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>🔬 Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Klasifikasikan Sekarang</span>
                  </>
                )}
              </span>
              
              {!loading && !(!selectedFile) && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="transform transition-all duration-500 animate-fadeIn">
              <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-700 font-semibold">❌ {error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && !error && (
            <div className="transform transition-all duration-700 animate-fadeIn">
              <div className="p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border border-emerald-200/50 shadow-xl relative overflow-hidden">
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/50 to-transparent rounded-full blur-xl"></div>
                
                <div className="relative z-10 text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center justify-center space-x-2">
                      <span>🎯</span>
                      <span>Hasil Prediksi</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent capitalize animate-pulse">
                      {result.prediction.replace(/_/g, ' ')}
                    </p>
                    
                    {/* Confidence Bar */}
                    <div className="space-y-3">
                      <div className="w-full bg-gray-200/50 rounded-full h-4 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full shadow-lg transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ 
                            width: `${(result.confidence * 100).toFixed(2)}%`,
                            animation: 'fillBar 1.5s ease-out'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-600">Tingkat Keyakinan:</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          {(result.confidence * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success Badge */}
                  <div className="inline-flex items-center space-x-2 bg-white/60 px-6 py-3 rounded-full shadow-lg border border-emerald-200/50">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-700 font-semibold">Analisis Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <footer className={`text-center mt-8 text-gray-500 text-sm sm:text-base transition-all duration-1000 delay-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            🚀 Dibuat dengan Next.js, Flask, dan CNN (ResNet50)
          </p>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: ${result ? (result.confidence * 100).toFixed(2) : 0}%; }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}