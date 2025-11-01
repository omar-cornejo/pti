import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Gallery() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col font-[Space_Grotesk]">
      {/* === Estilos internos === */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .hero-text {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .pill-button {
          border: 3px solid #000;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          display: inline-block;
          background-color: #000;
          color: #fff;
        }

        .pill-button:hover {
          background-color: #fff;
          color: #000;
          transform: translateY(-2px);
        }

        .pill-button-outline {
          border: 3px solid #000;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          display: inline-block;
          background-color: #fff;
          color: #000;
        }

        .pill-button-outline:hover {
          background-color: #000;
          color: #fff;
          transform: translateY(-2px);
        }

        .filter-card {
          border: 3px solid #000;
          background: #fff;
          transition: all 0.3s ease;
        }

        .filter-card:hover {
          transform: translateY(-2px);
          box-shadow: 6px 6px 0px #000;
        }

        .product-card {
          border: 3px solid #000;
          background: #fff;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0px #000;
        }

        .filter-tag {
          border: 2px solid #000;
          background: #fff;
          transition: all 0.3s ease;
          border-radius: 50px;
          padding: 8px 16px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .filter-tag:hover {
          background-color: #000;
          color: #fff;
          transform: translateY(-1px);
        }

        .filter-tag.active {
          background-color: #000;
          color: #fff;
        }

        .checkbox-custom {
          border: 2px solid #000;
          background: #fff;
          transition: all 0.2s ease;
        }

        .checkbox-custom:checked {
          background-color: #000;
          border-color: #000;
        }

        .color-swatch {
          border: 3px solid #000;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .color-swatch:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 2px #000;
        }

        .size-button {
          border: 2px solid #000;
          background: #fff;
          transition: all 0.3s ease;
          font-weight: 700;
          text-transform: uppercase;
        }

        .size-button:hover {
          background-color: #000;
          color: #fff;
          transform: translateY(-1px);
        }

        .size-button.active {
          background-color: #000;
          color: #fff;
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

      {/* Header */}
      <Header style="light" position="static" />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-8 py-16">
          {/* HERO */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="text-5xl mb-4">✱</div>
            <h1 className="hero-text mb-6">STYLE<br />GALLERY</h1>
            <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
              Descubre moda curada por AI de las mejores marcas del mundo
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside
              className="w-full lg:w-80 flex-shrink-0 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="filter-card rounded-lg p-8 sticky top-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Filtros</h3>
                  <button className="pill-button-outline">Limpiar</button>
                </div>

                {/* Recomendaciones AI */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      id="ai-rec"
                      defaultChecked
                      className="checkbox-custom w-5 h-5 rounded focus:ring-0"
                    />
                    <label htmlFor="ai-rec" className="font-bold">
                      Recomendaciones AI
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Basado en tus preferencias de estilo
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="filter-tag active">Minimalista</span>
                    <span className="filter-tag">Casual</span>
                    <span className="filter-tag">Verano</span>
                  </div>
                </div>

                <hr className="my-8 border-2 border-black" />

                {/* Marcas */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">Marcas</h4>
                  <div className="space-y-3">
                    {["ZARA (234)", "H&M (189)", "UNIQLO (156)", "COS (98)", "ARKET (87)"].map(
                      (b) => (
                        <label
                          key={b}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="checkbox-custom w-4 h-4 rounded"
                          />
                          <span className="font-medium">{b}</span>
                        </label>
                      )
                    )}
                  </div>
                  <button className="pill-button-outline mt-4">Ver Más</button>
                </div>

                <hr className="my-8 border-2 border-black" />

                {/* Categorías */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">Categoría</h4>
                  <div className="space-y-3">
                    {["Camisetas", "Pantalones", "Vestidos", "Chaquetas", "Zapatos"].map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="checkbox-custom w-4 h-4 rounded"
                        />
                        <span className="font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="my-8 border-2 border-black" />

                {/* Rango de Precio */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">Rango de Precio</h4>
                  <div className="space-y-3">
                    {["$0 - $50", "$50 - $100", "$100 - $200", "$200+"].map((p) => (
                      <label
                        key={p}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="checkbox-custom w-4 h-4 rounded"
                        />
                        <span className="font-medium">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="my-8 border-2 border-black" />

                {/* Colores */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">Colores</h4>
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      "black",
                      "white",
                      "gray-500",
                      "red-500",
                      "blue-500",
                      "green-500",
                      "yellow-500",
                      "purple-500",
                      "pink-500",
                      "orange-500",
                      "indigo-500",
                      "teal-500",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`color-swatch w-10 h-10 bg-${color} rounded-full`}
                      ></button>
                    ))}
                  </div>
                </div>

                <hr className="my-8 border-2 border-black" />

                {/* Tallas */}
                <div>
                  <h4 className="font-bold text-lg mb-4">Talla</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((s, i) => (
                      <button
                        key={s}
                        className={`size-button py-3 px-4 rounded-lg ${
                          s === "M" ? "active" : ""
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Gallery Grid */}
            <section
              className="flex-1 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Barra superior */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div className="flex items-center space-x-4">
                  <p className="font-medium">Mostrando 1,247 resultados</p>
                  <button className="pill-button-outline">🔥 Trending</button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-medium">Ordenar por:</span>
                  <select className="border-3 border-black rounded-lg px-4 py-2 font-medium bg-white">
                    <option>Relevancia</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                    <option>Más Nuevo</option>
                  </select>
                  <button className="pill-button">⊞ Grid</button>
                  <button className="pill-button-outline">☰ Lista</button>
                </div>
              </div>

              {/* Productos */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { color: "gray-100", tag: "AI Pick", name: "Camiseta Minimalista", brand: "ARKET", price: "$49" },
                  { color: "blue-50", tag: "Nuevo", name: "Blazer Estructurado", brand: "COS", price: "$159" },
                  { color: "amber-50", name: "Vestido Fluido", brand: "ZARA", price: "$89" },
                  { color: "green-50", tag: "Sale", name: "Pantalón Wide Leg", brand: "H&M", price: "$35", old: "$59" },
                  { color: "purple-50", name: "Top Asimétrico", brand: "UNIQLO", price: "$29" },
                  { color: "rose-50", tag: "AI Pick", name: "Chaqueta Oversize", brand: "ARKET", price: "$199" },
                ].map((p, i) => (
                  <div key={i} className="product-card rounded-lg overflow-hidden">
                    <div className={`relative bg-${p.color} aspect-square`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-32 bg-black/70 rounded-lg"></div>
                      </div>
                      {p.tag && (
                        <div className="absolute top-4 left-4">
                          <span
                            className={`pill-button ${
                              p.tag === "Nuevo" ? "pill-button-outline" : ""
                            } text-xs`}
                          >
                            {p.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                      <p className="text-gray-600 mb-3">{p.brand}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xl">{p.price}</span>
                          {p.old && (
                            <span className="text-gray-500 line-through ml-2">
                              {p.old}
                            </span>
                          )}
                        </div>
                        <button className="pill-button-outline">Ver</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              <div className="flex items-center justify-center space-x-3 mt-16">
                <button className="pill-button-outline" disabled>
                  ←
                </button>
                <button className="pill-button">1</button>
                <button className="pill-button-outline">2</button>
                <button className="pill-button-outline">3</button>
                <span className="text-gray-400">...</span>
                <button className="pill-button-outline">42</button>
                <button className="pill-button-outline">→</button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
