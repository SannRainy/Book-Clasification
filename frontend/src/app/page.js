'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🔬",
      title: "Teknologi AI Canggih",
      description: "Menggunakan CNN ResNet50 untuk akurasi tinggi dalam deteksi penyakit daun teh"
    },
    {
      icon: "⚡",
      title: "Analisis Cepat",
      description: "Hasil klasifikasi dalam hitungan detik dengan tingkat kepercayaan yang tinggi"
    },
    {
      icon: "🎯",
      title: "Akurasi Tinggi",
      description: "Model terlatih dengan ribuan data gambar untuk memberikan hasil yang akurat"
    },
    {
      icon: "📱",
      title: "Mudah Digunakan",
      description: "Interface yang intuitif, cukup upload gambar dan dapatkan hasil analisis"
    }
  ];

  const diseases = [
    {
      name: "Anthracnose",
      description: "Penyakit jamur yang menyerang daun teh",
      color: "from-red-400 to-pink-500"
    },
    {
      name: "Algal Leaf Spot",
      description: "Bercak daun yang disebabkan oleh alga",
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Bird Eye Spot",
      description: "Bercak mata burung pada daun teh",
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Brown Blight",
      description: "Penyakit hawar coklat pada tanaman teh",
      color: "from-amber-400 to-orange-500"
    },
    {
      name: "Gray Light",
      description: "Penyakit cahaya kelabu",
      color: "from-gray-400 to-slate-500"
    },
    {
      name: "Red Leaf Spot",
      description: "Bercak daun merah",
      color: "from-rose-400 to-red-500"
    },
    {
      name: "White Spot",
      description: "Bercak putih pada daun",
      color: "from-purple-400 to-violet-500"
    },
    {
      name: "Healthy",
      description: "Daun teh dalam kondisi sehat",
       color: "from-green-400 to-emerald-500"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/30 to-green-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-green-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Main Hero Content */}
          <div className="space-y-8 mb-16">
            {/* Icon and Title */}
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="text-8xl sm:text-9xl animate-bounce">🍃</div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                  TeaLeaf 
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto"></div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium">
                  Sistem Klasifikasi Hama Daun Teh
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Platform Artificial Intelligence untuk mendeteksi dan mengklasifikasi penyakit pada daun teh dengan akurasi tinggi menggunakan Deep Learning CNN (ResNet50)
            </p>

            {/* Animated Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-bounce"></span>
              <span className="inline-block w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
              <span className="inline-block w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-6">
            <Link href="/klasifikasi">
              <button className="group relative px-12 py-6 text-white font-bold text-xl rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>Mulai Klasifikasi</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            {/* Secondary Info */}
            <p className="text-sm text-gray-500">
              Upload gambar daun teh untuk analisis instan
            </p>
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 ">
              <h2 className="text-4xl sm:text-4xl font-bold text-gray-800 mb-6">
                🌟 Keunggulan <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">TeaLeaf</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Teknologi terdepan yang dirancang khusus untuk kebutuhan industri perkebunan teh modern
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                    currentFeature === index ? 'ring-4 ring-emerald-300/50 scale-105' : ''
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 group-hover:from-emerald-50/50 group-hover:to-green-50/50 rounded-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diseases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-4xl font-bold text-gray-800 mb-6">
                🔍 Penyakit yang Dapat <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Dideteksi</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sistem kami mampu mengidentifikasi berbagai jenis penyakit yang umum menyerang tanaman teh
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {diseases.map((disease, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${disease.color}`}></div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {disease.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {disease.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${disease.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-4xl font-bold text-gray-800 mb-6">
                ⚙️ Cara <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Kerja</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proses sederhana dalam 3 langkah untuk mendapatkan hasil analisis yang akurat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
    {
      step: "1",
      icon: "📸",
      title: "Upload Gambar",
      description: "Upload foto daun teh yang ingin dianalisis dari galeri"
    },
    {
      step: "2",
      icon: "🤖",
      title: "Proses AI",
      description: "Sistem AI menganalisis gambar menggunakan model CNN ResNet50"
    },
    {
      step: "3",
      icon: "📊",
      title: "Hasil Analisis",
      description: "Dapatkan diagnosis lengkap dengan tingkat kepercayaan dan saran perawatan"
    }
             ].map((item, index) => (
              <div key={index} className="relative h-full">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {item.step}
                      </div>
                      <div className="absolute -top-2 -right-2 text-3xl">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                
                {/* Arrow untuk desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 text-emerald-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
             ))}
          </div>
          </div>
        </section>

      </div>
    </main>
  );
}