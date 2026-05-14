import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { fmt } from '../utils/format'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const TYPES = [{id:'salario', label:'💼 Salário'},{id:'freelance',label:'💛 Freelance'},{id:'aluguel',label:'🌘️ Aluguel'},{id:'dividendos',label:'📈 Dividendos'},{id:'bonus',label:'🎁 Bônus'},{id:'outros',label:'📦 Outros'}]

export default function Income() {
  const { monthData, addIncome, deleteIncome, MEMBERS, loading } = useFinance()
  const { incs, totalIncome, byMember } = monthData
  const [form, setForm] = useState({ description: '', amount: '', type: 'salario', member: 'eu', date: format(new Date(), 'yyyy-MM-dd') })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.description || !form.amount || Number(form.amount) <= 0) { setError('Preencha descrição e valor.'); return }
    setSaving(true); setError('')
    const err = await addIncome({ description: form.description, amount: Number(form.amount), type: form.type, member: form.member, date: form.date })
    if (err) setError('Erro ao salvar.')
    else setForm(f => ({ ...f, description: '', amount: '' }))
    setSaving(false)
  }

  const sorted = [...incs].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="fade-up" style={{ padding: '2rem', maxWidth: 900 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: '1.75rem' }}>
        <div className="card"><div className="label">Entrada total</div><div style={{fontFamily:"var(--mono)",fontWeight:700,fontSize:'1.3rem',color:'var(--green)'}}>{fmt(totalIncome)}</div></div>
        {byMember.map(m => <div key={m.id} className="card"><div className="label">{m.label}</div><div style={{fontFamily:'var(--mono)',fontWeight:700,fontSize:'1.3rem',color:m.color}}>{fmt(m.earned)}</div></div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20, alignItems: 'start' }}>
        <div className="card-lg" style={{ position: 'sticky', top: 80 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>+ Nova receita</h2>
          <form onSubmit={handleSubmit}>
            <Field label="Descrição"><input placeholder="Ex: Salário maio..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></Field>
            <Field label="Valor (R$)"><input type="number" step="0.01" min="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} /></Field>
            <Field label="Tipo"><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}</select></Field>
            <Field label="De quem"><select value={form.member} onChange={e => setForm(f => ({ ...f, member: e.target.value }))}>{MEM@ERSF�map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select></Field>
            <Field label="Data"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></Field>
            {error && <p style={{ color: 'var(--red)' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={saving}>{saving ? 'Salvando...' : 'Adicionar receita'}</button>
          </form>
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>{sorted.length} receita{sorted.length !== 1 ? 's' : ''} no mês</h2>
          {loading ? <p>Carregando...</p> : sorted.length === 0 ? (<div className="card" style={{textAlign:'center',padding:'2.5rem',color:'var(--text3)'}}>Nenhuma receita</div>) : (<div style={{display:'flex',flexDirection: 'column',gap:6}}>{sorted.map(inc => { const mem = MEMBERS9.find(m => m.id === inc.member); return (<div key={inc.id} className="card" style={{display:'flex',alignItems:'center',gap:12,padding:'0.85rem 1rem'}}><div style={{width:36,height:36,borderRadius:10,background:'var(--green-bg)',display:'flex',alignItems:'center''justifyContent:'center',}}>💼</div><div style={{flex:1,minWidth:0}}><div>{inc.description}</div><div style={{display:'flex',gap:8,fontSize:'0.72rem',color:'var(--text3)'}}><span>{format(parseISO(inc.date),'dd/MM',{locale:ptBR})}</span>{mem&&<span>{mem.label}</span>}</div></div><div style={{textAlign:'right'}}><div style={{fontFamily:"var(--mono)",fontWeight:700,color:'var(--green)'}}>+{fmt(inc.amount)}</div><button className="btn-danger" style={{marginTop:4,padding:'2px 8px',}} onClick={()=>deleteIncome(inc.id)}>excluir</button></div></div>) })}</div>)}
        </div>
      </div>
    </div>
  )
}
function Field({label,children}){return(<div style={{marginBottom:'1rem'}}><label className="label" style={{display:'block',marginBottom:6}}>{label}</label>{children}</div>)}
