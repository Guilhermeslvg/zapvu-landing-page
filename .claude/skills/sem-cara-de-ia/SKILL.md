---
name: sem-cara-de-ia
description: Regras para que sites, painéis, artes e textos não fiquem com cara de gerados por IA. Use SEMPRE antes de criar ou mexer em qualquer interface (HTML, CSS, React, landing page, painel, app), arte de post ou texto de marketing, e de novo antes de entregar, como revisão final.
---

# Sem cara de IA

O Guilherme vende sites para negócios reais (agência Zion, Timóteo/MG). Se o trabalho parecer saído de um gerador,
o cliente percebe e a venda morre. Toda interface e todo texto precisam parecer feitos por um estúdio que conhece o
cliente. Siga as regras abaixo ao criar e passe o checklist do fim antes de entregar.

## 1. Comece pelo assunto, não pelo modelo

- Antes de escrever código, responda: de quem é isso, para quem é, e qual a única tarefa da página.
- Use o mundo do cliente: termos do ramo, unidades reais, fotos reais do lugar, preços reais, bairro e cidade.
  Uma barbearia tem "corte + barba R$ 45", não "Serviços premium de alta qualidade".
- Coloque pelo menos um detalhe que só esse cliente teria (o nome da rua, o horário de sábado, o prato do dia).
- Nunca use lorem ipsum, "Seu Nome Aqui", depoimento inventado, número inventado ("+500 clientes satisfeitos")
  ou logo de empresa que não é cliente.

## 2. Visual: o que entrega IA na hora (evite, a não ser que o usuário peça)

- Degradê roxo para azul no topo, fundo creme com serifa e detalhe terracota, preto com um único verde-limão.
- Fonte Inter, Poppins ou Space Grotesk como escolha "segura". Escolha uma dupla com personalidade
  (ex.: Manrope, Sora, DM Sans, Fraunces, Instrument Serif, Bricolage Grotesque) e use poucas variações.
- Tudo centralizado; três cartões iguais lado a lado com ícone, título e duas linhas; seções 01 / 02 / 03
  numeradas sem que exista uma sequência de verdade.
- Emoji como marcador de seção ou de lista. Ícones genéricos de foguete, raio, estrela brilhando.
- O mesmo `border-radius`, a mesma sombra e a mesma borda em todos os blocos. Cartão serve para destacar um
  elemento, não para embrulhar tudo.
- Hero de tela inteira com título gigante e um subtítulo vago; animação em tudo que entra na tela.
- Brilho/glow neon, vidro fosco em todo lugar, blobs coloridos borrados sem motivo.
- Cinza puro (#888) como neutro. Puxe o cinza para o tom da marca.

## 3. Visual: o que faz parecer feito à mão

- Uma paleta pequena com nome e função (fundo, superfície, texto, apagado, destaque) e tudo saindo dela.
- Uma ousadia só por página (uma foto forte, um título com tratamento especial, uma interação) e o resto calmo.
- Hierarquia de verdade: um tamanho de título, um de subtítulo, um de corpo, um de legenda. Números em fonte
  tabular quando ficam em coluna.
- Espaçamento com `gap` em grid/flex, ritmo constante. Alinhamento à esquerda para texto corrido.
- Fotos reais do cliente sempre que existirem. Na falta, ilustração ou forma desenhada que tenha a ver com o
  assunto, nunca banco de imagem genérico de "pessoas sorrindo no escritório".
- Estados visíveis: hover, foco do teclado, vazio, carregando, erro. Tela vazia diz o que aparece ali e como
  adicionar o primeiro item.
- Funciona no celular (400px) sem rolagem lateral, com área de toque de pelo menos 40px.

## 4. Texto: o que entrega IA

- Palavras: "eleve", "potencialize", "revolucione", "transforme", "soluções inovadoras", "experiência única",
  "no mundo digital de hoje", "descubra", "desbloqueie", "jornada", "sinergia", "robusto", "de ponta".
- Estruturas: "Não é só X, é Y"; frase com dois-pontos e revelação; travessão (—) para aposto; listas de três
  adjetivos; perguntas retóricas no começo ("Cansado de...?"); "Vale ressaltar que".
- Botão vago ("Saiba mais", "Começar agora") quando dá para dizer o que acontece ("Ver os modelos",
  "Chamar no WhatsApp", "Pedir orçamento").

## 5. Texto: como escrever

- Português do Brasil, simples, como o dono do negócio falaria com o cliente no balcão.
- Frases curtas, voz ativa, verbo concreto. Diga preço, prazo e o que a pessoa recebe.
- Botão diz exatamente o que faz; aviso depois da ação confirma ("Salvo", "Mensagem enviada").
- Erro explica o que deu errado e como resolver, sem pedir desculpas genéricas.

## 6. Checklist antes de entregar

Responda cada item. Se algum for "sim" na primeira lista ou "não" na segunda, corrija antes de mostrar.

Tem cara de IA?
- [ ] Algum item da seção 2 ou 4 aparece sem o usuário ter pedido?
- [ ] Dá para trocar o nome do cliente por outro e a página continua servindo igual?
- [ ] Existe algum texto, número, depoimento ou foto inventado?

Tem cara de estúdio?
- [ ] A paleta e as fontes saíram de uma decisão e estão escritas como variáveis no começo do CSS?
- [ ] Existe um detalhe que só esse cliente tem?
- [ ] Olhei a página renderizada (computador e celular) e não tem nada encavalado, cortado ou desalinhado?
- [ ] Todo botão diz o que faz e todo estado (vazio, erro, carregando) foi pensado?
