import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalCards = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getCardClass = (index) => {
    const diff = (index - currentIndex + totalCards) % totalCards;
    
    if (diff === 0) return "carousel-card active";
    if (diff === 1) return "carousel-card next";
    if (diff === totalCards - 1) return "carousel-card prev";
    return "carousel-card hidden";
  };

  const carouselCards = [
    {
      gradient: "from-lime-300 to-lime-400",
      emoji: "🎨",
      title: "Detección 24/7",
      description: "Nuestro sistema de detección funciona las 24 horas del día para identificar prendas automáticamente. Sin importar la hora.",
      width: "w-[320px]"
    },
    {
      gradient: "gradient-card-2",
      emoji: "✨",
      title: "Outfits Flexibles",
      description: "Cancela looks y procesa recomendaciones en segundos. Con combinaciones inteligentes y flexibles, tu guardarropa estará siempre optimizado.",
      width: "w-[380px]"
    },
    {
      gradient: "from-gray-100 to-gray-200",
      emoji: null,
      title: "Políticas y Aprobaciones",
      description: "Acelera las aprobaciones mientras mantienes los presupuestos bajo control, con revisores asignados y políticas preestablecidas que son fáciles de seguir.",
      width: "w-[320px]",
      badges: true
    },
    {
      gradient: "from-purple-200 to-purple-300",
      emoji: "💎",
      title: "Tendencias Premium",
      description: "Acceso exclusivo a las últimas tendencias de moda y recomendaciones de diseñadores reconocidos mundialmente.",
      width: "w-[320px]"
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col font-[Space_Grotesk]">
      {/* Estilos embebidos */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap");

        .hero-text {
          font-size: clamp(2.5rem, 8vw, 5rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .feature-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 12px 12px 0px #000000;
        }

        .pill-button {
          border: 2px solid #000000;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .pill-button:hover {
          background-color: #000000;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .pill-button-filled {
          background-color: #000000;
          color: #ffffff;
        }

        .pill-button-filled:hover {
          background-color: #ffffff;
          color: #000000;
        }

        .gradient-card-1 {
          background: linear-gradient(135deg, #d4f1f4 0%, #b5e6eb 100%);
        }

        .gradient-card-2 {
          background: linear-gradient(135deg, #ffe5b4 0%, #ffd699 100%);
        }

        .gradient-card-3 {
          background: linear-gradient(135deg, #e0bbe4 0%, #d8a7d8 100%);
        }

        .badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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

        .carousel-card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center center;
          transition: transform 0.8s ease, opacity 0.6s ease;
          opacity: 0;
        }

        .carousel-card:hover {
          transform: translate(-50%, -55%) scale(0.95);
          z-index: 25;
          transition: all 0.4s ease;
        }

        .carousel-card:hover .feature-card,
        .carousel-card:hover > div {
          transform: translateY(-8px);
          box-shadow: 12px 12px 0px #000000;
          transition: all 0.4s ease;
        }

        .carousel-card.active {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          z-index: 30;
        }

        .carousel-card.prev {
          opacity: 0.9;
          transform: translate(calc(-50% - 350px), -50%) scale(0.9);
          z-index: 20;
        }

        .carousel-card.next {
          opacity: 0.9;
          transform: translate(calc(-50% + 350px), -50%) scale(0.9);
          z-index: 20;
        }

        .carousel-card.hidden {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
          z-index: 10;
        }
      `}</style>

      <Header style="light" position="static" />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="container mx-auto px-8 text-center">
            <div className="text-6xl mb-6">✱</div>
            <h1 className="hero-text mb-6">
              FUNCIONALIDADES <br /> REVOLUCIONARIAS <br /> DE IA
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Descubre cómo nuestra inteligencia artificial transforma tu
              experiencia de moda con detección automática de prendas y estilos personalizados
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="pill-button pill-button-filled">Ver Demo</button>
              <button className="pill-button">Documentación API</button>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">
                Creador Inteligente de Outfits
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Combina automáticamente tus prendas para crear looks perfectos según la ocasión, clima y tus preferencias personales
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card gradient-card-1 rounded-3xl p-8 animate-slide-up">
                <div className="text-7xl mb-4">👔</div>
                <h3 className="text-2xl font-bold mb-3 uppercase">Detección Inteligente</h3>
                <p className="text-gray-800 leading-relaxed mb-6">
                  Reconocimiento automático de prendas, colores, texturas y estilos con IA de alta precisión. Nuestro sistema identifica hasta 50 categorías diferentes. 
                </p>
                <Link to="/detection" className="pill-button text-sm">Probar detección →</Link>
              </div>

              <div
                className="feature-card gradient-card-2 rounded-3xl p-8 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="text-7xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-3 uppercase">Creación de Outfits</h3>
                <p className="text-gray-800 leading-relaxed mb-6">
                  Combinaciones automáticas basadas en tendencias, ocasiones y preferencias personales. Crea looks perfectos en segundos. 
                </p>
                <button className="pill-button text-sm">Crear outfit →</button>
              </div>

              <div
                className="feature-card gradient-card-3 rounded-3xl p-8 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-7xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold mb-3 uppercase">IA Adaptativa</h3>
                <p className="text-gray-800 leading-relaxed mb-6">
                  Aprendizaje continuo de tus gustos y mejora constante de las recomendaciones con cada interacción que realizas. 
                </p>
                <button className="pill-button text-sm">Descubrir más →</button>
              </div>
            </div>
          </div>
        </section>

        {/* CAROUSEL SECTION */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold uppercase mb-4">
                Creador Inteligente de Outfits
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Combina automáticamente tus prendas para crear looks perfectos según la ocasión, clima y tus preferencias personales
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="relative h-[500px] flex items-center justify-center">
                {carouselCards.map((card, i) => (
                  <div key={i} className={`${getCardClass(i)} ${card.width}`}>
                    <div className={`${card.gradient.includes('gradient-card') ? card.gradient : `bg-gradient-to-br ${card.gradient}`} rounded-3xl p-8 shadow-xl`}>
                      <div className="mb-6">
                        {card.badges ? (
                          <div className="mb-4 flex gap-2">
                            <span className="badge bg-cyan-400 text-white border-2 border-black">✈</span>
                            <span className="badge bg-pink-400 text-white border-2 border-black">📋</span>
                            <span className="badge bg-orange-400 text-white border-2 border-black">⭕</span>
                            <span className="badge bg-purple-400 text-white border-2 border-black">👤</span>
                          </div>
                        ) : (
                          <div className="text-7xl mb-4">{card.emoji}</div>
                        )}
                        {card.badges && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-6 h-1 bg-black rounded-full"></div>
                              <div className="w-20 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                        )}
                        <h3 className={`text-2xl font-bold mb-3 ${card.gradient.includes('gradient-card') ? 'uppercase tracking-tight' : ''}`}>
                          {card.title}
                        </h3>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                      <button className="pill-button text-sm bg-transparent border-2 border-black">
                        Learn more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-8 mt-12">
                {/* Dots */}
                <div className="flex gap-2">
                  {[...Array(totalCards)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                        i === currentIndex ? 'bg-black' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    →
                  </button>
                </div>

                <button className="pill-button text-sm">Show all features →</button>
              </div>
            </div>
          </div>
        </section>

        {/* AI FEATURES GRID */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-8 relative text-center max-w-4xl">
            <div className="absolute top-4 left-0 bg-cyan-400 text-gray-900 px-6 py-4 rounded-full text-sm font-bold shadow-lg">
              Personalización
            </div>
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-6 py-4 rounded-full text-sm font-bold shadow-lg">
              Tiempo Real
            </div>
            <div className="absolute top-48 -left-24 bg-pink-500 text-white px-6 py-4 rounded-full text-sm font-bold shadow-lg">
              Preferencias
            </div>
            <div className="absolute top-44 -right-20 bg-orange-500 text-white px-6 py-4 rounded-full text-sm font-bold shadow-lg">
              Analytics
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
              Let's go places<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                together
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Nuestra IA aprende continuamente de tus preferencias para mejorar tu experiencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Get to know us →
              </a>
              <button className="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 text-black rounded-full font-bold hover:bg-gray-800 hover:text-white transition-all">
                Join the team →
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}