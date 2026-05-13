import React, { useState, useEffect } from 'react'
import { FinanceProvider, useFinance } from './context/FinanceContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Income from './pages/Income'
import Analysis from './pages/Analysis'
import Goals from './pages/Goals'
import Login from './pages/Login'

function AppShell() {
  const { view } = useFinance()
  const pages = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    income: <Income />,
    analysis: <Analysis />,
    goals: <Goals />,
  }
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: 216, flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {pages[view] || <Dashboard />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    const pw = import.meta.env.VITE_APP_PASSWORD
    if (!pw || sessionStorage.getItem('ff_auth') === '1') setAuthed(true)
  }, [])
  if (!authed) return <Login onLogin={() => setAuthed(true)} />
  return <FinanceProvider><AppShell /></FinanceProvider>
}
