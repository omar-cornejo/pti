import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';

export default function Detection() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setError('');
  };

  const onChoose = (e) => {
    const f = e.target.files?.[0];
    handleFileSelect(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Selecciona una imagen');
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const data = await apiRequest('/detection', { 
        method: 'POST', 
        body: formData, 
        token, 
        isFormData: true 
      });
      setDetections(data.detections || []);
    } catch (err) {
      setError(err.message || 'Error al detectar');
    } finally {
      setLoading(false);
    }
  };

  const onReset = (e) => {
    e.preventDefault();
    setFile(null);
    setPreviewUrl('');
    setDetections([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDropAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Space Grotesk', sans-serif;
        }

        .hero-text {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .pill-button {
          border: 3px solid #000000;
          border-radius: 50px;
          padding: 14px 36px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          display: inline-block;
          background-color: #000000;
          color: #FFFFFF;
        }

        .pill-button:hover:not(:disabled) {
          background-color: #FFFFFF;
          color: #000000;
          transform: translateY(-2px);
        }

        .pill-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .pill-button-outline {
          border: 3px solid #000000;
          border-radius: 50px;
          padding: 14px 36px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          display: inline-block;
          background-color: #FFFFFF;
          color: #000000;
        }

        .pill-button-outline:hover {
          background-color: #000000;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .detection-card {
          border: 3px solid #000000;
          background: #FFFFFF;
          transition: all 0.3s ease;
        }

        .detection-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0px #000000;
        }

        .dropzone {
          border: 3px dashed #000000;
          background: #FFFFFF;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dropzone:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        .dropzone.dragover {
          border-style: solid;
          background-color: #f8f8f8;
          transform: scale(1.02);
        }

        .result-item {
          border: 2px solid #000000;
          background: #FFFFFF;
          transition: all 0.3s ease;
        }

        .result-item:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        .asterisk {
          font-size: 3rem;
          font-weight: 700;
        }

        .confidence-bar {
          background: linear-gradient(90deg, #000000, #666666);
          transition: width 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>

      <Header style="light" position="static" />
      
      <main className="flex-1">
        <div className="container mx-auto px-8 py-16">
          {/* Header Section */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="asterisk mb-4">✱</div>
            <h1 className="hero-text mb-6">DETECCIÓN<br/>INTELIGENTE</h1>
            <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
              Sube una imagen para identificar prendas automáticamente con nuestra tecnología AI avanzada
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Panel */}
            <section className="animate-slide-up" style={{animationDelay:'0.2s'}}>
              <div className="detection-card rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Subir Imagen</h2>
                
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div 
                    className={`dropzone rounded-lg p-8 text-center ${isDragOver ? 'dragover' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleDropAreaClick}
                  >
                    <div className="w-full max-w-md mx-auto aspect-[4/3] bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden mb-6">
                      {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-gray-500 text-center">
                          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                          </svg>
                          <p className="font-bold text-lg mb-2">Arrastra tu imagen aquí</p>
                          <p className="text-sm text-gray-400">o haz clic para seleccionarla</p>
                        </div>
                      )}
                    </div>

                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/png, image/jpeg, image/webp" 
                      className="sr-only" 
                      onChange={onChoose}
                    />
                    <button 
                      type="button" 
                      className="pill-button-outline mb-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Elegir Archivo
                    </button>
                    <p className="text-xs text-gray-500">JPEG, PNG, WEBP · Máximo 15MB</p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm font-medium text-gray-600">
                      {detections?.length ? `${detections.length} items detectados` : 'Listo para detectar'}
                    </div>
                    <div className="space-x-4">
                      <button 
                        type="button" 
                        className="pill-button-outline" 
                        onClick={onReset}
                      >
                        Limpiar
                      </button>
                      <button 
                        type="submit" 
                        className="pill-button" 
                        disabled={loading}
                      >
                        {loading ? 'Detectando...' : 'Detectar'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>

            {/* Results Panel */}
            <section className="animate-slide-up" style={{animationDelay:'0.4s'}}>
              <div className="detection-card rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Resultados</h2>
                  {detections?.length > 0 && (
                    <span className="text-sm font-medium text-gray-600">
                      {detections.length} detectados
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {detections?.length > 0 ? (
                    detections.map((d, idx) => (
                      <div key={idx} className="result-item rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-white">
                              <span className="text-xl">{d.icon}</span>
                            </div>
                            <div>
                              <p className="font-bold text-lg">{d.label}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {(d.tags || []).map((t, i) => (
                                  <span 
                                    key={i} 
                                    className="px-3 py-1 text-xs font-medium rounded-full border-2 border-black bg-white"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{d.confidence}% confianza</p>
                            <div className="w-32 h-3 border-2 border-black rounded-full mt-2 overflow-hidden bg-white">
                              <div 
                                className="h-full confidence-bar" 
                                style={{ width: `${d.confidence || 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">No hay resultados todavía</p>
                      <p className="text-sm text-gray-400">Sube una imagen y pulsa Detectar</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t-2 border-black">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Privado y Seguro
                  </span>
                  <button className="pill-button-outline">Exportar</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}