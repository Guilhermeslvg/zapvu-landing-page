# Contrato de design: landing page do Zapvu

Versão 2 · 16/11/2026 (a marca oficial chegou e substituiu o lima e o wordmark provisório da versão 1). Este arquivo manda no visual e nos textos da página.

> **Marca oficial (manda sobre todo o resto).** Arquivos em `assets/brand/`: `zapvu-logo-horizontal.png` (símbolo + "zapvu", oliva e lima, fundo transparente), `zapvu-simbolo.png` (só o símbolo, lima, transparente), `zapvu-icone-quadrado.png` e `zapvu-icone-redondo.png` (símbolo lima sobre oliva). O símbolo é um raio dentro de um balão de conversa, montado com duas peças em diagonal. Cores da marca: **lima `#D5FF26`** e **oliva `#1E2104`**. Onde este contrato fala em "lima" ou `--accent`, é o lima da marca, e onde fala em `--ink`, é o oliva. Se algo aqui brigar com uma skill, vale o que está aqui, e a gente atualiza o arquivo em vez de improvisar no código. Leia junto com `docs/estudo-concorrentes.md`.

Como foi feito: direção sorteada e escolhida com a skill `design-taste-frontend` (direção "o produto se apresenta", semente 1234932561, salva em `.taste-skill/direction.json`), regras da `sem-cara-de-ia` e da `hallmark` (gênero modern-minimal, tema próprio). Trocas feitas no sorteio, com o motivo:
- Tipografia: saiu Clash Grotesk (Fontshare), entrou **Archivo** (Google Fonts), porque o briefing pede Google Fonts.
- Paleta: o sorteio deu um verde-petróleo (#0d7480), que é praticamente o verde-azulado clássico do WhatsApp. Ficaram os neutros sorteados ("gelo e ardósia") e o acento virou lima; na versão 2 o lima saiu e entrou o lima da marca oficial.
- Hero: o primeiro sorteio ("coluna numa linha", 80% vazio e demo espiando no rodapé) não cabia a demo interativa que o briefing exige. Foi trocado por "frase partida por um quadro", que põe a demo no centro da tela.

---

## 1. A ideia central

**Você vê a mensagem chegar.**

Todo concorrente diz "conecte em 5 minutos" e mostra código parado. O Zapvu abre a página fazendo o trabalho na frente do visitante: ele escreve a própria mensagem, vê o token, o QR code, a requisição e, no fim, a mensagem chegando num celular, com o status mudando de enviada para entregue e depois para lida.

A frase que guia tudo: *nesta página, o caminho de uma mensagem, do seu sistema até ser lida no celular, vira a demonstração que abre a página e o fio que liga as seções.* O texto que o visitante digita no hero aparece de novo no bloco de código, nas quatro linguagens. A palavra "lida" é o ponto de chegada da página inteira.

De onde veio: o nome. "Zap" é como o brasileiro chama o WhatsApp, e "vu" lembra "visto". O momento em que a mensagem é vista é o que o produto entrega. (É leitura nossa do nome. Perguntar ao chefe se é isso mesmo; se não for, a ideia continua valendo sem citar o nome.)

**O teste do concorrente:** a Maytapi também mostra balões chegando, mas é animação em loop e o visitante não mexe em nada. Nenhuma das onze páginas estudadas deixa a pessoa escrever a mensagem e acompanhar o caminho dela. Isso só o Zapvu tem.

**A coisa viva da página:** o campo "Mensagem" do hero. O visitante troca o texto, aperta "Enviar" e vê o resultado no celular desenhado e no JSON de resposta. O mesmo texto passa para as abas de código. Funciona com o polegar no celular e, sem JavaScript, a página mostra os quatro estados da demo empilhados, com o texto de exemplo.

**Uma ousadia só:** a demo do hero e o campo lima do CTA final. O resto da página é calmo: fundo claro, texto oliva, muito espaço, fragmentos do produto em tamanho real.

### Por que essa direção e não outra

| Quem | Visual | O que o Zapvu faz diferente |
| --- | --- | --- |
| Z-API, W-API, MegaAPI | fundo preto, verde neon, brilho, 3D | fundo claro, sem brilho, sem 3D |
| uazapi | azul-marinho, ilustração de foguete | nada de ilustração de banco; a imagem é o produto |
| Whapi | roxo, blobs, mão 3D com celular | cor chapada, nenhuma forma decorativa |
| Evolution, WPPConnect, Green-API | off-white com verde | lima como cor de marca, verde só para status "conectada" |
| Maytapi | branco com índigo, mono em todo rótulo, 13 seções numeradas | mono só dentro de código, nada de numeração, 10 seções |
| Wassenger | cinza Apple, azul, glow | cinza puxado para a ardósia, sem glow |

A marca é lima e oliva. O risco é parecer com Z-API, W-API e MegaAPI, que usam verde neon sobre preto. Para fugir disso, a página é clara (neutros puxados para o oliva), o oliva é a cor do texto e dos blocos escuros, e o lima aparece chapado em poucos lugares, sem brilho e sem glow. O lima é amarelado e o verde do WhatsApp é azulado, então eles não se confundem, desde que o verde de status (`--ok`) fique só dentro dos fragmentos do produto.

---

## 2. Tokens

Tudo sai daqui. No CSS, nenhuma cor ou fonte fora de `var(--...)`. Se faltar um valor, cria o token aqui primeiro.

### 2.1 Cores

| Token | Hex | Função |
| --- | --- | --- |
| `--bg` | `#F5F6EE` | fundo da página (claro, puxado para o oliva) |
| `--surface` | `#EBEDE0` | painéis, abas, linhas alternadas da tabela, quadros da demo |
| `--surface-2` | `#DEE1CF` | um degrau mais escuro: aba ativa por cima de surface, faixas alternadas, balão enviado no celular |
| `--ink` | `#1E2104` | **oliva da marca**: texto principal, blocos escuros, campo do código, botão principal em fundo claro |
| `--muted` | `#585C44` | texto de apoio e legendas (conferir 4,5:1 ou mais no `--bg`) |
| `--accent` | `#D5FF26` | **lima da marca**: blocos de destaque (coluna de preço escolhida, ladrilho das integrações, campo do CTA final), texto e detalhe sobre o oliva |
| `--accent-ink` | `#1E2104` | texto em cima do lima (o oliva) |
| `--accent-hover` | `#C6F00F` | hover de botão lima |
| `--accent-deep` | `#4E6100` | verde-oliva escuro para texto, link ou ícone de destaque sobre fundo claro (o lima não serve para texto em fundo claro); usar pouco |
| `--accent-soft` | `#F0FBC2` | faixa clara de lima: chaves ligadas na seção de ban, linha destacada |
| `--code-bg` | `#1E2104` | fundo dos blocos de código (é o `--ink`) |
| `--code-bg-2` | `#2A2E0C` | fundo da resposta JSON, um degrau acima do código |
| `--code-text` | `#ECEFDF` | texto do código |
| `--code-string` | `#D5FF26` | strings no código (o lima) |
| `--code-key` | `#C3C9A4` | chaves de JSON e nomes de propriedade |
| `--code-comment` | `#9AA07C` | comentários (conferir 4,5:1 sobre o fundo do código) |
| `--ok` | `#1F8A4C` | só dentro dos fragmentos do produto: "conectada", "entregue" |
| `--error` | `#B42318` | mensagens de erro de formulário e status "desconectada" |
| `--focus` | `#1E2104` | anel de foco em fundo claro (2px, com 2px de folga, sem animação); em fundo oliva, o anel é `--accent` |
| `--white` | `#FFFFFF` | balão recebido dentro do celular, campo de texto |

Proporção na página: uns 80% de `--bg` e `--surface`, 10 a 15% de `--ink` (texto, o campo do código e o rodapé), lima em no máximo uma coisa por tela, fora o CTA final, que é a única tela inteira lima.

**Botão principal:** em fundo claro, é oliva (`--ink`) com texto lima, igual ao ícone do app. Em fundo oliva ou lima, inverte: lima com texto oliva, ou oliva com texto lima. Lima nunca vai como texto ou linha fina em fundo claro (some).

Regras de cor:
- O verde aparece só como status dentro dos fragmentos ("conectada", "entregue"). Nunca em botão, título ou logo.
- O azul dos tiques de "lida" do WhatsApp não entra. O status "lida" é escrito por extenso.
- Superfícies se separam por degrau de tom, nunca por linha ou sombra.
- Tema escuro: não tem na primeira versão. A página força o claro (`color-scheme: light`).

### 2.2 Tipografia

Duas famílias, carregadas do Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **Archivo** (variável, largura 100 a 125, peso 400 a 600) para tudo: títulos, texto, botões e o logo.
  - Títulos: peso 400, largura 100, tracking -0,02em, entrelinha 1,0, caixa baixa normal (só a primeira letra maiúscula). Nunca negrito, nunca itálico.
  - Texto: peso 400, entrelinha 1,5. Peso 600 só em botão, nome de plano e ênfase curta.
  - Logo: peso 600, largura 112.
- **IBM Plex Mono** 400 e 500 **só** dentro de `<pre><code>` e dentro dos fragmentos do produto (`[data-ui]`): token, ID de instância, endpoint, JSON. Nunca em rótulo, legenda, número ou botão da página.

Cinco tamanhos, e só eles:

```css
:root {
  --step-small:   clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);  /* 13–14px: legendas, notas */
  --step-body:    clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);   /* 17–19px: texto corrido */
  --step-lead:    clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);     /* 20–26px: frase de apoio, perguntas do FAQ */
  --step-head:    clamp(2rem, 1.3rem + 3.2vw, 4rem);            /* 32–64px: títulos de seção e o H1 */
  --step-display: clamp(3.5rem, 1.5rem + 6vw, 7rem);            /* 56–112px: só o fecho do CTA e o logo do rodapé */
}
```

Dentro dos fragmentos do produto o texto fica no tamanho real de interface (13 a 15px), com piso de 13px.

Detalhes: `text-wrap: balance` nos títulos, `text-wrap: pretty` nos parágrafos, `font-variant-numeric: tabular-nums` em preço, horário e tabela, aspas curvas (“ ”), reticências de verdade (…), meia-risca em intervalos (9h–18h), espaço inseparável entre número e unidade (R$&nbsp;39). Linhas de texto com 45 a 70 caracteres.

### 2.3 Espaçamento

Escala de 4 em 4:

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px;  --space-10: 128px; --space-11: 176px;
}
```

- Entre seções: `--space-11` no desktop, `--space-10` no tablet, `--space-9` no celular. Sempre maior que qualquer espaço dentro de uma seção.
- Dentro de seção: título até o conteúdo `--space-7`; entre blocos `--space-6`; dentro de painel `--space-5`.
- Use `gap` em grid e flex. Nada de margem solta para alinhar.

### 2.4 Grid e margens

- 12 colunas, conteúdo com no máximo 1312px, calha de 24px (16px no celular).
- Margens laterais: 32px no desktop, 24px no tablet, 20px no celular. A mesma em toda a página.
- Texto sempre alinhado à esquerda. O único momento centralizado é o quadro da demo no hero.
- Todo texto corrido começa em uma de três bordas: a coluna 1, a coluna 5 ou a coluna 7.

### 2.5 Raio, borda e sombra

- **Um raio só: 4px** (`--radius`). Botão, painel, campo, aba, ladrilho, quadro da demo.
- Exceções, só dentro de `[data-ui]`: a tela do celular (28px, um retângulo arredondado liso, sem entalhe, sem botões laterais, sem barra de status falsa) e os balões de mensagem (10px).
- Linha fina só dentro de tabela, campo de formulário e fragmento do produto. Fora disso, separação é espaço ou degrau de tom.
- **Sombra só no que flutua de verdade:** o diálogo "Nova instância" do CTA e o aviso "Copiado". Token: `--shadow-pop: 0 12px 32px rgb(23 34 43 / 0.18)`. Nada parado tem sombra. Nenhum brilho.

### 2.6 Movimento

```css
:root {
  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-press: 120ms;   /* clique, troca de aba */
  --dur-ui: 200ms;      /* hover, chave liga/desliga, troca de status */
  --dur-enter: 480ms;   /* entrada de seção */
  --dur-fade: 1600ms;   /* crossfade lento entre quadros da demo */
}
```

- **Movimento assinatura (um só):** na demo do hero, o quadro ativo troca por crossfade lento (`--dur-fade`) enquanto o rolo de quadros sobe; no último quadro, a mensagem entra na tela do celular subindo 12px com opacidade (`--dur-ui`) e o status muda de "enviada" para "entregue" (1s depois) e "lida" (2,5s depois), cada troca com crossfade de 200ms.
- **Entrada de seção:** título, depois texto, depois fragmento, com 70ms entre eles, subindo 24px com opacidade, uma vez só, quando a seção entra na tela. O conteúdo já está visível no HTML; a classe que esconde só é aplicada quando o script carrega (`.js .reveal`). Se o script falhar, nada some.
- **Resposta em todo controle:** botão escurece um degrau no hover e desce 1px no clique; aba ativa troca de fundo em 120ms; chave desliza a bolinha em 200ms; acordeão abre com altura automática (`interpolate-size: allow-keywords`) e cai para troca instantânea onde não houver suporte.
- Só `transform` e `opacity`. Nada de animar largura, altura (fora o acordeão), cor de página inteira ou sombra.
- Nada de loop infinito decorativo, bolinha pulsando, "digitando…" eterno, quique ou mola.
- **`prefers-reduced-motion: reduce`:** sem deslocamento nenhum. Entradas viram opacidade em 150ms. A demo não fica presa na rolagem: vira quatro quadros parados com o seletor "Token / QR code / Envio / Celular" embaixo, e os status aparecem direto em "lida". O cursor de digitação some.
- Pausar tudo quando a aba estiver escondida (`visibilitychange`).

---

## 3. Logo (wordmark)

**Usar o logo oficial. Não redesenhar nem recriar com fonte.**

- Logo horizontal (`assets/brand/zapvu-logo-horizontal.png`, 1389×425): símbolo lima + "zapvu" em oliva. Vai na navegação, sobre fundo claro.
- Versão para fundo oliva (rodapé, CTA escuro): o mesmo logo com as letras em `--bg`/branco e o símbolo lima. Se não existir arquivo pronto, vetorize o logo em SVG (traçando as formas a partir do PNG, sem mudar proporção nem desenho) e troque só o preenchimento das letras. Se não der para vetorizar com fidelidade, use o ícone quadrado (`zapvu-icone-quadrado.png`) e anote a pendência: "pedir ao chefe o logo em SVG e a versão negativa".
- Favicon e ícone: `zapvu-icone-quadrado.png` (símbolo lima sobre oliva). Gerar `favicon-32.png`, `apple-touch-icon.png` (180) e um `favicon.svg` se a vetorização sair fiel.
- O símbolo sozinho (`zapvu-simbolo.png`) pode aparecer grande como elemento de marca (no CTA final ou no rodapé), sempre inteiro, sem cortar, girar, distorcer, contornar ou pôr sombra.
- Respiro em volta: a altura do "z". Tamanho mínimo do horizontal: 96px de largura.
- O símbolo já é um raio dentro de um balão, então a página não precisa de outro ícone de balão, de telefone ou de tique duplo.

Na navegação o logo horizontal tem uns 28px de altura; no rodapé ele fica grande, cerca de 9vw de altura de "x".

Na barra de navegação o logo tem 20px de altura de "x"; no rodapé ele ocupa a largura de um ladrilho (cerca de 9vw).

---

## 4. Regras da casa

Valem para a página inteira. O inspetor da skill (`inspect.mjs`) mede a maioria.

- Todo título com no máximo duas linhas, em 1440, 768 e 390px. Se não couber, corta palavra.
- Nada de rótulo pequeno em caixa alta acima do título (eyebrow), selo em pílula acima do H1, numeração 01 / 02 / 03, "Passo 2".
- Nada de degradê, brilho, vidro fosco, blob, emoji, ícone em quadradinho, grade de cards iguais, foto de banco de imagem, ilustração 3D, moldura de navegador ou janela de editor com três bolinhas.
- Nenhuma palavra do título com cor, itálico ou sublinhado diferente.
- Botão: retângulo chapado com raio de 4px. O principal segue a regra de "Botão principal" da seção 2.1 (oliva com texto lima em fundo claro); o secundário é link de texto sublinhado. Uma ação principal por tela, sempre com o mesmo nome: **"Testar grátis"**.
- Ícone, só quando é parte do produto (copiar, mais, menos, seta do link do CTA). Traço de 2px, desenhado em SVG no próprio arquivo, cor do texto.
- Número e depoimento só se forem reais. Nesta versão a página não tem depoimento, logo de cliente nem "X mil usuários".
- Fragmentos do produto levam `data-ui` na raiz. Dentro deles valem as convenções de interface (borda de 1px nos campos, raio pequeno, mono no token). Fora, as regras acima.
- Um elemento flutuante no máximo (o aviso de cookies, se precisar, pequeno no rodapé). Nada de botão de WhatsApp flutuante cobrindo conteúdo: o contato do suporte fica no rodapé e no FAQ.
- `html, body { overflow-x: clip; }`. Nenhuma rolagem lateral em 320, 375, 390, 414 e 768px.
- Área de toque mínima de 44px no celular. Botão e link de navegação nunca quebram em duas linhas.

---

## 5. Seções, em ordem

A página tem dez blocos e mira em uns 7 mil px no desktop, menos que todos os concorrentes que mostram tudo isso. O preço aparece antes da metade da rolagem no celular.

Navegação (âncoras): Como funciona · Preço · Documentação · Perguntas. Ação: Testar grátis. Link de texto: Entrar.

Metadados:
- `<title>`: Zapvu | API de WhatsApp não oficial com preço por número
- `<meta name="description">`: Conecte seu número pelo QR code e mande mensagens de WhatsApp por HTTP. R$ 39 por número ao mês, sem cobrança por mensagem. Teste 7 dias sem cartão.
- `<html lang="pt-BR">`

---

### 5.0 Barra de navegação

**Objetivo:** dizer onde a pessoa está e deixar o teste a um clique.

**Desktop:** barra simples, sem fundo próprio, 72px de altura. Logo à esquerda na margem de 32px. À direita, os quatro links em `--step-small` (15px de fato), o link "Entrar" e o botão "Testar grátis". Ao rolar, a barra fica presa no topo com fundo `--bg` chapado (sem desfoque, sem sombra).

**390px:** logo à esquerda; à direita, "Entrar" e um botão "Menu" (texto, não hambúrguer). O menu abre como uma folha que cobre a tela de cima a baixo com fundo `--bg`, os links em `--step-lead`, um embaixo do outro, e o botão "Testar grátis" em largura total no fim. Fecha com "Fechar", com Esc e ao tocar num link.

**Textos:**
- Links: Como funciona · Preço · Documentação · Perguntas
- Link: Entrar
- Botão: Testar grátis
- Menu no celular: Menu / Fechar

---

### 5.1 Hero com a demo

**Objetivo:** responder em uma tela o que é (API de WhatsApp não oficial), quanto custa e como se testa, e provar mostrando a mensagem chegando.

**Composição (desktop, 1440):** fundo `--bg`. Uma frase partida em duas metades, as duas na linha do meio da tela, em `--step-head` (64px):
- "Do seu sistema" encostada na margem esquerda;
- "pro WhatsApp" encostada na margem direita.

As duas metades juntas são o `<h1>` (um `<span>` cada). Entre elas, no centro (colunas 5 a 8, uns 440px), o **quadro da demo**, na proporção 4:5, raio de 4px, sobre `--surface`. O quadro faz parte de um rolo vertical: 60px do quadro anterior aparecem no topo da tela e 60px do próximo no rodapé, com 24px entre eles, como uma tira passando pela frase.

O palco fica preso (`position: sticky`) enquanto o rolo avança quatro quadros com a rolagem (a seção tem uns 260vh). As metades da frase ficam paradas. No canto inferior esquerdo (colunas 1 a 4), sempre visíveis durante o rolo: a frase de apoio em `--step-lead`, o botão e a linha de condição. Os outros cantos ficam vazios.

Embaixo do quadro, centralizado, um seletor de quatro botões ("Token", "QR code", "Envio", "Celular") mostra em que quadro o rolo está e permite pular. Clicar num botão rola até o quadro correspondente.

**Os quatro quadros** (todos com `data-ui`, texto de interface em 13 a 15px):

1. **Token.** Um pedaço do painel. Título "Instância loja-centro". Linhas: "ID" `ins_3F9A7C21`; "Token" `zv_teste_8f3kq2b7…` com o botão "Copiar" (vira "Copiado" por 1,5s); "Status" com bolinha cinza e "Esperando o QR code". Nota embaixo: "Token de demonstração. O seu aparece no painel depois do cadastro."
2. **QR code.** O QR grande (gerado de verdade, apontando para a página de cadastro, para não confundir quem escanear), a instrução "No celular, abra o WhatsApp, toque em Aparelhos conectados e depois em Conectar um aparelho." e "O código renova em 0:18" contando para baixo. Botão "Simular leitura". Clicando, o status vira bolinha verde e "Conectada · +55 31 90000-0000".
3. **Envio.** Um formulário do produto: "Para" com `5531900000000` (só leitura), "Mensagem" com um campo de texto editável, já preenchido com "Oi, Carla! Seu pedido #4821 saiu para entrega e chega até as 18h.", contador "62/300" e o botão "Enviar". Embaixo, a resposta: `201 Created` e o JSON curto (`"id": "msg_7Hq2Lw9xT4"`, `"status": "sent"`).
4. **Celular.** A tela de um celular, um retângulo arredondado liso cortado pela borda de baixo do quadro. Cabeçalho da conversa: círculo cinza com "LC" e "Loja Centro". Um chip "Hoje". À direita, um balão `--surface-2` da Carla: "Oi, meu pedido já saiu?" 13:58. Então entra, à esquerda, o balão branco com o texto que o visitante escreveu, 14:02. Fora da tela do celular, embaixo, a linha de status: "enviada 14:02:07", depois "entregue 14:02:08", depois "lida 14:02:31", acendendo uma por vez (as anteriores ficam em `--muted`). Um `aria-live="polite"` anuncia "Mensagem lida".

A tela do celular não imita o WhatsApp: sem papel de parede, sem verde, sem tiques azuis. É uma conversa genérica.

**Estados da demo:**
- Campo vazio: botão "Enviar" desabilitado e a nota "Escreva uma mensagem para testar."
- Mais de 300 caracteres: contador em `--error` e a nota "A demo aceita até 300 caracteres."
- Enviando: botão vira "Enviando…" por 600ms, depois mostra a resposta e rola para o quadro do celular.
- Depois do envio: botão "Enviar outra" volta o rolo para o quadro 3 com o texto mantido.
- O texto digitado é guardado em memória e preenche o campo `text` dos exemplos da seção 5.2.
- Sem JavaScript: os quatro quadros aparecem empilhados, já no estado final, com o texto de exemplo.

**390px:** as metades empilham. "Do seu sistema" em 9vw (35px) logo abaixo do logo, encostada à esquerda. O quadro em largura total (menos 20px de cada lado), na proporção 4:5. Sem rolo preso: os quadros trocam por toque no seletor de quatro botões embaixo (cada um com 44px de altura, rolagem horizontal se não couber) ou por arrastar para o lado. "pro WhatsApp" encostada à direita, em 9vw, embaixo do seletor. Depois, a frase de apoio em `--step-body`, o botão em largura total e a linha de condição. No celular de 844px de altura, o título, o quadro e "pro WhatsApp" cabem na primeira tela. O botão do hero fica logo abaixo da dobra, e o "Testar grátis" da navegação cobre esse intervalo. Nada fixo no rodapé da tela.

**Textos:**
- H1: Do seu sistema / pro WhatsApp
- Apoio: API de WhatsApp não oficial. Você lê um QR code, pega o token e manda mensagem por HTTP pelo seu próprio número.
- Botão: Testar grátis
- Link: Ler a documentação
- Condição (em `--step-small`, `--muted`): Teste por 7 dias sem cartão. Depois, R$ 39 por número ao mês, no Pix ou no cartão.
- Seletor: Token · QR code · Envio · Celular
- Textos internos dos quadros: os listados acima.

---

### 5.2 Código

**Objetivo:** mostrar ao dev que uma chamada basta e que o exemplo roda do jeito que está, e dar ao não-dev o atalho do agente de IA.

**Composição (desktop):** a seção inteira num campo `--ink` (a única faixa escura da página), texto `--bg`. Coluna da esquerda (colunas 1 a 5): título, frase, uma lista curta do que vai na chamada e o link "Copiar prompt para o seu agente de IA". Coluna da direita (colunas 6 a 12): o bloco de código com abas cURL, Node.js, Python e PHP e o botão "Copiar". Embaixo dele, recuado 56px, a resposta: `201 Created` e o JSON. As abas são `role="tablist"`, com setas do teclado. A aba escolhida fica guardada no `localStorage` (com try/catch) para a doc usar a mesma depois.

**390px:** título, frase e lista em cima. As abas viram uma linha de quatro botões de 44px que cabem na largura (cURL, Node, Python, PHP). O bloco de código ocupa a largura total entre as margens e rola para o lado por dentro (`overflow-x: auto`), nunca a página. A resposta vem embaixo, sem recuo, separada por 24px e com fundo `--code-bg-2`. O link do agente fica no fim.

**Estados:** aba com hover (texto `--bg`), ativa (fundo `--surface` com texto `--ink`), foco (anel `--bg`). Botão copiar: "Copiar" → "Copiado" por 1,5s → "Copiar"; se a área de transferência falhar, seleciona o código e mostra "Selecionei o código. Use Ctrl+C."

**Textos:**
- Título: Uma chamada, uma mensagem
- Frase: Troque o token e o número pelos seus e rode. A resposta volta em JSON com o ID da mensagem, que você usa para acompanhar a entrega.
- Lista:
  - O endereço leva o nome da sua instância.
  - O token vai no cabeçalho `Authorization`.
  - O número vai com DDI e DDD, só os dígitos.
- Botão: Copiar
- Link: Copiar prompt para o seu agente de IA
- Nota abaixo do link: Cola no Claude Code, no Cursor ou no Lovable e ele escreve a integração com base na nossa documentação.

**Código (os endpoints são de exemplo até o chefe mandar os reais):**

cURL
```bash
curl -X POST https://api.zapvu.com.br/v1/instances/loja-centro/messages/text \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "5531900000000", "text": "Oi, Carla! Seu pedido #4821 saiu para entrega e chega até as 18h."}'
```

Node.js
```js
const resposta = await fetch(
  "https://api.zapvu.com.br/v1/instances/loja-centro/messages/text",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ZAPVU_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "5531900000000",
      text: "Oi, Carla! Seu pedido #4821 saiu para entrega e chega até as 18h.",
    }),
  }
);

