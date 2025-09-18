'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import StarfieldBackground from '@/components/StarfieldBackground';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishDate: string;
  author: string;
  tags: string[];
  readTime: string;
}

export default function ArtigosPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // Fetch articles from LinkedIn API
    const fetchArticles = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/linkedin-articles');
        const result = await response.json();
        
        if (result.articles && Array.isArray(result.articles)) {
          setArticles(result.articles);
        } else {
          // Fallback to mock data if API fails
          const mockArticles: Article[] = [
            {
              id: '1',
              title: 'O Futuro da Inteligência Artificial na Supply Chain',
              excerpt: 'Explorando como a IA está transformando a gestão de cadeias de suprimentos e criando novas oportunidades para otimização e eficiência.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2024-01-15',
              author: 'Sérgio Monteiro',
              tags: ['IA', 'Supply Chain', 'Inovação'],
              readTime: '5 min'
            },
            {
              id: '2',
              title: 'Automação Industrial: Da Teoria à Prática',
              excerpt: 'Como implementar soluções de automação em ambientes industriais, lições aprendidas e casos de sucesso em projetos globais.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2024-01-10',
              author: 'Sérgio Monteiro',
              tags: ['Automação', 'Indústria 4.0', 'Tecnologia'],
              readTime: '7 min'
            },
            {
              id: '3',
              title: 'Sustentabilidade e Tecnologia: Um Caminho Necessário',
              excerpt: 'A intersecção entre sustentabilidade e inovação tecnológica, e como as empresas podem se beneficiar dessa sinergia.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2024-01-05',
              author: 'Sérgio Monteiro',
              tags: ['Sustentabilidade', 'Tecnologia', 'ESG'],
              readTime: '6 min'
            },
            {
              id: '4',
              title: 'Gestão de Talentos na Era Digital',
              excerpt: 'Estratégias para atrair, desenvolver e reter talentos em um mundo cada vez mais digital e conectado.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2023-12-28',
              author: 'Sérgio Monteiro',
              tags: ['Gestão', 'Talentos', 'Digital'],
              readTime: '4 min'
            },
            {
              id: '5',
              title: 'Data Science: Transformando Dados em Decisões',
              excerpt: 'Como a ciência de dados está revolucionando a tomada de decisão empresarial e criando vantagens competitivas.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2023-12-20',
              author: 'Sérgio Monteiro',
              tags: ['Data Science', 'Análise', 'Business Intelligence'],
              readTime: '8 min'
            },
            {
              id: '6',
              title: 'O Papel da Liderança na Transformação Digital',
              excerpt: 'Como os líderes podem guiar suas organizações através da transformação digital, superando desafios e aproveitando oportunidades.',
              url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
              publishDate: '2023-12-15',
              author: 'Sérgio Monteiro',
              tags: ['Liderança', 'Transformação Digital', 'Gestão'],
              readTime: '6 min'
            }
          ];
          setArticles(mockArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        
        // Fallback to mock data
        const mockArticles: Article[] = [
          {
            id: '1',
            title: 'O Futuro da Inteligência Artificial na Supply Chain',
            excerpt: 'Explorando como a IA está transformando a gestão de cadeias de suprimentos e criando novas oportunidades para otimização e eficiência.',
            url: 'https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/',
            publishDate: '2024-01-15',
            author: 'Sérgio Monteiro',
            tags: ['IA', 'Supply Chain', 'Inovação'],
            readTime: '5 min'
          }
        ];
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealElementsRef.current.includes(el)) {
      revealElementsRef.current.push(el);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header with background */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        <StarfieldBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a1a] z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center">
          <Link 
            href="/" 
            className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Início
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white">
            Artigos Editoriais
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-cyan-300 neon-text">
            📝 Reflexões e Insights sobre Tecnologia, Inovação e Liderança
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Uma coleção de artigos e reflexões publicados no LinkedIn, compartilhando conhecimento e experiências adquiridas ao longo da minha jornada profissional.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="loader mx-auto"></div>
              <p className="mt-4 text-cyan-300">A carregar artigos...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div 
                key={article.id}
                ref={addToRefs}
                className="scroll-reveal glass-card rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {article.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    Ler no LinkedIn
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* LinkedIn Profile Link */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Mais Artigos no LinkedIn
            </h3>
            <p className="text-gray-300 mb-6">
              Acompanhe minha atividade no LinkedIn para acessar todos os artigos e insights compartilhados regularmente sobre tecnologia, inovação e liderança.
            </p>
            <a 
              href="https://www.linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30"
            >
              Ver Perfil no LinkedIn
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-gray-500">&copy; 2025 Sérgio Monteiro. Artigos e reflexões com visão 360°.</p>
      </footer>
    </div>
  );
}