# LM Studio — site institucional v2.2

Site estático reconstruído do zero para funcionar como portfólio comercial e landing page institucional da LM Studio.

## Estrutura

- `index.html` — conteúdo, SEO básico e estrutura semântica
- `styles.css` — identidade visual, responsividade, estados de foco e motion
- `script.js` — menu mobile, progresso de leitura e revelações leves
- `assets/lm-logo.png` — logo fornecido pela marca

## Direção do projeto

A direção parte do documento-base da empresa: comunicar valor, gerar confiança e facilitar contato/agendamento. O visual usa somente a família cromática extraída da marca (off-white, azul-preto e aqua), com uma linguagem editorial mínima.

A linha aqua funciona como assinatura visual derivada do traço que conecta as letras do monograma LM.


## Ajuste de responsividade v2.1

A rodada v2.1 recalibra o primeiro viewport para reduzir espaço morto e melhorar hierarquia:

- header desktop reduzido para 68px;
- shell ampliado em telas grandes, com limites intermediários em 1440px;
- hero com menor espaçamento superior e menor distância entre eyebrow, título e texto comercial;
- título principal reduzido e com escala fluida menos agressiva;
- recuo editorial do título limitado com `clamp()` em vez de depender diretamente da largura da viewport;
- navegação e microtipografia aumentadas para leitura mais confortável;
- breakpoint adicional em 1100px para reorganizar o texto do hero antes do layout mobile;
- refinamento específico abaixo de 480px para evitar aperto no eyebrow e na nota lateral.

## Projetos exibidos

- MINIMAH — https://minimahjoias.github.io/
- Avelar — https://lucasmelot.github.io/barbeariapremium/
- LUMÉA — https://lucasmelot.github.io/esteticapremium/

As previews usam o Thum.io para gerar capturas atualizadas das páginas publicadas. Isso evita imagens genéricas e mantém a prévia sincronizada com o projeto. Se quiser eliminar essa dependência externa no futuro, substitua cada URL de `image.thum.io` por screenshots locais em `assets/`.

## Contato

Como o único canal fornecido no briefing foi o LinkedIn da LM Studio, os CTAs usam esse endereço:

https://www.linkedin.com/company/lm-studio-br/home/?viewAsMember=true

Quando houver WhatsApp comercial, e-mail ou formulário real, substitua esse link nos CTAs. Para conversão, um contato direto tende a ser melhor do que devolver o visitante ao LinkedIn.

## Publicação

Não há build. Publique a pasta diretamente em GitHub Pages, Netlify, Vercel ou hospedagem estática.

Antes de publicar em domínio próprio, recomenda-se adicionar:

1. `canonical` com a URL final.
2. `og:image` absoluto para compartilhamento social.
3. Canal de contato direto definitivo.
4. Analytics apenas se houver uma decisão clara sobre privacidade e medição.

## Portfólio / projetos v2.2

A seção de projetos foi reconstruída como uma sequência de mini-cases, não como uma galeria de thumbnails. Cada case tem:

- status real do trabalho (publicado ou demonstrativo);
- contexto do negócio;
- uma tese curta sobre o problema de comunicação;
- uma leitura do projeto explicando a lógica da experiência;
- três decisões objetivas de design/produto;
- link para a experiência navegável.

O layout é escalável: para adicionar um novo projeto, duplique um `<article class="project-case">` dentro de `.project-cases`. Em desktop, os cases alternam automaticamente imagem/texto via `:nth-child(even)`; no mobile todos empilham imagem primeiro e conteúdo depois. Nenhuma regra adicional de CSS é necessária para o 4º, 5º ou 6º projeto.

As capturas continuam sendo servidas pelo Thum.io, mas agora incluem dimensões explícitas (`width`/`height`), `loading="lazy"`, `decoding="async"` e prioridade baixa para reduzir CLS e evitar competição com o conteúdo acima da dobra. O parâmetro `noanimate` foi removido porque podia congelar páginas que iniciam elementos em estado de animação, gerando previews incompletas.