console.log(await resposta.json());
```

Python
```python
import os
import requests

resposta = requests.post(
    "https://api.zapvu.com.br/v1/instances/loja-centro/messages/text",
    headers={"Authorization": f"Bearer {os.environ['ZAPVU_TOKEN']}"},
    json={
        "to": "5531900000000",
        "text": "Oi, Carla! Seu pedido #4821 saiu para entrega e chega até as 18h.",
    },
    timeout=15,
)

print(resposta.json())
```

PHP
```php
<?php
$ch = curl_init('https://api.zapvu.com.br/v1/instances/loja-centro/messages/text');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . getenv('ZAPVU_TOKEN'),
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'to' => '5531900000000',
        'text' => 'Oi, Carla! Seu pedido #4821 saiu para entrega e chega até as 18h.',
    ]),
]);

echo curl_exec($ch);
```

Resposta
```json
{
  "id": "msg_7Hq2Lw9xT4",
  "instance": "loja-centro",
  "to": "5531900000000",
  "status": "sent",
  "created_at": "2026-11-16T14:02:07-03:00"
}
```

Prompt copiado pelo link do agente:
```
Quero integrar a API do Zapvu (WhatsApp) neste projeto.
Para mandar texto: POST https://api.zapvu.com.br/v1/instances/{INSTANCIA}/messages/text
Cabeçalho: Authorization: Bearer {TOKEN}, lido da variável de ambiente ZAPVU_TOKEN.
Corpo JSON: {"to": "55DDDNUMERO", "text": "..."}.
A resposta traz um "id". Os status (sent, delivered, read) e as mensagens recebidas chegam no webhook configurado no painel.
Documentação completa: https://docs.zapvu.com.br
Crie uma função enviarWhatsApp(para, texto) com tratamento para 401 (token errado), 404 (instância não existe) e 429 (muitas requisições, esperar e tentar de novo).
Nunca escreva o token no código.
```

---

### 5.3 Como funciona

**Objetivo:** mostrar que o caminho tem três passos e o que cada um devolve, para quem não programa entender o que vai acontecer.

**Composição (desktop):** uma coluna estreita de 560px começando na coluna 4. Três trocas, uma embaixo da outra, com 88px entre elas, numa `<ol>` sem números visíveis. Cada troca: uma frase em `--step-lead`, peso 500, que começa com a palavra de ordem ("Primeiro", "Depois", "Pronto"); 16px abaixo, a "chamada" (o que a pessoa faz) num painel `--surface`; abaixo, recuada 56px, a "resposta" (o que o produto devolve), um fragmento `data-ui`. A terceira resposta escapa da coluna: 760px, indo até a coluna 12. O título fica 56px acima da primeira frase, alinhado à coluna 4.

**390px:** coluna em largura total. Chamada e resposta empilhadas sem recuo, separadas por 24px; a resposta com fundo `--surface-2`. A terceira resposta ocupa de borda a borda, cortada à direita se for mais larga, com rolagem interna.

**Textos:**
- Título: Do cadastro à primeira mensagem
- Primeiro, crie a conta e uma instância.
  - Chamada: campo do painel "Nome da instância" com `loja-centro` e o botão "Criar".
  - Resposta: cartão com "loja-centro", ID `ins_3F9A7C21`, token mascarado e "Esperando o QR code".
  - Nota: Cada instância é um número de WhatsApp. Precisa de mais números, cria mais instâncias.
- Depois, leia o QR code com o celular do número.
  - Chamada: o caminho que a pessoa toca no celular: WhatsApp › Aparelhos conectados › Conectar um aparelho.
  - Resposta: "loja-centro · Conectada · +55 31 90000-0000 · desde 14:01".
  - Nota: Deixe o celular com bateria e internet. Se ele ficar desligado por muitos dias, a conexão cai e você lê o QR de novo. *(confirmar com o chefe)*
- Pronto: mande pela API, pelo n8n ou pelo painel.
  - Chamada: as duas primeiras linhas do cURL da seção 5.2.
  - Resposta (larga): um registro de eventos do webhook, em ordem: `message.sent` 14:02:07, `message.delivered` 14:02:08, `message.read` 14:02:31 e `message.received` 14:03:10 com a resposta da Carla: "Obrigada! Vou estar em casa."
  - Nota: Cada mudança chega no endereço de webhook que você cadastrar no painel.

(Se o chefe medir o tempo real de cada passo, ele entra ao lado da frase, em `--step-small`: "uns 40 segundos". Sem medir, não entra.)

---

### 5.4 O que a API faz

**Objetivo:** mostrar os recursos agrupados por tipo, com um pedaço do produto em cada grupo, em vez de 12 cards iguais.

**Composição (desktop):** título na coluna 1. Abaixo, quatro linhas, cada uma dividida 5/7: à esquerda uma frase de duas linhas em `--step-lead` e um parágrafo curto em `--step-body`; à direita o fragmento. Os fragmentos têm tamanhos e formatos diferentes para a coluna não virar um zigue-zague de blocos iguais (o texto fica sempre à esquerda). Na linha "Status e webhooks", o fragmento fica preso (`sticky`) enquanto três frases curtas passam e mudam o estado dele.

**390px:** cada linha vira texto em cima e fragmento embaixo, em largura total. O fragmento mantém o tamanho real e corta à direita se precisar, nunca encolhe. Sem sticky: os três estados da mensagem aparecem empilhados.

**Textos:**
- Título: O que a API faz
- Linha 1, Mensagens
  - Frase: Texto, imagem, áudio, vídeo, documento, localização e contato.
  - Parágrafo: Os mesmos tipos de mensagem que você manda pelo celular, para mandar e para receber. Arquivo vai por URL ou em base64.
  - Fragmento: uma coluna de conversa com quatro mensagens enviadas: um PDF "boleto-novembro.pdf · 84 KB", uma foto com legenda "Seu óculos chegou na loja", um áudio de 0:14 e uma localização "Rua dos Andradas, 412". No pé, os endpoints em mono: `/messages/text`, `/messages/image`, `/messages/audio`, `/messages/document`, `/messages/location`.
- Linha 2, Status e webhooks
  - Frase: Seu sistema fica sabendo quando a mensagem chega e quando é lida.
  - Parágrafo: Cada mudança de status vira um POST no seu webhook. Mensagem recebida também, com quem mandou, o texto e o arquivo, se tiver.
  - Fragmento: a mesma linha de mensagem três vezes, em três estados, em 640px:
    - "Enviada · 14:02:07"
    - "Entregue · 14:02:08", com o botão "Marcar como lida" (é a cópia viva; clicando, ela passa para o terceiro estado)
    - "Lida · 14:02:31"
  - Embaixo, o JSON do webhook:
    ```json
    {
      "event": "message.status",
      "instance": "loja-centro",
      "id": "msg_7Hq2Lw9xT4",
      "status": "read",
      "at": "2026-11-16T14:02:31-03:00"
    }
    ```
- Linha 3, Grupos
  - Frase: Crie grupos, adicione pessoas e mande no grupo.
  - Parágrafo: Bom para avisos de turma, lista de clientes de uma loja ou equipe de entregadores. O grupo aparece no celular como qualquer outro.
  - Fragmento: cartão de grupo "Turma Inglês B2 · sábado", 18 participantes, e a resposta da criação com `"group_id": "120363...@g.us"`.
- Linha 4, Instâncias
  - Frase: Um número por instância, quantos números você precisar.
  - Parágrafo: Crie, conecte e desconecte instâncias pela API ou pelo painel. Se um número cair, você recebe um evento e pode mostrar o QR code de novo dentro do seu próprio sistema.
  - Fragmento: lista do painel com três instâncias:
    - loja-centro · Conectada · +55 31 90000-0000
    - loja-shopping · Conectada · +55 31 90000-0001
    - cobranca · Desconectada · botão "Ler QR de novo" (essa linha aparece com hover)

(Botões, listas, enquetes, canais e catálogo só entram se a API tiver. Confirmar.)

---

### 5.5 Casos de uso

**Objetivo:** fazer o dono de negócio se ver na página com mensagens que ele mandaria de verdade.

**Composição (desktop):** título em duas linhas no máximo, à esquerda, e na mesma linha, à direita, o link "Ver mais exemplos na documentação". 56px abaixo, à esquerda, uma coluna de 150px com quatro abas empilhadas (blocos `--surface` de 150×64px, 6px entre eles; a ativa em `--ink` com texto `--bg`). Cada aba mostra o tipo de negócio em 16px e quantas mensagens o dia tem em 13px. À direita, de 190px até a margem, o dia daquele negócio em faixas alternadas `--surface` e `--surface-2`, cada uma com 76px de altura mínima e 4px entre elas. Dentro da faixa, em colunas fixas: o horário em `--step-lead` com números tabulares; o que dispara a mensagem em 18px peso 500 com a mensagem real embaixo em `--step-body`; à direita, o endpoint ou o evento em mono 13px dentro de um `data-ui` pequeno.

**390px:** título em cima e o link embaixo dele. As abas viram uma linha horizontal de quatro blocos iguais, presa no topo da seção enquanto ela rola. Cada faixa empilha horário, gatilho, mensagem e endpoint, com 16px de respiro, e cresce até caber.

**Estados:** abas com `role="tablist"`, setas do teclado, hover um degrau mais escuro. Sem JavaScript, os quatro dias aparecem um embaixo do outro, cada um com seu nome como subtítulo.

**Textos:**
- Título: Um dia de mensagens automáticas
- Link: Ver mais exemplos na documentação
- Nota no pé da seção (`--step-small`): Nomes, números e horários são exemplos.

Aba **Clínica** · 4 mensagens
- 07:00 · Confirmação da consulta · "Bom dia, Marina! Sua consulta com a Dra. Paula é amanhã, 17/11, às 9h. Responda 1 para confirmar ou 2 para remarcar." · `/messages/text`
- 09:12 · A paciente respondeu "1" · O webhook avisa o sistema, que marca a consulta como confirmada. · `message.received`
- 11:40 · Exame pronto · "Marina, seu hemograma ficou pronto. O PDF está logo abaixo." · `/messages/document`
- 18:00 · Pesquisa depois do atendimento · "Como foi a consulta hoje? Responda com uma nota de 1 a 5." · `/messages/text`

Aba **Loja virtual** · 4 mensagens
- 08:15 · Pagamento aprovado · "Oi, Rafael! Recebemos o Pix do pedido #4821. Já estamos separando." · `/messages/text`
- 13:30 · Saiu para entrega · "Seu pedido saiu com o entregador e chega até as 18h. Qualquer coisa, é só responder aqui." · `/messages/text`
- 18:42 · Entregue · "Pedido entregue! Se precisar trocar o tamanho, você tem 7 dias." · `/messages/text`
- 20:10 · Avaliação · "Chegou tudo certo? Manda uma foto com o tênis, a gente adora ver." · `/messages/text`

Aba **Cobrança** · 3 mensagens
- 09:00 · Mensalidade vencendo · "Oi, Júlio. Sua mensalidade de R$ 149,90 vence na sexta, 21/11. O Pix copia e cola vem na próxima mensagem." · `/messages/text`
- 09:00 · Código do Pix · "00020126580014br.gov.bcb.pix…" (cortado com reticências) · `/messages/text`
- 15:22 · Pagamento confirmado · "Recebemos seu pagamento. Obrigado, Júlio!" · `/messages/text`

Aba **Delivery** · 4 mensagens
- 11:02 · Pedido recebido · "Recebemos seu pedido: 1 marmitex de frango com quiabo e 1 suco de laranja. Fica pronto em uns 20 min." · `/messages/text`
- 11:24 · Saiu para entrega · "O Diego saiu com seu pedido. Ele está de moto vermelha." · `/messages/text`
- 11:25 · Localização do entregador · mapa com o ponto · `/messages/location`
- 11:41 · Entregue · "Bom apetite! Se puder, responde com uma nota de 1 a 5." · `/messages/text`

---

### 5.6 Integrações

**Objetivo:** mostrar ao público no-code que dá para usar sem programar e com quais ferramentas.

**Composição (desktop):** um quadro de ladrilhos `--surface`, quatro por linha, duas linhas, 8px entre eles, na largura do conteúdo, proporção 3:2, sem borda. O primeiro ladrilho tem o dobro da largura e é lima (`--accent`, texto `--accent-ink`), com o título no canto superior esquerdo em `--step-head`. Os outros seis levam o nome da ferramenta escrito em Archivo 600, 28px, no canto superior esquerdo (sem logo), e embaixo uma linha em `--step-small` dizendo como liga. Ladrilho não se mexe no hover; o que for link ganha sublinhado no nome.

**390px:** o ladrilho do título em largura total, 120px de altura. Depois, dois por linha, com 6px entre eles, nomes em 20px.

**Textos:**
- Título (ladrilho lima): Funciona com o que você já usa
- n8n · Nó HTTP Request para mandar, nó Webhook para receber. Tem fluxo pronto para importar.
- Make · Módulo HTTP para mandar e webhook personalizado para receber.
- Typebot · Bloco de webhook manda a resposta do fluxo pelo seu número.
- Chatwoot · Sua equipe responde as conversas do número numa caixa de entrada.
- Bubble · API Connector com as chamadas prontas.
- Agentes de IA · Claude Code, Cursor e Lovable escrevem a integração com o prompt da documentação.
- Nota embaixo do quadro: Usa outra ferramenta? Se ela faz uma requisição HTTP, funciona.

(Só publicar os ladrilhos que o chefe confirmar. "Tem fluxo pronto para importar" só se existir o arquivo.)

---

### 5.7 Como não tomar ban

**Objetivo:** tratar o maior medo de quem compra API não oficial com franqueza, mostrar que o Zapvu entende do assunto e cortar suporte depois da venda.

**Composição (desktop):** título e uma frase de abertura (parágrafo em `--step-lead`, até 25 palavras) na coluna 1. Depois, quatro faixas de largura total, encostadas uma na outra, cada uma com 20vh de altura. Em cada faixa, uma frase em `--step-lead` (até 36px, uma linha) nas colunas 1 a 10, e nas colunas 11 e 12 uma chave liga/desliga do produto (`data-ui`, `role="switch"`). Desligada, a faixa fica no fundo `--bg` e a frase em `--muted`. Ligada, a faixa vira `--accent-soft`, a frase vai para `--ink` e aparece embaixo uma segunda linha em `--step-body` dizendo a consequência com número. Duas faixas começam ligadas. As chaves respondem a clique, Espaço e Enter.

Abaixo das faixas, dois blocos lado a lado (colunas 1 a 6 e 7 a 12), sem caixa em volta: "O que mais derruba número" e "O que ajuda". E uma linha final, larga, com "Se o número cair".

**Versão sem os recursos:** se o Zapvu não tiver fila com intervalo, "digitando…" e pausa automática, as quatro faixas viram frases fixas, sem chave, todas no fundo `--surface`, e a seção perde a linha de consequência. A parte de baixo continua igual.

**390px:** faixas com pelo menos 132px de altura, frase em duas linhas nos 76% da esquerda, chave à direita com 44px de área de toque. A consequência abre embaixo em 15px. Os dois blocos de lista empilham.

**Textos:**
- Título: Como não tomar ban
- Abertura: Toda API não oficial tem risco de bloqueio, a nossa também. O que derruba número quase sempre é o jeito de mandar, e isso dá para controlar.
- Faixas (configurações da instância, a confirmar):
  - Esperar alguns segundos entre um envio e outro → ligada: "Intervalo aleatório de 4 a 12 segundos. 200 mensagens levam uns 27 minutos."
  - Mostrar "digitando…" antes de mandar → ligada: "O contato vê "digitando…" por 1 a 3 segundos antes da mensagem chegar."
  - Pausar a fila quando muita gente não recebe → ligada: "Se 10 das últimas 50 mensagens falharem, a fila para e seu webhook recebe um aviso."
  - Ir devagar com número novo → ligada: "Nos primeiros 15 dias, a instância manda no máximo 100 mensagens por dia."
- Bloco "O que mais derruba número":
  - Mandar para quem não te conhece ou não pediu.
  - Muita gente bloqueando ou denunciando no mesmo dia.
  - Número novo, ativado ontem, já disparando centenas de mensagens.
  - A mesma mensagem, com link, idêntica para centenas de pessoas.
- Bloco "O que ajuda":
  - Usar o WhatsApp Business no número da API.
  - Esquentar o número novo: conversar normalmente por alguns dias antes de automatizar.
  - Mandar só para quem pediu e dar um jeito fácil de sair, como "responda SAIR".
  - Personalizar com nome, pedido e data. Mensagem com cara de gente recebe resposta, e resposta conta a seu favor.
- Linha "Se o número cair": Pare a fila e não fique reconectando várias vezes seguidas. Se foi bloqueio, o próprio WhatsApp mostra um aviso no celular com a opção de pedir revisão. Chama o nosso suporte que a gente olha o histórico da instância com você.
- Nota final (`--step-small`): Ninguém consegue garantir que um número nunca vai ser bloqueado. A gente prefere avisar antes.

(Os números das faixas, 4 a 12 s, 10 de 50, 100 por dia e 15 dias, são exemplos. Só publicar com os valores reais do produto.)

---

### 5.8 Preço

**Objetivo:** mostrar o preço por número, deixar a pessoa calcular o total dela e dizer como paga.

**Composição (desktop):** título na coluna 1. Ao lado do título, nas colunas 7 a 12, o seletor: a pergunta, um controle `−` / número / `+` (botões de 44px, número em `--step-head` com tabulares) e, embaixo, um `<input type="range">` de 1 a 50. Logo abaixo, a conta em `--step-lead`: "3 números × R$ 39 = R$ 117 por mês" e o botão "Testar grátis".

Embaixo, a tabela grande (é uma `<table>` de verdade): a primeira coluna (colunas 1 a 4) lista o que se compara em 22px; as três faixas de volume dividem as colunas 5 a 12. Cabeçalho de cada faixa: o nome em `--step-lead` peso 600 e o preço logo abaixo em `--step-head` peso 400, com "/número por mês" em 16px. Linhas de 22px com 20px de respiro; uma linha sim, outra não, com fundo `--surface` em toda a largura. Respostas em palavras, nunca em tique. **A coluna da faixa que o seletor escolheu fica inteira em `--accent`** (texto `--accent-ink`), do cabeçalho à última linha, e muda junto quando a pessoa mexe no seletor. Não existe selo "mais popular".

Abaixo da tabela, uma linha com pagamento, nota e cancelamento.

**390px:** título, seletor (o `−` / número / `+` em largura total) e a conta em cima, botão em largura total. A tabela vira três blocos empilhados, um por faixa: nome e preço em 9vw, depois as linhas em pares (o item em `--muted`, a resposta embaixo em `--ink`, ambos em 17px). O bloco da faixa escolhida fica lima. Nada de tabela com rolagem lateral.

**Estados:** `−` desabilitado em 1, `+` desabilitado em 50. Acima de 50, a conta vira "Mais de 50 números? Fala com a gente pelo WhatsApp do suporte." Sem JavaScript, o seletor some e a tabela aparece sem coluna destacada. O número é anunciado (`aria-live`) quando muda.

**Textos:**
- Título: Preço por número
- Pergunta: Quantos números você vai conectar?
- Conta: {n} números × R$ {preço} = R$ {total} por mês (com 1: "1 número × R$ 39 = R$ 39 por mês")
- Botão: Testar grátis
- Tabela:

| | 1 a 4 números | 5 a 19 números | 20 a 50 números |
| --- | --- | --- | --- |
| Preço | R$ 39 /número por mês | R$ 33 /número por mês | R$ 27 /número por mês |
| Exemplo | 3 números: R$ 117 | 10 números: R$ 330 | 30 números: R$ 810 |
| Mensagens | Sem cobrança por mensagem | Sem cobrança por mensagem | Sem cobrança por mensagem |
| Recursos da API | Todos | Todos | Todos |
| Teste grátis | 7 dias com 1 número, sem cartão | 7 dias com 1 número, sem cartão | 7 dias com 1 número, sem cartão |
| Suporte | WhatsApp e e-mail, seg a sex, 9h–18h | WhatsApp e e-mail, seg a sex, 9h–18h | O mesmo, com primeira resposta em até 1h útil |
| Painel de revenda | Não | Não | Sim, com sua marca |

- Linha final: Pague no Pix, no cartão ou no boleto. Toda cobrança sai com nota fiscal. Cancela no painel quando quiser, sem multa.

(Todos os valores são exemplos. A tabela inteira depende do chefe.)

---

### 5.9 Perguntas

**Objetivo:** responder o que trava a compra antes de a pessoa sair para perguntar.

**Composição (desktop):** duas partes. Colunas 1 a 4: o título, preso (`sticky; top: 96px`) enquanto a lista passa, e embaixo dele o contato do suporte. Colunas 5 a 12: acordeão de ladrilhos `--surface`, 8px entre eles, sem borda, raio de 4px. Fechado, cada ladrilho tem 72px de altura, a pergunta em `--step-lead` peso 500 à esquerda e um "+" desenhado com duas barras de 3px à direita. Aberto, o ladrilho fica `--ink` com texto `--bg`, o "+" vira "−" girando uma barra e a resposta aparece em `--step-body`, com no máximo 60 caracteres por linha. Cada pergunta é um `<details>` com o mesmo `name`, para abrir uma de cada vez. A primeira começa aberta.

**390px:** título em cima, sem sticky. Ladrilhos em largura total com 6px entre eles, perguntas em 18px quebrando em duas linhas, altura mínima de 64px fechado, resposta em 16px com 20px de respiro.

**Textos:**
- Título: Perguntas comuns
- Contato: Não achou sua dúvida? Chama no WhatsApp do suporte: (31) 90000-0000, seg a sex, das 9h às 18h.

1. **O Zapvu é a API oficial do WhatsApp?**
   Não. É uma API não oficial: o seu número se conecta como um aparelho, do mesmo jeito que o WhatsApp Web, sem aprovação da Meta e sem modelo de mensagem aprovado. O Zapvu não tem ligação com a Meta nem com o WhatsApp.
2. **Meu número pode ser bloqueado?**
   Pode. Qualquer automação no WhatsApp tem esse risco, inclusive a oficial. O que mais derruba número é mandar para quem não pediu e receber muita denúncia. As regras que a gente recomenda estão na seção "Como não tomar ban". Se tiver dúvida sobre o seu caso, fala com o suporte antes de disparar.
3. **O celular precisa ficar ligado?**
   O número funciona como um aparelho conectado, então o celular não precisa ficar com o WhatsApp aberto. Ele só precisa ter bateria e entrar na internet de vez em quando. Se ficar muitos dias desligado, a conexão cai e você lê o QR code de novo.
4. **Posso continuar usando o WhatsApp no celular?**
   Pode. As conversas aparecem no celular e na API ao mesmo tempo. Funciona com o WhatsApp normal e com o Business, e para número que manda mensagem automática a gente recomenda o Business.
5. **Tem limite de mensagens?**
   A gente não cobra por mensagem e não põe teto no plano. O limite que existe é o do próprio WhatsApp, que observa o comportamento do número. Mandar rápido demais para muita gente que não te conhece é o que dá problema.
6. **Como funciona o teste grátis?**
   São 7 dias com 1 número e todos os recursos, sem cartão. No fim, a instância fica pausada até você escolher um plano. Nada é apagado: assinou, ela volta a funcionar sem ler o QR de novo.
7. **Preciso saber programar?**
   Não. Dá para usar pelo n8n, Make ou Typebot sem escrever código. Se você programa, serve qualquer linguagem que faça uma requisição HTTP, e a documentação tem exemplos em cURL, Node.js, Python e PHP.
8. **Como pago e como cancelo?**
   Por mês, no Pix, no cartão ou no boleto, com nota fiscal. Para cancelar, é um botão no painel. Sem multa e sem precisar falar com ninguém.
9. **E os dados das minhas mensagens?**
   As mensagens passam pelos nossos servidores no Brasil só pelo tempo de entregar e avisar o seu webhook. Os dados dos seus contatos são seus: pela LGPD, você é o controlador e a gente é o operador. Se precisar, mandamos o contrato de tratamento de dados.

(Respostas 3, 6, 8 e 9 dependem de confirmação. Ver a tabela de placeholders.)

---

### 5.10 CTA final

**Objetivo:** fechar com o primeiro passo do produto já aberto, para a pessoa sair da página com a instância nomeada.

**Composição (desktop):** campo lima (`--accent`) de largura total, 90svh de altura. À direita (colunas 7 a 11), centralizado na vertical, o diálogo "Nova instância" do produto, em tamanho real (440px), com `data-ui`, fundo `--white`, raio de 4px e `--shadow-pop`. À esquerda (colunas 1 a 5), ancorado embaixo com 40px de margem: a frase de fecho em `--step-display`, entrelinha 0,92, em duas linhas, e embaixo uma frase em `--step-body`. O canto superior esquerdo fica vazio.

O diálogo: título "Nova instância"; campo "Nome da instância" com `loja-centro` (editável); dica "Use letras minúsculas, números e hífen."; escolha em dois botões "Vou conectar por" → "Código" / "n8n, Make ou Typebot"; botão principal "Criar instância" (fundo `--ink`, texto `--bg`, 48px). O botão leva para `https://app.zapvu.com.br/cadastro?instancia=loja-centro&via=codigo` com o que a pessoa escolheu. Embaixo do botão: "7 dias grátis, sem cartão."

