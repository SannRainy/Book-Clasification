export default function About() {
    const teamMembers = [
      {
        id: 1,
        name: "Krisna Satya Arisandy",
        nim: "2205101053",
        university: "Universitas PGRI Madiun",   
        email: "john.doe@example.com",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
      },
      {
        id: 2,
        name: "Junioka Bayu Gionanda",      
        nim: "2205101060",
        university: "Universitas PGRI Madiun",
        email: "okabayu12344@gmail.com",
        linkedin: "https://www.linkedin.com/in/junioka-bayu-gionanda-unipma/",
        github: "https://github.com/JuniokaBayu"
      },
      {
        id: 3,
        name: "Alvina Nindita Nareswari",
        nim: "2205101047",
        university: "Universitas PGRI Madiun",
        email: "alvinanindita28@gmail.com",
        linkedin: "https://www.linkedin.com/in/alvina-nindita-unipma/",
        github: "https://github.com/Alvinanindita"
      },
      {
        id: 4,
        name: "Natasya A S",
        nim: "2205101110",
        university: "Universitas PGRI Madiun",
        email: "sarah.wilson@example.com",
        linkedin: "https://linkedin.com/in/sarahwilson",
        github: "https://github.com/sarahwilson"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Our Team</span>
            </h1>
           
          </div>
  
          {/* Project Overview */}
          <div className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              TeaLeaf Project
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Tentang Proyek</h3>
                <p className="text-gray-700 mb-4">
                  TeaLeaf adalah sistem klasifikasi hama daun teh berbasis kecerdasan buatan yang dikembangkan 
                  untuk membantu petani teh dalam mengidentifikasi jenis hama yang menyerang tanaman mereka.
                </p>
                <p className="text-gray-700">
                  Dengan menggunakan teknologi Deep Learning CNN, sistem ini dapat memberikan 
                  hasil klasifikasi yang akurat dan cepat hanya dengan mengupload foto daun teh.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Teknologi yang Digunakan</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Next.js', 'React', 'TensorFlow', 'Python', 'Tailwind CSS', 'Node.js'].map((tech) => (
                    <div key={tech} className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium text-center">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                
  
                {/* Profile Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-1">NIM: {member.nim}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.university}</p>
  
                  
  
                  {/* Contact Info */}
                  <div className="flex space-x-3">
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-emerald-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                      </svg>
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          
        </div>
      </div>
    );
  }