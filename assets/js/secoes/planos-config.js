/* Planos da Zapvu: edite só este arquivo.
   Nada aqui foi inventado: onde o valor ainda não está definido, deixe null
   e a página mostra "a definir". Quando houver preço anual em algum plano,
   o seletor Mensal / Anual aparece sozinho.

   preco: número em reais (ex.: 39) ou null
   instancias: texto (ex.: "Até 3 números") ou null
   recursos / limites: lista de textos ([] = a definir)
   suporte: texto ou null
   cta: texto e link do botão */
window.ZAPVU_PLANOS = [
  {
    id: 'starter',
    nome: 'Starter',
    publico: 'Para desenvolvedores e pequenos projetos.',
    preco: { mensal: null, anual: null },
    instancias: null,
    recursos: [],
    limites: [],
    suporte: null,
    cta: { texto: 'Começar com Starter', href: '#criar-conta' },
  },
  {
    id: 'professional',
    nome: 'Professional',
    publico: 'Para empresas, agências e operações em crescimento.',
    destaque: true,
    preco: { mensal: null, anual: null },
    instancias: null,
    recursos: [],
    limites: [],
    suporte: null,
    cta: { texto: 'Assinar Professional', href: '#criar-conta' },
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    publico: 'Para operações que precisam de capacidade e atendimento personalizados.',
    preco: { mensal: null, anual: null },
    instancias: null,
    recursos: [],
    limites: [],
    suporte: null,
    cta: { texto: 'Falar com a equipe', href: '#contato' },
  },
];
