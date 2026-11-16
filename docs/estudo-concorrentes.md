# Estudo das landing pages concorrentes (16/11/2026)

O Zapvu é uma API de WhatsApp não oficial: a pessoa cria uma instância, pega o token, escaneia o QR code e já manda e recebe mensagem por HTTP. Olhei as páginas de quem vende a mesma coisa para saber o que o público já espera e onde dá para ser diferente.

## O que cada um faz

### Z-API (z-api.io)
- A home de hoje vende o **Z-API Omni**, com vários canais numa API só (chat, Instagram, Messenger, e-mail, TikTok, Mercado Livre). O WhatsApp por QR virou só um dos canais.
- Hero: "Uma única API para todos os seus canais de mensagens", com os botões "Acessar a plataforma" e "Criar conta". Do lado, um diagrama de fluxo (Evento recebido → via API REST → Qualificado → Convertido).
- Seções: 6 cards de recurso (REST com Swagger, webhooks, segurança, SLA de 99,9%), canais, um "como começar" em 4 passos, devs (SDKs em JS, Python, PHP, Go e .NET, sandbox e Postman), código em abas (JS/Python/cURL/PHP), 12 casos de uso e FAQ.
- Preço: **R$ 99,99/mês por canal** (até 9 canais) e R$ 89,99 no Partner (10 ou mais, com um slider até 2.000). **2 dias grátis.**
- Não mostra depoimento nem logo de cliente.

### W-API (w-api.app)
- Selo "API NÃO-OFICIAL" logo no topo. Hero: "A API de WhatsApp completa para o seu negócio!", com os botões "TESTE POR 7 DIAS" e "Ver Documentação".
- Tem um trecho de código do SDK com um log de terminal ("Message sent... [200 OK]") e um mock de chat com menu interativo.
- 9 benefícios (fila para proteger o número, confirmação de leitura, grupos, botões, cobrança Pix), 8 casos de uso e FAQ de 4 perguntas ("É oficial?", "Preciso de dev?").
- Preço: **LITE R$ 19,90** (1 instância, sem botões, listas e Pix), **PRO R$ 29,90** (tudo liberado) e pacote acima de 10 instâncias com desconto progressivo. **7 dias grátis sem cartão.**
- Prova social fraca: "2B+" (usuários do WhatsApp, não clientes dela) e "700+ integrações".
- No rodapé avisa que não tem ligação com a Meta.

### Whapi.Cloud (whapi.cloud), a mais completa
- Hero: "WhatsApp API for developers and integrations", com os botões "Try for Free", "View documentation" e "Watch the demo". **5 dias grátis sem cartão.**
- Três caminhos de integração: escrever código, montar fluxo (n8n, Make, MCP) ou revender com a própria marca (white label).
- Passo a passo em 3 etapas: pareia por QR, manda a primeira mensagem, recebe respostas.
- **Prova social de verdade:** 3.300+ devs, 5,5 mil canais ativos, 21 milhões de requisições por mês e 3 depoimentos.
- Preço: sandbox grátis com limites + **US$ 29/mês por número**, com seletor de quantidade e desconto por volume.
- FAQ de 11 perguntas, uma delas sobre risco de bloqueio. Ferramentas grátis no rodapé (gerador de link e de QR) para puxar SEO.
- Já fala de **MCP** (Cursor, Claude Code, Codex usando a API).

### Ultramsg (ultramsg.com)
- Hero bem seco: "WhatsApp API for medium and large businesses", "$39/month". Logo abaixo, uma fileira de linguagens (PHP, Node, Python, Java, .Net, Go...).
- 3 passos (cria instância → escaneia QR → manda), sem cobrança por mensagem, pronto em menos de 5 minutos.
- O FAQ é honesto sobre envio em massa: não limitam, mas avisam que spam bloqueia o número.
- **3 dias grátis.** Não mostra cliente nem depoimento.

Megaapi e uazapi bloquearam a leitura automática (erro 520 e 403). Dá para olhar no navegador depois, se precisar.

