# Estudo das landing pages concorrentes (16/11/2026)

O Zapvu é uma API de WhatsApp não oficial: a pessoa cria uma instância, pega o token, escaneia o QR code e já manda e recebe mensagem por HTTP. Olhei as páginas de quem vende a mesma coisa para saber o que o público já espera e onde dá para ser diferente.

Na primeira rodada vi Z-API, W-API, Whapi e Ultramsg. Na segunda entraram MegaAPI, uazapi, Evolution, WPPConnect, Green-API, Maytapi e Wassenger. A API Brasil ficou de fora porque bloqueia leitura automática. Os prints estão na pasta `refs` do scratchpad da sessão.

## O que cada um faz

### Brasileiras

#### Z-API (z-api.io)
- A home de hoje vende o **Z-API Omni**, com vários canais numa API só (chat, Instagram, Messenger, e-mail, TikTok, Mercado Livre). A palavra "WhatsApp" não aparece nenhuma vez no texto da home, só "mensageria mobile".
- A landing antiga do WhatsApp por QR sumiu: /whatsapp e parecidas dão 404 e o painel antigo fica atrás de um bloqueio anti-robô.
- Hero: "Uma única API para todos os seus canais de mensagens", com os botões "Acessar a plataforma" e "Criar conta". Do lado, um "Z" 3D verde com ícones orbitando.
- Seções: 6 cards de recurso, canais (dois ainda "em breve"), 4 passos, código em abas (JS/Python/cURL/PHP) com botão copiar, 12 casos de uso e um FAQ que promete 3 perguntas e mostra 2. O link "Central do Dev" dá 404.
- Preço: **R$ 99,99/mês por canal** (até 9) e R$ 89,99 no Partner, com slider até 2.000 canais. **2 dias grátis**, escondido no botão do plano.
- Zero prova social. O visual (fundo quase preto, verde-limão, objeto 3D) é o mais caprichado do grupo, mas é o padrão de SaaS gerado.

#### W-API (w-api.app)
- Selo "API NÃO-OFICIAL" logo no topo. Hero: "A API de WhatsApp completa para o seu negócio!", com "TESTE POR 7 DIAS" e "Ver Documentação".
- Mostra um cartão de código e um mock de chat com "Instância ONLINE / 200 OK / 12ms". É o mais perto de mostrar o produto entre as brasileiras, mas tudo parado.
- Preço: **LITE R$ 19,90** (sem botões, listas e Pix), **PRO R$ 29,90** e pacote acima de 10 instâncias sob consulta. **7 dias grátis sem cartão**, escrito embaixo do botão.
- Prova social fraca: "2B+" (usuários do WhatsApp, não dela) e "700+ integrações".
- Visual de template: Poppins 800, eyebrow verde em cima de todo título, grade 3x3 de cards com ícone, editor estilo macOS com 3 bolinhas e brilho verde. No celular o código some do hero.

#### MegaAPI (megaapi.io)
- O domínio antigo megaapi.com.br dá erro 520 e o www faz dois redirecionamentos. A marca está espalhada em quatro domínios.
- Hero: "INTEGRAÇÃO WHATSAPP SIMPLES E PODEROSA", com selo "mensagens ilimitadas, preço fixo" e outro selo puxando para a API oficial de outro produto do grupo (WaBlast). CTA principal: **"TESTAR 10 DIAS GRÁTIS"**, sem cartão.
- Tem coisa boa: uma caixa amarela "dependência externa" avisando que o celular precisa estar online, um mock de instâncias (1 instância = 1 número) que ajuda o leigo a entender a cobrança, e uma doc com um bloco "leve este endpoint para o seu agente" com prompt pronto para IA.
- Preço confuso: o Business (R$ 139,90) tem 2 instâncias e o Start (R$ 99,90) tem 3. O mais caro dá menos números, e a diferença real (32 contra 118 endpoints) só aparece no FAQ. Com 1 instância sai a R$ 69,90.
- Página enorme (11 mil px no desktop, quase 19 mil no celular), com aula de "o que é API REST" e um carrossel de 20 casos. No celular tem rolagem lateral e o botão do WhatsApp cobre os números do hero.
- Visual "terminal neon": fundo preto, verde #00FF9D, mono em caixa alta, botão com canto cortado, cantoneiras e uma barra falsa de "MEM / CPU". Mistura isso com uma ilustração 3D cartoon.
- Fala que é não oficial no FAQ. Não fala de ban.

