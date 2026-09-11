# LM Studio — site institucional v2.3 (performance)

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

As prévias são arquivos locais em `assets/projects/`. MINIMAH mantém a imagem e a composição já fornecidas. Avelar e LUMÉA usam as mesmas capturas obtidas das URLs anteriores, convertidas para WebP sem perda de pixels na resolução completa. Não há consulta ao Thum.io durante a visita. As prévias são estáticas: quando o visual de um projeto mudar, substitua suas imagens locais.

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

Na versão v2.2, Avelar e LUMÉA dependiam de capturas externas solicitadas com carregamento tardio. A versão v2.3 abaixo remove essa dependência, mantendo as dimensões declaradas e as regras de enquadramento originais.


## Otimização de performance v2.3

### O que foi corrigido

- Avelar e LUMÉA deixaram de depender da resposta do serviço externo de screenshots. Na consulta feita durante esta revisão, cada URL levou aproximadamente 12 segundos para responder; isso é uma observação desse teste, não uma garantia sobre todas as visitas.
- As capturas agora estão em `assets/projects/avelar-{640,960,1400}.webp` e `assets/projects/lumea-{640,960,1400}.webp`. O navegador escolhe somente a variante adequada à largura da tela e à densidade de pixels por meio de `srcset` e `sizes`.
- As duas capturas completas de 1400 px têm exatamente os mesmos pixels RGB das imagens recebidas do serviço. As versões de 640 e 960 px foram redimensionadas proporcionalmente e codificadas sem perdas adicionais.
- As três prévias usam `loading="eager"`, `fetchpriority="low"` e `decoding="async"`: podem começar a baixar ainda na primeira tela, sem esperar a rolagem até o case. A prioridade baixa evita dar a elas a mesma prioridade dos recursos críticos. Não é necessário JavaScript para carregar as imagens.
- O logo PNG foi recompactado de 67.518 para 45.750 bytes, mantendo resolução e pixels.
- O progresso de leitura e o cabeçalho agora agrupam eventos de rolagem e redimensionamento em uma atualização por quadro, usando `requestAnimationFrame`. Menu e animações de entrada mantêm o comportamento existente.
- `script.js` usa `defer`. Nenhuma biblioteca, dependência de build ou configuração de servidor foi adicionada.

### Tamanho das duas capturas (soma de Avelar e LUMÉA)

| Versão | Bytes | Redução sobre as respostas originais |
| --- | ---: | ---: |
| Respostas PNG do serviço anterior | 1.699.157 | — |
| WebP local, 1400 px cada | 781.790 | 54,0% |
| WebP local, 960 px cada | 485.462 | 71,4% |
| WebP local, 640 px cada | 247.310 | 85,4% |

Esses percentuais medem o peso dos arquivos, não o tempo total de carregamento. A variante escolhida depende também da densidade de pixels do dispositivo. Em uma tela de celular de alta densidade, o navegador pode escolher uma imagem maior. O ZIP contém todas as variantes para publicação, mas cada visita não precisa baixar todas elas.

### Preservação e verificações

- Estrutura do HTML, textos, links, classes, dimensões declaradas e atributos de acessibilidade comparados com o ZIP enviado: preservados, exceto os atributos necessários ao carregamento otimizado.
- `styles.css` e os arquivos legados em `css/` e `js/`: idênticos aos originais. A página continua usando `styles.css` e `script.js` da raiz.
- Imagem original e composição da MINIMAH: preservadas.
- Integridade das imagens e referências de arquivos locais: verificadas.
- Sintaxe do JavaScript principal: verificada com `node --check`.
- Esta revisão foi validada por inspeção e comparação de arquivos; não inclui medição de Lighthouse nem teste visual em navegador da página publicada.

### Como publicar e manter

1. Extraia o ZIP e substitua os arquivos do portfólio pelos arquivos desta versão. Mantenha `index.html` na raiz publicada.
2. Envie também toda a pasta `assets/`, incluindo as seis novas imagens dos projetos. Não basta substituir apenas o HTML.
3. Publique pelo fluxo que você já utiliza. Não há instalação nem build.
4. Se uma aba antiga continuar mostrando a versão anterior, recarregue com `Ctrl + F5`.
5. Quando um projeto mudar de aparência, atualize as três variantes correspondentes em `assets/projects/`, preservando a mesma proporção entre elas. Para as atuais capturas, as dimensões são 640 × 480, 960 × 720 e 1400 × 1050 px. Os links para abrir os sites continuam apontando para os projetos publicados.
