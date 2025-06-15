"use client";
import { tools } from "@/lib/apps";
import { useState } from "react";
import { Zap, ArrowRight, Brain, Cpu } from "lucide-react";

export default function Apps() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getGridClass = () => {
    const itemCount = tools.length;
    if (itemCount >= 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    } else if (itemCount === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6";
    } else {
      return "grid grid-cols-1 gap-6";
    }
  };

  return (
    <section id="apps-section" className="relative bg-black py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-mono">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400"></span>
              <Zap className="w-4 h-4" />
              <span>AI SOLUTIONS</span>
              <Zap className="w-4 h-4" />
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400"></span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Choose Your <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text">Neural Interface</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select from our arsenal of AI-powered tools. Each solution is engineered for maximum efficiency in the digital age.
          </p>
        </div>

        {/* Apps grid */}
        <div className={getGridClass()}>
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className="group relative block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
              
              {/* Card content */}
              <div className="relative h-full bg-black/80 border border-cyan-400/30 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/60 group-hover:transform group-hover:-translate-y-1">
                {/* Scan line effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-all duration-1000 ${hoveredIndex === index ? 'translate-y-full' : '-translate-y-full'}`}></div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-cyan-400 transition-colors">
                  {tool.title}
                </h3>

                {/* Cyber image placeholder */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-400/20">
                  {/* Dynamic graphics based on tool type */}
                  {index === 0 && (
                    // GPT Marketing Generator
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur-xl opacity-60"></div>
                        <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-cyan-400" />
                        <div className="absolute -top-8 -left-8 w-12 h-12 bg-pink-500/50 rounded animate-pulse"></div>
                        <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-purple-500/50 rounded animate-pulse delay-300"></div>
                      </div>
                    </div>
                  )}
                  {index === 1 && (
                    // Chat with PDF
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative transform rotate-6">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="absolute bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/50 rounded-lg"
                               style={{ 
                                 width: '100px', 
                                 height: '130px',
                                 top: `${i * -5}px`,
                                 left: `${i * -5}px`,
                                 transform: `rotate(${i * -3}deg)`
                               }}>
                            <div className="p-2 space-y-1">
                              <div className="h-1 bg-purple-400/50 rounded w-3/4"></div>
                              <div className="h-1 bg-purple-400/30 rounded w-full"></div>
                              <div className="h-1 bg-purple-400/30 rounded w-5/6"></div>
                            </div>
                          </div>
                        ))}
                        <Cpu className="absolute bottom-2 right-2 w-6 h-6 text-purple-400 animate-pulse" />
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    // Speech to Text
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-end gap-1 h-32">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} 
                               className="w-1.5 bg-gradient-to-t from-pink-500 to-cyan-400 rounded-t animate-pulse"
                               style={{ 
                                 height: `${Math.sin(i * 0.3) * 40 + 50}%`,
                                 animationDelay: `${i * 0.05}s`,
                                 opacity: 0.8
                               }}></div>
                        ))}
                      </div>
                      <Zap className="absolute top-4 right-4 w-6 h-6 text-pink-400 animate-pulse" />
                    </div>
                  )}
                  {index === 3 && (
                    // See with GPT
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 border-4 border-cyan-400/50 rounded-full animate-pulse"></div>
                        <div className="absolute inset-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full">
                          <div className="absolute inset-3 bg-black rounded-full"></div>
                          <div className="absolute inset-6 bg-gradient-to-br from-cyan-400 to-white rounded-full"></div>
                        </div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} 
                               className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
                               style={{
                                 transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                                 animation: 'pulse 2s infinite',
                                 animationDelay: `${i * 0.5}s`
                               }}></div>
                        ))}
                      </div>
                    </div>
                  )}
                  {index === 4 && (
                    // Text to Speech
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-lg animate-pulse"></div>
                        {[...Array(3)].map((_, i) => (
                          <div key={i} 
                               className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping"
                               style={{
                                 animationDelay: `${i * 0.5}s`,
                                 animationDuration: '2s'
                               }}></div>
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-2 bg-gradient-to-t from-purple-500 to-pink-400 rounded animate-pulse"
                               style={{ 
                                 height: `${Math.random() * 20 + 10}px`,
                                 animationDelay: `${i * 0.1}s`
                               }}></div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-mono bg-black/50 border border-purple-500/30 text-purple-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-mono">INITIALIZE</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -20px -20px; }
          100% { background-position: 20px 20px; }
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </section>
  );
}