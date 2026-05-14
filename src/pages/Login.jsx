import React, { useState } from 'react'
export default function Login({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true); setError('')
    setTimeout(() => {
      const correct = import.meta.env.VITE_APP_PASSWORD
      if (!correct || pw === correct) { sessionStorage.setItem('ff_auth', '1'); onLogin() }
      else { setError('Senha incorreta. Tente novamente.'); setLoading(false) }
    }, 400)
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',backgroundImage:"radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,106,247,0.08) 0%, transparent 70%)"}}>
      <div className="fade-up" style={{width:'100%',maxWidth:380,padding:'0 1.5rem'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{width:60,height:60,margin:'0 auto 1rem',background:'linear-gradient(135deg,var(--accent),#5a4fd4)',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,boxShadow:'0 8px 32px rgba(124,106,247,0.25)'}}>💎<div>
          <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:6}}>FinanåasFamília</h1>
          <p style={{color:'var(--text2)',fontSize:'0.875rem'}}>Controle financeiro do casal</p>
        </div>
        <div className="card-lg">
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'1.25rem'}}>
              <label className="label" style={{display:'block',marginBottom:8}}>Senha do casal</label>
              <input type="password" value={pw} onChange={e=>setPw(e.target.value)} autoFocus style={{fontSize:'1rem',letterSpacing:'0.1em'}}/>
              {error&&<p style={{color:'var(--red)',fontSize:'0.8rem',marginTop:8}}>{error}</p>}
            </div>
            <button type="submit" className="btn-primary" style={{width:'100%',padding:'0.75rem',fontSize:'0.9rem'}} disabled={loading||!pw}>{loading?'Verificando...':'Entrar →'}</button>
          </form>
        </div>
        <p style={{textAlign:'center',color:'var(--text3)',fontSize:'0.75rem',marginTop:'1.5rem'}}>A senha é definida na variável VITE_APP_PASSWORD</p>
      </div>
    </div>
  )
}