**Estados do diálogo:**
- Campo vazio: botão desabilitado.
- Nome inválido (maiúscula, espaço, acento): borda `--error` e a mensagem "Use só letras minúsculas, números e hífen. Exemplo: loja-centro". O espaço vira hífen sozinho enquanto a pessoa digita.
- Foco: anel `--focus` no campo e nos botões.
- Clique: "Criando…" por até 400ms e segue para o cadastro.
- Sem JavaScript: o formulário é um `<form method="get">` normal apontando para o cadastro.

**390px:** a frase de fecho vem primeiro, em 13vw, duas linhas, encostada em cima à esquerda, com a frase embaixo em 16px. O diálogo vem depois, em largura total entre margens de 16px, no tamanho real, com o botão de 52px em largura total. O campo lima tem pelo menos 84svh e o diálogo fica na metade de baixo.

**Textos:**
- Fecho: Teste no / seu número
- Frase: Dê um nome para a instância. Na próxima tela você cria a conta e já recebe o QR code para conectar.
- Diálogo: Nova instância · Nome da instância · Use letras minúsculas, números e hífen. · Vou conectar por · Código · n8n, Make ou Typebot · Criar instância · 7 dias grátis, sem cartão.

---

### 5.11 Rodapé

**Objetivo:** fechar com os links que importam, o contato, o aviso de não afiliação e o nome grande.

