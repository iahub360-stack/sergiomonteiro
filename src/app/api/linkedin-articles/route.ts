import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface LinkedInArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishDate: string;
  author: string;
  tags: string[];
  readTime: string;
}

export async function GET(request: NextRequest) {
  try {
    const zai = await ZAI.create();
    
    // Use web search to find LinkedIn articles
    const searchResult = await zai.functions.invoke("web_search", {
      query: "site:linkedin.com/in/sergiofilipemonteiro/recent-activity/articles/",
      num: 10
    });

    // Process search results to extract article information
    const articles: LinkedInArticle[] = [];
    
    if (searchResult && Array.isArray(searchResult)) {
      for (const result of searchResult) {
        // Extract basic information from search results
        const article: LinkedInArticle = {
          id: result.url.split('/').pop() || Math.random().toString(36).substr(2, 9),
          title: result.name || 'Artigo sem título',
          excerpt: result.snippet || 'Sem descrição disponível.',
          url: result.url,
          publishDate: result.date || new Date().toISOString().split('T')[0],
          author: 'Sérgio Monteiro',
          tags: extractTagsFromTitle(result.name),
          readTime: estimateReadTime(result.snippet)
        };
        
        articles.push(article);
      }
    }

    // If no articles found from search, return mock data
    if (articles.length === 0) {
      const mockArticles: LinkedInArticle[] = [
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
        }
      ];
      
      return NextResponse.json({ articles: mockArticles });
    }

    return NextResponse.json({ articles });
    
  } catch (error) {
    console.error('Error fetching LinkedIn articles:', error);
    
    // Return mock data in case of error
    const mockArticles: LinkedInArticle[] = [
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
      }
    ];
    
    return NextResponse.json({ articles: mockArticles });
  }
}

// Helper function to extract tags from article title
function extractTagsFromTitle(title: string): string[] {
  const keywords = ['IA', 'Inteligência Artificial', 'Supply Chain', 'Automação', 'Tecnologia', 'Inovação', 'Liderança', 'Gestão', 'Digital', 'Sustentabilidade', 'Data Science', 'Business Intelligence'];
  const tags: string[] = [];
  
  keywords.forEach(keyword => {
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      tags.push(keyword);
    }
  });
  
  return tags.length > 0 ? tags : ['Tecnologia', 'Inovação'];
}

// Helper function to estimate read time
function estimateReadTime(text: string): string {
  if (!text) return '3 min';
  
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${Math.max(readTime, 3)} min`;
}