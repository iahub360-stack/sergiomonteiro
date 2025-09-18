'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Instagram, Smartphone, Quote } from 'lucide-react';
import StarfieldBackground from '@/components/StarfieldBackground';
import HolographicSphere from '@/components/HolographicSphere';
import GeminiVisionModal from '@/components/GeminiVisionModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [topic, setTopic] = useState('');
  const revealElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      revealElementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
    }
  };

  const generateVision = async () => {
    if (!topic.trim()) {
      alert('Por favor, insira um tópico para análise.');
      return;
    }

    setIsModalOpen(true);
    setModalContent(
      <div className="flex flex-col items-center justify-center">
        <div className="loader"></div>
        <p className="mt-4 text-cyan-300">A gerar análise preditiva...</p>
      </div>
    );

    try {
      const response = await fetch('/api/gemini-vision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const result = await response.json();

      if (result.analysis) {
        setModalContent(
          <div className="text-left">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Análise sobre: {topic}</h3>
            <p className="text-gray-300 leading-relaxed">{result.analysis}</p>
            <p className="text-xs text-gray-500 mt-6 italic">Análise gerada por IA com base na expertise de Sérgio Monteiro.</p>
          </div>
        );
      } else {
        throw new Error('No analysis received');
      }
    } catch (error) {
      console.error('Error generating vision:', error);
      setModalContent(
        <div className="text-left">
          <h3 className="text-2xl font-bold text-red-400 mb-4">Erro</h3>
          <p className="text-gray-300 leading-relaxed">Ocorreu um erro ao gerar a análise. Por favor, tente novamente mais tarde.</p>
        </div>
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <StarfieldBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a1a] z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center">
          <HolographicSphere />

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white">Sérgio Monteiro</h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-cyan-300 neon-text">
            🔬 Pesquisador | ⚙️ Dev em Soluções Inteligentes, Tecnologia e Automação
          </p>
          <div className="mt-6 text-2xl font-bold text-white">
            🤖 O futuro com visão 360° 🌐
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Um português no coração do Brasil, com trajetória internacional em Supply Chain, Inovação e Inteligência Artificial.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#about" 
              className="px-8 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30"
            >
              Explorar Trajetória
            </a>
            <a 
              href="#tech-innovation" 
              className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              Tecnologia & Inovação
            </a>
            <a 
              href="/artigos" 
              className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              Artigos Editoriais
            </a>
          </div>
        </div>
      </section>

      <div className="space-y-24 md:space-y-32 py-24 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Sobre mim */}
        <section id="about" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-cyan-400 neon-text">Conectando Mundos</span>, Criando o Futuro
          </h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="relative inline-block">
                  <img 
                    src="/assets/sergio-profile-new.jpg" 
                    alt="Sérgio Monteiro" 
                    className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover mx-auto border-4 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute -inset-2 rounded-full bg-cyan-500/10 blur-xl opacity-50 pointer-events-none"></div>
                </div>
              </div>
              <div className="md:w-2/3 text-lg leading-relaxed text-gray-300 space-y-4 text-center md:text-left">
                <p>Nasci em Lisboa, cresci no Centro de Portugal, vivi e trabalhei mais de 15 anos em Paris e trilhei um percurso multicultural por vários continentes. Hoje, estou instalado em Anápolis (GO – Brasil), onde sigo transformando experiências globais em soluções tecnológicas locais.</p>
                <p>A minha jornada é um mapa de desafios logísticos e inovação: do interior de Marrocos — otimizando fluxos de leite nas montanhas do Rif — até os pipelines de suco de laranja em Ribeirão Preto e no Porto de Santos. Da cadeia de abastecimento de cacau e amendoim da Ferrero até a produção da Nutella nas megafábricas francesas. Da operação de milhares de lojas LIDL e ALDI até projetos premiados de Supply Chain, automação e inteligência de negócios.</p>
                <p>Atuei em mais de 15 países, conectando operações logísticas, pesquisa aplicada, automação industrial e tecnologia emergente. Hoje, aplico esse conhecimento em projetos de IA e automação no Brasil, com iniciativas que integram escala global e impacto local.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trajetória */}
        <section id="journey" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-cyan-400 neon-text">Trajetória</span> Profissional
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="ml-12 glass-card rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400">Gestão & Supply Chain</h3>
                <p className="mt-2 text-gray-400">Liderança em logística e aprovisionamento em redes multinacionais como Ferrero, LIDL e ALDI, otimizando cadeias de abastecimento complexas em escala global.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="ml-12 glass-card rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400">Tecnologia & Automação</h3>
                <p className="mt-2 text-gray-400">Desenvolvimento de projetos em IA aplicada, Business Intelligence e integração de fluxos digitais e físicos para automatizar e otimizar operações.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="ml-12 glass-card rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400">Educação & Mentoria</h3>
                <p className="mt-2 text-gray-400">Formação de equipes de alta performance, palestras em universidades (Portugal, França, Brasil) e voluntariado internacional (ONU África), partilhando conhecimento e inspirando futuros líderes.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="ml-12 glass-card rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400">Inovação & Pesquisa</h3>
                <p className="mt-2 text-gray-400">Fundador e desenvolvedor de soluções inteligentes nos ecossistemas IAHub360, NexFlowX e IAHub360 Labs, focados em pesquisa aplicada e automação.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visão 360 */}
        <section id="vision" ref={addToRefs} className="scroll-reveal text-center">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-light italic text-white leading-relaxed">
              "A minha missão é ser um arquiteto de inteligência, construindo pontes entre a estratégia de negócio e a tecnologia de ponta para criar fluxos de trabalho autónomos e eficientes."
            </p>
          </div>
        </section>

        {/* Tecnologia e Inovação */}
        <section id="tech-innovation" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-cyan-400 neon-text">Tecnologia</span> e Inovação
          </h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src="/assets/tech-cubes.jpg" 
                    alt="Tecnologia e Inovação" 
                    className="w-full h-auto object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/50 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400">Arquitetura de Soluções Inteligentes</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A tecnologia é a espinha dorsal da transformação digital. Desenvolvo soluções que combinam inteligência artificial, automação e análise de dados para criar sistemas adaptativos e eficientes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Integração de IA em processos de negócio para otimização e tomada de decisão</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Automação de fluxos de trabalho complexos com machine learning</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Desenvolvimento de ecossistemas tecnológicos escaláveis e sustentáveis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemini API Feature: Visão de Futuro */}
        <section id="gemini-vision" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Visão de <span className="text-cyan-400 neon-text">Futuro</span></h2>
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-300 mb-6">Qual tendência tecnológica ou desafio de negócio gostaria de explorar? Peça uma análise preditiva baseada na minha experiência.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: O futuro da IA na logística..." 
                className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
              />
              <button 
                onClick={generateVision}
                className="px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
              >
                ✨ Gerar Análise Preditiva
              </button>
            </div>
          </div>
        </section>

        {/* Projetos Atuais */}
        <section id="projects" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ecossistemas de <span className="text-cyan-400 neon-text">Inovação</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a 
              href="https://iahub360.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block glass-card rounded-2xl p-8 text-center hover:border-cyan-400 hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">🌐 IAHub360</h3>
              <p className="mt-2 text-cyan-200">Arquitetos de Inteligência</p>
              <p className="mt-4 text-gray-400">Plataforma central de soluções de IA para otimização de processos de negócio.</p>
            </a>
            <a 
              href="https://labs.iahub360.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block glass-card rounded-2xl p-8 text-center hover:border-cyan-400 hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">🔬 IAHub360 Labs</h3>
              <p className="mt-2 text-cyan-200">Laboratório de Pesquisa Aplicada</p>
              <p className="mt-4 text-gray-400">Onde a curiosidade encontra a tecnologia para explorar o futuro da automação.</p>
            </a>
            <a 
              href="https://nexflowx.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block glass-card rounded-2xl p-8 text-center hover:border-cyan-400 hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white">⚡ NexFlowX</h3>
              <p className="mt-2 text-cyan-200">Automação de Fluxos Inteligentes</p>
              <p className="mt-4 text-gray-400">Soluções que transformam tarefas complexas em fluxos de trabalho simples e autónomos.</p>
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" ref={addToRefs} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Vamos <span className="text-cyan-400 neon-text">Conectar</span></h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-lg text-gray-300">Disponível para colaborações, projetos e novos desafios.</p>
                <p className="text-sm text-gray-500 mt-1">Anápolis (BR) · Lisboa (PT) · Paris (FR)</p>
              </div>
              <div className="flex items-center gap-6">
                <a 
                  href="mailto:sergiomonteiro@iahub360.com" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-8 h-8" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sergiofilipemonteiro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
                <a 
                  href="https://www.instagram.com/sergiomonteiro.iahub360/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Instagram className="w-8 h-8" />
                </a>
                <a 
                  href="https://wa.me/5562992887416" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Smartphone className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-gray-500">&copy; 2025 Sérgio Monteiro. Desenvolvido com visão 360°.</p>
      </footer>

      {/* Gemini Result Modal */}
      <GeminiVisionModal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </GeminiVisionModal>
    </div>
  );
}