**Composição (desktop):** as duas últimas linhas de um quadro de ladrilhos, 8px entre eles e 12px de margem externa, todos preenchidos, sem borda.
- Linha de cima (220px de altura):
  - Colunas 1 a 4, ladrilho `--surface`: a frase em `--step-lead` em cima e, embaixo, o aviso legal em `--step-small`.
  - Colunas 5 a 7, ladrilho `--surface`: lista de links em `--step-body`.
  - Colunas 8 e 9, ladrilho `--surface`: suporte e status.
  - Colunas 10 a 12, ladrilho `--surface`: o e-mail em `--step-lead`, como link, embaixo à esquerda.
- Linha de baixo (320px):
  - Colunas 1 a 8, ladrilho `--ink`: o logo grande, uns 9vw, centralizado, letras `--bg` e símbolo lima.
  - Colunas 9 a 12, ladrilho `--accent`: "Testar grátis" no canto superior esquerdo em `--step-head` e uma seta desenhada em SVG, traço de 4px, no canto inferior direito. O ladrilho inteiro é o link.

**390px:** duas colunas de ladrilhos com 6px entre eles: o ladrilho do logo em largura total (160px) primeiro, depois o lima em largura total, depois links e e-mail lado a lado, depois suporte e a frase com o aviso, cada um em largura total. Todo ladrilho com 20px de respiro e texto no canto superior esquerdo.

