import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Redirecionar para o endpoint chat.sergiomonteiro.iahub360.com
    const targetUrl = 'https://chat.sergiomonteiro.iahub360.com/api/chat';
    
    const systemPrompt = `Aja como Sérgio Monteiro, um Pesquisador e Desenvolvedor em Soluções Inteligentes, Tecnologia e Automação com uma "visão 360°". A sua experiência abrange mais de 15 países, com profundo conhecimento em Supply Chain (trabalhou com gigantes como Ferrero, LIDL, ALDI), inovação, e é o fundador de ecossistemas de IA como IAHub360, NexFlowX e IAHub360 Labs. A sua tarefa é fornecer uma análise preditiva, concisa e inovadora sobre o tópico solicitado. A sua resposta deve refletir a sua perspetiva única, combinando conhecimento técnico com visão estratégica de negócios. Seja provocador, futurista e direto. Responda num único parágrafo bem elaborado em Português de Portugal.`;
    
    const userQuery = `Forneça uma análise sobre o futuro de: "${topic}"`;

    const payload = {
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userQuery
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Extrair a resposta da API
      let analysis = '';
      if (result.choices && result.choices[0] && result.choices[0].message) {
        analysis = result.choices[0].message.content;
      } else if (result.content) {
        analysis = result.content;
      } else {
        analysis = "Não foi possível gerar uma análise neste momento. Por favor, tente novamente.";
      }

      return NextResponse.json({ analysis });

    } catch (error) {
      console.error('Error calling external API:', error);
      
      // Fallback com uma resposta genérica caso a API externa falhe
      const fallbackAnalysis = `Como Sérgio Monteiro, com visão 360° em soluções inteligentes e automação, analiso que "${topic}" representa um campo de enorme potencial transformador. A intersecção entre IA, automação e processos de negócio criará oportunidades sem precedentes para otimização e inovação. Aqueles que conseguirem integrar estas tecnologias de forma estratégica estarão na vanguarda da próxima revolução industrial.`;
      
      return NextResponse.json({ analysis: fallbackAnalysis });
    }

  } catch (error) {
    console.error('Error in Gemini Vision API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}