## O que todas têm (o mínimo esperado)
1. Hero com a promessa e dois botões: **testar grátis** e **ver documentação**.
2. **Código na tela**, de preferência em abas de linguagem (cURL, Node, Python, PHP).
3. **Passo a passo de 3 etapas**: cria instância, escaneia o QR, manda mensagem.
4. Grade de recursos: texto, mídia, áudio, documento, grupos, botões e listas, webhooks, status de entrega e leitura.
5. Casos de uso: cobrança, confirmação de agendamento, rastreio de pedido, chatbot com IA, NPS e atendimento com vários atendentes.
6. **Preço fixo por instância**, mensagens ilimitadas e desconto por volume.
7. **Teste grátis** entre 2 e 7 dias, e a W-API e a Whapi não pedem cartão.
8. FAQ com "É oficial?", "Preciso saber programar?", "Meu número pode ser bloqueado?" e "Como funciona o teste?".
9. Aviso no rodapé: "não é afiliada ao WhatsApp nem à Meta".

## Onde elas são fracas (as brechas pro Zapvu)
- **Ninguém mostra o produto funcionando.** Todo mundo diz "conecte em 5 minutos", mas nenhuma mostra o fluxo de token → QR → mensagem chegando no celular. Um hero interativo com isso seria o diferencial mais forte.
- **Prova social quase zero** nas brasileiras. Mesmo começando, dá para mostrar números honestos (uptime, tempo de resposta da API, página de status pública) em vez de inventar cliente.
- **Visual genérico:** cards iguais, emoji como ícone, gradiente roxo ou verde. Uma identidade própria já faz o Zapvu se destacar.
- **O risco de ban fica escondido no FAQ.** Uma seção curta e honesta de boas práticas (aquecimento de número, fila com intervalo, não mandar spam) passa confiança e fala com quem já tomou ban em outra API.
- **Preço:** a W-API puxou o preço para baixo (R$ 19,90 a 29,90), a Z-API cobra R$ 99,99 e a Whapi US$ 29. O Zapvu precisa escolher um lado e deixar claro o que cada plano libera.
- **Integração no-code e IA:** só a Whapi fala bem de n8n, Make e MCP. Em 2026 isso pesa muito para quem monta automação.

## Proposta de estrutura para o Zapvu (rascunho)
1. **Hero:** promessa curta + o mock interativo (token → QR → "mensagem enviada" chegando num celular). Botões: Testar grátis / Ver documentação.
2. **Código:** um envio em cURL, Node, Python e PHP, com a resposta da API ao lado.
3. **Como funciona:** 3 passos.
4. **O que dá para fazer:** recursos agrupados por tipo (mensagens, grupos, webhooks, gestão de instâncias), e não 12 cards iguais.
5. **Casos de uso**, com exemplo real de mensagem em cada um.
6. **Integrações:** n8n, Make, Typebot, Chatwoot e MCP (confirmar com o chefe o que funciona).
7. **Boas práticas para não tomar ban.**
8. **Preço:** por instância, com seletor de quantidade.
9. **FAQ.**
10. **CTA final + rodapé** com o aviso de não afiliação à Meta.

## Cuidados
- Não usar o logo do WhatsApp nem as cores dele como marca. É marca da Meta, então citar o nome em texto basta.
- Não copiar texto nem layout de ninguém. Este estudo serve para entender o que o público espera.
- Prova social só com número real. Nada de "milhares de clientes" inventado.

## O que preciso saber do chefe
- [ ] Preço e planos (por instância? tem plano de entrada?)
- [ ] Teste grátis: quantos dias, e pede cartão?
- [ ] Lista do que a API faz hoje (botões, listas, grupos, canais, status, Pix?)
- [ ] Link da documentação e do painel (login/cadastro)
- [ ] Domínio (zapvu.com.br?) e se já tem logo e cores
- [ ] Integrações que já funcionam (n8n, Make, Typebot, Chatwoot, MCP)
- [ ] Contato de suporte (WhatsApp, e-mail)