**Textos:**
- Frase: API de WhatsApp para quem integra. Cobrada em real.
- Aviso legal: O Zapvu é um serviço independente e não tem ligação com a WhatsApp LLC nem com a Meta Platforms, Inc. WhatsApp é marca registrada da WhatsApp LLC. © 2026 Zapvu · CNPJ 00.000.000/0001-00
- Links: Documentação · Painel · Preço · Status da API · Termos de uso · Privacidade
- Suporte: WhatsApp (31) 90000-0000. Seg a sex, 9h–18h. Primeira resposta em até 2 horas úteis.
- Status: Ver o status da API (link para status.zapvu.com.br)
- E-mail: contato@zapvu.com.br
- Ladrilho lima: Testar grátis

---

## 6. Responsivo: resumo em 390px

| Seção | Em 390px |
| --- | --- |
| Navegação | logo, "Entrar" e "Menu"; menu em folha de tela cheia |
| Hero | frase partida empilhada (9vw), quadro 4:5 em largura total, troca de quadro por toque, sem rolagem presa; botão em largura total |
| Código | abas em linha de 4 botões de 44px; código rola por dentro; resposta embaixo sem recuo |
| Como funciona | coluna cheia; chamada e resposta empilhadas; terceira resposta de borda a borda |
| O que a API faz | texto em cima, fragmento embaixo em tamanho real, cortado à direita se precisar |
| Casos de uso | abas em linha presa no topo da seção; faixas empilham horário, gatilho, mensagem e endpoint |
| Integrações | título em largura total; ladrilhos dois por linha |
| Ban | faixas de 132px com frase em duas linhas e chave de 44px; listas empilhadas |
| Preço | seletor em largura total; tabela vira três blocos; o escolhido fica lima |
| Perguntas | título em cima, ladrilhos em largura total, perguntas em duas linhas |
| CTA | fecho em 13vw em cima, diálogo em largura total, botão de 52px |
| Rodapé | logo e lima em largura total, depois ladrilhos em duas colunas |