#### uazapi (uazapi.dev)
- O uazapi.com dá 404. A página que funciona é a .dev, feita no Bubble (sem H1, links sem `<a>`, rodapé "© 2023").
- Hero: "API premium do WhatsApp super leve e sempre atualizada", com "Assinar" e "Testar e ver documentação", que pede login até para ver a doc. Ilustração 3D de um cara num foguete.
- **Preço mais agressivo do mercado:** slider de 1 a 10 dispositivos (R$ 29 com 1, R$ 19 cada a partir de 2) e planos de servidor para quem revende: 100 números por R$ 138 e 300 por R$ 195 (R$ 0,65 por número). Mostra o custo por dispositivo em cada card. Só aceita cartão pelo Stripe.
- **O FAQ mais honesto que vi:** SLA escrito (seg a sex, 9h às 17h, primeira resposta em até 4h úteis), garantia de 7 dias com dinheiro de volta e uma resposta franca sobre ban, que explica denúncia e aquecimento de número.
- 2 depoimentos com nome e foto. Nicho claro no Bubble/no-code, com plugin e app de exemplo. A doc (docs.uazapi.com) é boa e moderna: 162 endpoints, OpenAPI, llms.txt para agentes, limite de 10 req/s publicado.
- Teste grátis não é explicado: não diz quantos dias nem se é grátis.

#### Evolution (evolution-api.com, hoje evolutionfoundation.com.br)
- Deixou de ser página de API. O domínio leva para um CRM de marketing com IA "sem entender de programação", a partir de R$ 297/mês. A API open source só aparece na doc.
- Vale como referência de escrita: texto em português claro, focado em dor, dados com fonte, "cancele quando quiser" perto do botão e print real do produto.
- No FAQ, usa o selo de parceiro Meta para dizer que canal não oficial é mais arriscado. O Zapvu não tem como disputar isso e precisa ser franco sobre o risco.
- Deixou um buraco: o dev brasileiro que procurava "Evolution API" hospedada e simples ficou sem página feita para ele.

### Gringas

#### Whapi.Cloud (whapi.cloud)
- Hero: "WhatsApp API for developers and integrations", com "Try for Free", "View documentation" e "Watch the demo". **5 dias grátis sem cartão** e um sandbox grátis para sempre com limites.
- Três caminhos de integração: escrever código, montar fluxo (n8n, Make, MCP) ou revender com a própria marca.
- **Prova social de verdade:** 3.300+ devs, 5,5 mil canais ativos, 21 milhões de requisições por mês e 3 depoimentos com cargo.
- Preço já aparece em reais para quem acessa do Brasil: **R$ 49/mês por número**, com R$ 140 riscado e selo "65% OFF", que tem cara de truque.
- FAQ de 12 perguntas, uma sobre bloqueio. Fala de MCP (Cursor, Claude Code, Codex).
- Visual de 2021: blobs roxos, bolinhas, ondas e 3D de banco. Tem rolagem lateral no desktop e no celular, e letter-spacing quebrado nos títulos do celular.

#### Ultramsg (ultramsg.com)
- Hero bem seco: "WhatsApp API", "API de nível empresarial por US$ 39/mês", com o preço na cara.
- 3 passos com a linguagem exata do produto (instância, ID e token, escanear QR). Biblioteca de tutoriais por linguagem e vídeos.
- O FAQ admite que spam bloqueia o número. **3 dias grátis.**
- Tema Bootstrap comprado, ilustração isométrica de banco e tradução automática ("Blogue", "taxas confortáveis").

#### WPPConnect (wppconnect.io e cloud.wppconnect.io)
- Projeto open source com uma versão hospedada. Fala direto com dev desde o H1 ("WhatsApp integration for developers") e põe código real na primeira dobra.
- O Cloud mostra o preço numa linha só embaixo dos botões: **US$ 9,99/mês, 1 conexão, cobrado em dólar.** Sem teste grátis, a assinatura começa depois do pagamento.
- Página curta (3 mil px), visual limpo estilo Vercel, com Geist e um verde só. Zero prova social e nada sobre ban.
- Tem uma página "WhatsApp Versions" que mostra que eles acompanham as atualizações do WhatsApp Web. Isso passa segurança para quem tem medo de a API quebrar.

#### Green-API (green-api.com)
- O link "Português" do menu aponta para um domínio .com.br que não existe. O brasileiro cai num link quebrado.
- Hero: "WhatsApp API for Business", com foto de banco e o slogan "GREEN Light to Your Dreams!". Um card de status no topo: "All systems operational, SLA 99.847%".
- **Plano grátis permanente** (3 chats) e tabela de preços que compara linha a linha: US$ 12 e US$ 36 por mês, mais planos de revenda com cobrança diária. O botão mensal/anual não muda o preço na tela.
- No celular, o hero tem um QR e um botão "Demo" que abre um bot no WhatsApp. É uma prova do produto, mas escondida.
- Página com mais de 20 seções e 15 mil px. O FAQ ensina a evitar ban e a fazer envio em massa sem bloqueio.

