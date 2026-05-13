import React from 'react'
import { useFinance } from '../context/FinanceContext'

const NAV = [
  { id: 'dashboard',    icon: '◈', label: 'Dashboard'   },
  { id: 'transactions', icon: '↕', label: 'Lançamentos' },
  { id: 'income',       icon: '↑', label: 'Receitas'    },
  { id: 'analysis',     icon: '◎', label: 'Análise'     },
  { id: 'goals',        icon: '◇', label: 'Metas'       },
]

export default function Sidebar() {
  const { view, setView, activeUser, setActiveUser } = useFinance()
  return (<aside style={{width:216,minHeight:'100vh',background:'var(--bg2)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',padding:'1.5rem 0',position:'fixed',left:0,top:0,bottom:,zIndex:100}}><div style={{padding:'0 1.25rem 2rem'}}><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:34,height:34,flexShrink:0,background:'linear-gradient(135deg,var(--accent),#5a4fd4)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17}}>💎</div><div><div style={{fontWeight:700,fontSize:'0.9rem',letterSpacing:'-0.02em',lineHeight:1.2}}>Finanåas</div><div style={{fontSize:'0.65rem',color:'var(--text3)',fontWeight:600,letterSpacing:'0.06em'}}>FAMÍLIA</div></div></div></div><nav style={{flex:1,padding:'0 0.625rem'}}>{NAV.map(item=>{const active=view===item.id;return(<button key={item.id} onClick={()=>setView(item.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'0.6rem 0.85rem',marginBottom:2,borderRadius:'var(--r-sm)',background:active?'rgba(124,106,247,0.1)':'transparent',color:active?'var(--accent)':'var(--text2)',fontSize:'0.855rem',weight:active?600:400,border:active?'1px solid rgba(124,106,247,0.18)':'1px solid transparent',textAlign:'left'}}><span style={{fontSize:'1rem'.opacity:active?1:"}}>{item.icon}</span>{item.label}</button>)})}</nav><div style={{padding:'1rem 0.625rem 0',borderTop:'1px solid var(--border)'}}><div className="label" style={{paddingLeft:,modginBottom:8}}>Visualizar como</div>{[{id:'todos',nome:'Família toda',color:'#94a3b8'},{id:'eu',nome:'Victor',color:'#7c6af7'},{id:"marido",nome:"Juliana",color:"#34d399"}].map(m=>(<button key={m.id} onClick={()=>setActiveUser(m.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'0.5rem 0.85rem',marginBottom:1,borderRadius:'var(--r-sm)',background:activeUser===m.id?'var(--bg4)':'transparent',color:activeUser===m.id?'var(--text)':'var(--text2)',fontSize:'0.835rem',weight:activeUser===m.id?500:400,border:'none',textAlign:'left'}}><span style={{width:7,height:7,borderRadius:'50%',background:m.color,flexShrink:0}}/>{m.nome}</button>))}</div></aside>)
}