Testar também em 320, 375, 414 e 768px. Nenhum título passa de duas linhas, nenhum botão quebra linha, nenhuma rolagem lateral, nada flutuante cobrindo texto.

---

## 7. Estados que todo controle precisa ter

| Controle | Padrão | Hover | Foco (teclado) | Clique | Desabilitado | Carregando | Erro / sucesso |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Botão principal | `--accent`, texto `--accent-ink` | um degrau mais escuro (`#DD5F15`, token `--accent-hover`) | anel 2px `--focus`, folga 2px | desce 1px | 40% de opacidade, cursor normal | "Enviando…", "Criando…" | volta ao normal; o resultado aparece no lugar certo |
| Link de texto | sublinhado 1px | sublinhado 2px | anel | — | — | — | — |
| Aba | `--surface` | `--surface-2` | anel | troca em 120ms | — | — | — |
| Chave (switch) | desligada `--surface-2` | borda escurece | anel | bolinha desliza 200ms | — | — | `aria-checked` atualizado |
| Copiar | "Copiar" | sublinha | anel | — | — | — | "Copiado" 1,5s; se falhar, seleciona o texto e avisa |
| Seletor − / + | `--surface` | `--surface-2` | anel | desce 1px | em 1 e em 50 | — | número anunciado |
| Campo de texto | `--white`, borda 1px `--muted` | borda `--ink` | anel | — | — | — | borda `--error` e mensagem embaixo |
| Pergunta (details) | `--surface` | `--surface-2` | anel | abre/fecha | — | — | — |