#### Maytapi (maytapi.com/pt), a que chegou mais perto
- Barra no topo anunciando o **"Safe Mode"**, que aquece número novo para reduzir o risco de ban. Trata o maior medo do público logo de cara.
- Hero: "API do WhatsApp para desenvolvedores e empresas", com código em abas (cURL, Node, Python, PHP, Go) e balões de WhatsApp chegando por cima, animados. **Embaixo do botão: "3 dias grátis · sem cartão · $24 / número / mês".**
- Números de operação: 2.000+ clientes, 24 milhões de requisições por dia, 99,98% de uptime em 12 meses, 184 ms de resposta. Política de retry de webhook escrita (3 tentativas em 30 min).
- Tabela comparando com a Cloud API da Meta e com a Twilio, com data de atualização. Calculadora de preço por quantidade de números. Ferramentas grátis (gerador de link wa.me, verificador de número) para puxar SEO.
- Fala "não oficial" sem rodeio e a resposta sobre ban é honesta.
- Contra: 13 seções numeradas e 16 mil px, "sem aprovação, sem templates" repetido umas cinco vezes, depoimentos só com primeiro nome, cobrança em dólar com IVA, português com cara de tradução. No celular o código do hero sai da tela. E a demo continua sendo animação: o visitante não manda nada.

#### Wassenger (wassenger.com)
- Saiu do mercado de QR. Virou caixa de entrada de equipe e CRM com IA em cima da API oficial da Meta, a partir de €39,90 mais as taxas da Meta. O FAQ se contradiz (fala em escanear QR e em "API oficial, sem métodos não oficiais" na mesma lista).
- Vale como referência de acabamento: tipografia forte, screenshot real do app no hero com abas por recurso e um passo a passo com o tempo de cada etapa ("2 min", "30 s").
- **7 dias grátis sem cartão**, e o FAQ diz o que acontece no fim do teste.

#### API Brasil (apibrasil.com.br)
- Não deu para ver. O site inteiro fica atrás de um bloqueio anti-robô que barra até preview de link e ferramenta de IA. Pelo que aparece de fora, o WhatsApp é um produto entre vários (SMS, FIPE, placa).

## O que todas têm (o mínimo esperado)
1. Hero com a promessa e dois botões: **testar grátis** e **ver documentação**.
2. **Código na tela**, de preferência em abas de linguagem (cURL, Node, Python, PHP) com botão copiar.
3. **Passo a passo de 3 etapas**: cria instância, escaneia o QR, manda mensagem.
4. Recursos: texto, mídia, áudio, documento, grupos, botões e listas, webhooks, status de entrega e leitura.
5. Casos de uso: cobrança, confirmação de agendamento, rastreio de pedido, chatbot com IA, NPS e atendimento com vários atendentes.
6. **Preço fixo por número**, mensagens sem cobrança extra e desconto por volume.
7. **Teste grátis** entre 2 e 10 dias. W-API, Whapi, Maytapi, MegaAPI e Wassenger dizem que não pedem cartão. Green-API, Whapi e Maytapi têm ainda um plano grátis permanente com limites.
8. FAQ com "É oficial?", "Preciso saber programar?", "Meu número pode ser bloqueado?" e "Como funciona o teste?".
9. Aviso no rodapé: "não é afiliada ao WhatsApp nem à Meta".

## Onde elas são fracas (as brechas pro Zapvu)
- **Ninguém deixa o visitante mandar uma mensagem.** A Maytapi chegou perto com código e balões animados, mas é vídeo de mentira. Um hero em que a pessoa escreve a mensagem e vê o caminho inteiro (token, QR, requisição, mensagem chegando no celular, status de lida) continua sendo o diferencial mais forte.
- **O espaço "API de WhatsApp em português, feita para quem integra" ficou vazio.** A Z-API virou Omni e nem escreve WhatsApp na home, a Evolution virou CRM e o Wassenger virou inbox com API oficial. Quem busca "API WhatsApp" não se reconhece nessas páginas. O Zapvu precisa pôr "WhatsApp" no H1 e no título da página.
- **Cobrança em real é raridade.** Maytapi, Ultramsg, WPPConnect e Green-API cobram em dólar, o Wassenger em euro, e a uazapi só aceita cartão. Preço em real, com Pix e nota fiscal, escrito perto do botão, já é argumento.
- **Prova social quase zero.** Só Whapi e Maytapi têm números de uso. Dá para mostrar coisa verdadeira desde o começo: página de status pública, changelog com data, SLA de suporte escrito. Sem inventar cliente.
- **O risco de ban fica escondido no FAQ** em quase todas. A Maytapi trata como produto (Safe Mode) e a uazapi tem a resposta mais honesta, mas dentro de um acordeão. Uma seção curta e franca, fora do FAQ, fala com quem já tomou ban em outra API.
- **O teste é mal explicado.** A MegaAPI promete 10 dias e não diz o que vem dentro, a uazapi nem diz se tem. Dizer dias, quantos números, se pede cartão e o que acontece no fim resolve.
- **Preço confuso.** A MegaAPI tem o plano mais caro com menos números, a W-API esconde recurso no plano barato. Preço por número que cai com o volume e o mesmo pacote de recursos para todos é o mais fácil de entender.
- **Básico técnico mal feito:** domínio raiz quebrado (MegaAPI, uazapi, Green-API), link 404 (Z-API), rolagem lateral no celular (MegaAPI, Whapi), código cortado no celular (Maytapi, WPPConnect), botão flutuante tapando conteúdo (MegaAPI, Ultramsg, W-API), bloqueio anti-robô na home (API Brasil, WPPConnect Cloud). Uma página leve, com H1 de verdade e sem esses erros, já ganha em SEO e confiança.
- **Visual repetido:** fundo escuro com verde neon (Z-API, W-API, MegaAPI), azul-marinho com 3D (uazapi), roxo com blobs (Whapi), off-white com verde (Evolution, WPPConnect, Green-API), branco com índigo (Maytapi). O verde do WhatsApp está em quase todas. Qualquer outra cor de marca já separa o Zapvu.
- **Integração no-code e IA:** Whapi e MegaAPI falam de n8n, Make e agentes de IA, mas só com logos. Fluxo pronto para importar e um prompt para colar no agente vão além.

