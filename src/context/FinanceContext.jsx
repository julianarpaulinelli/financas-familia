import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../utils/supabase'
import { CATEGORIES, MEMBERS, GOALS_CONFIG } from '../utils/constants'
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [incomes, setIncomes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [activeUser, setActiveUser] = useState('todos')
  const [view, setView] = useState('dashboard')
  const fetchData = useCallback(async () => {
    setLoading(true)
    const [txRes, incRes] = await Promise.all([
      supabase.from('transactions').select('*').order('date', { ascending: false }),
      supabase.from('incomes').select('*').order('date', { ascending: false }),
    ])
    if (txRes.data) setTransactions(txRes.data)
    if (incRes.data) setIncomes(incRes.data)
    setLoading(false)
  }, [])
  useEffect(() => { fetchData() }, [fetchData])
  useEffect(() => {
    const txSub = supabase.channel('transactions').on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, fetchData).subscribe()
    const incSub = supabase.channel('incomes').on('postgres_changes', { event: '*', schema: 'public', table: 'incomes' }, fetchData).subscribe()
    return () => { supabase.removeChannel(txSub); supabase.removeChannel(incSub) }
  }, [fetchData])
  const addTransaction = async (tx) => { const { error } = await supabase.from('transactions').insert([tx]); if (!error) fetchData(); return error }
  const deleteTransaction = async (id) => { const { error } = await supabase.from('transactions').delete().eq('id', id); if (!error) fetchData() }
  const addIncome = async (inc) => { const { error } = await supabase.from('incomes').insert([inc]); if (!error) fetchData(); return error }
  const deleteIncome = async (id) => { const { error } = await supabase.from('incomes').delete().eq('id', id); if (!error) fetchData() }
  const monthData = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const start = startOfMonth(new Date(year, month - 1))
    const end = endOfMonth(new Date(year, month - 1))
    const inRange = (d) => { try { return isWithinInterval(parseISO(d), { start, end }) } catch { return false } }
    const filterByUser = (items) => activeUser === 'todos' ? items : items.filter(i => i.member === activeUser)
    const txs = filterByUser(transactions.filter(t => inRange(t.date)))
    const incs = filterByUser(incomes.filter(i => inRange(i.date)))
    const totalIncome = incs.reduce((s, i) => s + Number(i.amount), 0)
    const totalExpense = txs.reduce((s, t) => s + Number(t.amount), 0)
    const balance = totalIncome - totalExpense
    const savingsPct = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0
    const byCategory = CATEGORIES.map(cat => {
      const catTxs = txs.filter(t => t.category === cat.id)
      const amount = catTxs.reduce((s, t) => s + Number(t.amount), 0)
      return { ...cat, amount, pctOfExpense: totalExpense > 0 ? (amount / totalExpense) * 100 : 0, pctOfIncome: totalIncome > 0 ? (amount / totalIncome) * 100 : 0, count: catTxs.length }
    })
    const byMember = MEMBERS.map(m => {
      const mTxs = transactions.filter(t => inRange(t.date) && t.member === m.id)
      const mIncs = incomes.filter(i => inRange(i.date) && i.member === m.id)
      return { ...m, spent: mTxs.reduce((s, t) => s + Number(t.amount), 0), earned: mIncs.reduce((s, i) => s + Number(i.amount), 0), txCount: mTxs.length }
    })
    const goalProgress = GOALS_CONFIG.map(g => {
      let current = 0, label = '', ok = false
      if (g.type === 'savings_min') { current = savingsPct; ok = current >= g.target; label = `${current.toFixed(1)}% poupado` }
      else { const sum = byCategory.filter(c => g.cats.includes(c.id)).reduce((s, c) => s + c.pctOfIncome, 0); current = sum; ok = g.type.endsWith('max') ? current <= g.target : current >= g.target; label = `${current.toFixed(1)}% da receita` }
      return { ...g, current, label, ok, progress: Math.min((current / g.target) * 100, 100) }
    })
    const alerts = []
    if (totalIncome > 0) {
      if (totalExpense > totalIncome) alerts.push({ type: 'red', msg: 'Gastos superaram a receita este mês!', icon: '🚨' })
      else if (savingsPct < 20) alerts.push({ type: 'amber', msg: `Poupando ${savingsPct.toFixed(0)}% — meta é 20%`, icon: '⚠️' })
    }
    if (txs.length === 0 && incomes.length === 0) alerts.push({ type: 'blue', msg: 'Comece adicionando receitas e gastos!', icon: '👋' })
    return { txs, incs, totalIncome, totalExpense, balance, savingsPct, byCategory, byMember, goalProgress, alerts }
  }, [transactions, incomes, selectedMonth, activeUser])
  return (<FinanceContext.Provider value={{ transactions, incomes, loading, selectedMonth, setSelectedMonth, activeUser, setActiveUser, view, setView, monthData, addTransaction, deleteTransaction, addIncome, deleteIncome, CATEGORIES, MEMBERS, GOALS_CONFIG }}>{children}</FinanceContext.Provider>)
}
export const useFinance = () => useContext(FinanceContext)