O anel de foco aparece na hora, sem animação. Todos os textos de erro dizem o que fazer, sem pedir desculpa.

---

## 8. Imagens

A página não tem foto. A imagem é o produto: os fragmentos com `data-ui` (painel do token, QR, formulário de envio, tela do celular, linhas de status, lista de instâncias, cartão de grupo, diálogo de nova instância), todos com conteúdo de verdade e números que batem entre si (mesmo ID de mensagem, mesmo horário, mesma instância em toda a página).

O inspetor da skill pede ao menos quatro imagens reais. Os fragmentos do produto contam. Se o diretor de arte achar a página magra, a saída é procurar duas ou três fotos de arquivo do mundo de quem usa (um balcão de loja de bairro, uma moto de entrega, a recepção de uma clínica) com `node .claude/skills/design-taste-frontend/scripts/assets.mjs`, em preto e branco, com crédito no rodapé, nunca apresentadas como clientes do Zapvu. Não é obrigatório.

Proibido: foto de banco de pessoas no notebook, ilustração 3D, mockup de celular realista, print do WhatsApp de verdade, logo de cliente que não existe.

---

## 9. Placeholders

Todo valor abaixo está na página como exemplo plausível. Nada vai para o ar sem a resposta do chefe.

| Onde aparece | Valor de exemplo | O que perguntar |
| --- | --- | --- |
| Hero (condição), Preço, FAQ 6, CTA | 7 dias grátis, 1 número, sem cartão | Quantos dias de teste, quantos números, se pede cartão |
| FAQ 6 | Instância pausa no fim do teste e nada é apagado | O que acontece quando o teste acaba |
| Hero, Preço, metadados | R$ 39 por número ao mês | Preço por número |
| Preço (tabela) | R$ 33 de 5 a 19, R$ 27 de 20 a 50, acima de 50 sob consulta | Se tem desconto por volume e as faixas |
| Preço (tabela) | Painel de revenda com a sua marca a partir de 20 | Se existe revenda / white label |
| Preço, FAQ 8, Hero | Pix, cartão e boleto, com nota fiscal, cancelamento no painel | Formas de pagamento, nota fiscal, como cancela |
| Navegação, Hero, Código, Integrações | docs.zapvu.com.br | Link da documentação e se ela abre sem login |
| Navegação ("Entrar"), CTA | app.zapvu.com.br/cadastro?instancia=…&via=… | Link do painel e do cadastro, e se aceita esses parâmetros |
| Código, Como funciona, Recursos, prompt | `https://api.zapvu.com.br/v1/instances/{instancia}/messages/text`, campos `to` e `text`, resposta com `id` e `status` | Endpoints, nomes de campos e formato de resposta reais |
| Recursos (webhook) | eventos `message.sent`, `message.delivered`, `message.read`, `message.received`, `message.status` | Nomes reais dos eventos do webhook |
| Recursos | texto, imagem, áudio, vídeo, documento, localização, contato, grupos | O que a API faz hoje (e se tem botões, listas, enquete, canais) |
| Hero e Como funciona | token `zv_teste_8f3kq2b7…`, ID `ins_3F9A7C21` | Formato do token e do ID (são falsos de propósito; nunca usar um real) |
| Como funciona, FAQ 3 | Celular precisa de bateria e internet de vez em quando; se ficar dias desligado, cai | Se o celular precisa ficar online e quanto tempo a conexão aguenta |
| Como funciona | sem tempo por passo | Tempo medido de cada passo, se quiser mostrar |
| Ban (faixas) | intervalo de 4 a 12 s, "digitando…", pausa com 10 falhas em 50, 100 por dia nos primeiros 15 dias | Quais desses recursos existem e com quais números. Se não existir nenhum, usar a versão sem chaves |
| Integrações | n8n, Make, Typebot, Chatwoot, Bubble, agentes de IA; fluxo pronto do n8n | Quais funcionam de verdade e se tem fluxo para baixar |
| FAQ, rodapé | Suporte no WhatsApp (31) 90000-0000, seg a sex, 9h–18h, primeira resposta em até 2h úteis | Número, horário e tempo de resposta do suporte |
| Preço (tabela) | Primeira resposta em até 1h útil de 20 números para cima | Se tem suporte prioritário |
| Rodapé | contato@zapvu.com.br | E-mail de contato |
| Rodapé | status.zapvu.com.br | Se existe página de status (se não, tirar o link) |
| Rodapé | © 2026 Zapvu · CNPJ 00.000.000/0001-00 | Razão social e CNPJ |
| FAQ 9 | Servidores no Brasil, mensagem guardada só até entregar, contrato de tratamento de dados | Onde ficam os servidores, quanto tempo guardam mensagem, se tem DPA |
| Rodapé (frase) | "Cobrada em real" | Confirmar que cobra em real |
| Logo, ideia central | "zap" + "vu" de visto | De onde vem o nome e se já existe logo ou cor |
| Todo lugar | domínio zapvu.com.br | Domínio |
| Hero (QR) | QR apontando para a página de cadastro | URL final para gerar o QR |
| Casos de uso, demo | Carla, Marina, Rafael, Júlio, Diego, Loja Centro, Dra. Paula, telefone +55 31 90000-0000 | Nada: são exemplos e ficam marcados como exemplo na página |

---

## 10. Antes de mostrar

1. Rodar `node .claude/skills/design-taste-frontend/scripts/lint.mjs <pasta>` e `node .claude/skills/design-taste-frontend/scripts/inspect.mjs index.html`. Zero FAIL. Se o inspetor reclamar de mono, linha ou raio dentro de um fragmento, conferir se o `data-ui` está na raiz dele.
2. Abrir os prints de 1440, 768 e 390 e passar a crítica da `references/critique.md`.
3. Passar os textos pela `humanizer` ou `avoid-ai-writing`. Nada de "potencialize", "solução completa", "revolucione", "não é só X, é Y", travessão em série, trio de adjetivos.
4. Checklist da `sem-cara-de-ia`: dá para trocar "Zapvu" por "Z-API" e a página continuar servindo? Se sim, falta a demo ou falta o assunto.
5. Testar a demo com o teclado do começo ao fim, com leitor de tela (anúncio de "Mensagem lida") e com `prefers-reduced-motion` ligado.
6. Mandar os prints para o agente `diretor-de-arte` e só depois mostrar para o Guilherme.
