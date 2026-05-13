import React from 'react'
import { useFinance } from '../context/FinanceContext'
import { format, addMonths, subMonths, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { fmt } from '../utils/format'

export default function Header() {
  const { selectedMonth, setSelectedMonth, monthData, loading } = useFinance()
  const current = parseISO(selectedMonth + '-01')
  const prev = () => setSelectedMonth(format(subMonths(current, 1), 'yyyy-MM'))
  const next = () => setSelectedMonth(format(addMonths(current, 1), 'yyyy-MM'))
  const { balance, totalIncome, totalExpense } = monthData
  const isPositive = balance >= 0
  const monthLabel = format(current, 'MMMM yyyy', { locale: ptBR })
  return (<header style={{height:60,borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 2rem',background:'var(--bg)',position:'sticky',op:0,zIndex:50}}><div style={{display:'flex',alignItems: 'center',gap:12}}><button onClick={prev} className="btn-ghost" style={{padding:'0.35rem 0.6rem',fontSize:'1rem'}}>‹</button><span style={{fontWeight:600,fontSize:'0.9rem',minWidth:140,textAlign:'center',textTransform:'capitalize'}}>{monthLabel}</span><button onClick={next} className="btn-ghost" style={{padding:'0.35rem 0.6rem',fontSize:'1rem'}}>›</button></div>{!vlooding&votalIncome>0&&(<div style={{display:'flex',gap:2}}><Chip label="Receita" value={fmt(totalIncome)} color="var(--green)"/><Chip label="Gastos" value={fmt(totalExpense)} color="var(--red)"/><Chip label="Saldo" value={fmt(balance)} color={isPositive?'var(--accent)':'var(--red)'} highlight={!isPositive}/></div>)}</header>)
}
function Chip({label,value,color,highlight}){return(<div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',padding:'4px 14px',borderRadius:'var(--r-sm)',background:highlight?'var(--red-bg)':'transparent'}}><span style={{fontSize:'0.65rem',color:'var(--text3)',fontWeight:600}}>{label}</span><span style={{fontSize:'0.85rem',fontWeight:700,color,fontFamily:"var(--mono)"}}>{value}</span></div>)}