## Ideias que vale pegar (sem copiar)
- Condição comercial embaixo do botão principal, numa frase (Maytapi, WPPConnect).
- Custo por número visível e calculado na hora (uazapi, Z-API).
- SLA de suporte com números e garantia de devolução (uazapi).
- Página de status e de compatibilidade com a versão do WhatsApp Web (Green-API, WPPConnect).
- Prompt pronto para agente de IA em cada exemplo e llms.txt na doc (MegaAPI, uazapi, Evolution).
- Explicar "1 instância = 1 número" com um mock de instâncias (MegaAPI).
- Dizer o que acontece no fim do teste (Wassenger).

## Proposta de estrutura para o Zapvu
O contrato de design (`docs/contrato-de-design.md`) fecha a ordem, os textos e o visual. Em resumo:
1. **Hero** com a demo: o visitante escreve a mensagem e vê ela sair do token, passar pelo QR e chegar num celular desenhado.
2. **Código** em cURL, Node, Python e PHP, com a resposta JSON e um botão para copiar o prompt para o agente de IA.
3. **Como funciona** em 3 passos.
4. **O que a API faz**, agrupado (mensagens, status e webhooks, grupos, instâncias).
5. **Casos de uso** com mensagens reais de um dia de clínica, loja, cobrança e delivery.
6. **Integrações** (n8n, Make, Typebot, Chatwoot, Bubble, agentes de IA), só as que funcionam.
7. **Como não tomar ban.**
8. **Preço por número** com seletor de quantidade.
9. **FAQ.**
10. **CTA final + rodapé** com o aviso de não afiliação à Meta.

## Cuidados
- Não usar o logo do WhatsApp nem as cores dele como marca. É marca da Meta, então citar o nome em texto basta.
- Não copiar texto nem layout de ninguém. Este estudo serve para entender o que o público espera.
- Prova social só com número real. Nada de "milhares de clientes" inventado.
- Não prometer "ban zero" nem publicar limite de envio ("X mensagens por hora") sem dado próprio.
- Não pôr link para produto de terceiros no hero.

## O que preciso saber do chefe
- [ ] Preço e planos: valor por número, se cai com o volume e a partir de quantos
- [ ] Teste grátis: quantos dias, quantos números, se pede cartão e o que acontece no fim (pausa? apaga?)
- [ ] Lista do que a API faz hoje (texto, mídia, áudio, documento, localização, botões, listas, grupos, canais, status de entrega e leitura)
- [ ] Endpoints e nomes de campos reais, para o código da página bater com a doc
- [ ] Se tem recursos contra ban: intervalo entre envios, "digitando…", pausa automática da fila, limite para número novo
- [ ] Se o celular precisa ficar online e por quanto tempo a conexão aguenta sem ele
- [ ] Link da documentação e do painel (login e cadastro), e se a doc é aberta sem login
- [ ] Domínio (zapvu.com.br?), se já tem logo e cores, e de onde vem o nome (é "zap" + "vu", de visto?)
- [ ] Integrações que já funcionam (n8n, Make, Typebot, Chatwoot, Bubble, MCP) e se tem fluxo pronto para baixar
- [ ] Formas de pagamento (Pix, cartão, boleto), se emite nota fiscal e como cancela
- [ ] Contato e horário do suporte (WhatsApp, e-mail) e tempo de primeira resposta
- [ ] Se tem página de status, changelog ou plano de revenda (white label)
- [ ] CNPJ e razão social para o rodapé, e o que fazem com os dados das mensagens (LGPD)
