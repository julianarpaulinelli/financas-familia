export const CATEGORIES = [
  { id: 'moradia',       label: 'Moradia',       color: '#7c6af7', icon: '🏠', goalPct: 30 },
  { id: 'alimentacao',   label: 'Alimentação',   color: '#34d399', icon: '🍽️', goalPct: 15 },
  { id: 'transporte',    label: 'Transporte',    color: '#60a5fa', icon: '🚗', goalPct: 10 },
  { id: 'saude',         label: 'Saúde',         color: '#f472b6', icon: '❤️', goalPct: 5  },
  { id: 'educacao',      label: 'Educação',      color: '#2dd4bf', icon: '📚', goalPct: 5  },
  { id: 'lazer',         label: 'Lazer',         color: '#fbbf24', icon: '🎉', goalPct: 10 },
  { id: 'assinaturas',   label: 'Assinaturas',   color: '#f87171', icon: '📱', goalPct: 5  },
  { id: 'vestuario',     label: 'Vestuário',     color: '#a78bfa', icon: '👗', goalPct: 5  },
  { id: 'investimentos', label: 'Investimentos', color: '#6ee7b7', icon: '📈', goalPct: 0  },
  { id: 'outros',        label: 'Outros',        color: '#94a3b8', icon: '📦', goalPct: 5  },
]

export const MEMBERS = [
  { id: 'eu',     label: 'Victor',  color: '#7c6af7' },
  { id: 'marido', label: 'Juliana', color: '#34d399' },
]

export const GOALS_CONFIG = [
  {
    id: 'poupanca',
    icon: '💰',
    label: 'Poupar ≥ 20% da receita',
    description: 'Regra de ouro: pelo menos 1/5 do que entra deve sobrar.',
    target: 20,
    type: 'savings_min',
  },
  {
    id: 'essenciais',
    icon: '🏡',
    label: 'Gastos essenciais ≤ 50%',
    description: 'Moradia, alimentação, saúde e transporte não devem passar de metade da renda.',
    target: 50,
    type: 'essential_max',
    cats: ['moradia', 'alimentacao', 'transporte', 'saude'],
  },
  {
    id: 'lazer_limit',
    icon: '🎯',
    label: 'Lazer + assinaturas ≤ 10%',
    description: 'Entretenimento e serviços são importantes, mas têm limite saudável.',
    target: 10,
    type: 'cat_max',
    cats: ['lazer', 'assinaturas'],
  },
  {
    id: 'investimentos',
    icon: '📈',
    label: 'Investir ≥ 10% da receita',
    description: 'Construção de patrimônio de longo prazo.',
    target: 10,
    type: 'cat_min',
    cats: ['investimentos'],
  },
]
