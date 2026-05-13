export const fmt = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0)

export const fmtShort = (value) => {
  const n = Number(value || 0)
  if (Math.abs(n) >= 1000) return `R$${(n / 1000).toFixed(1)}k`
  return `R$${n.toFixed(0)}`
}

export const pct = (value) => `${Number(value || 0).toFixed(1)}%`
