import React, { useState, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import KnowledgeBase from './pages/KnowledgeBase'
import StudyTools from './pages/StudyTools'
import {
  RevisionPage, BattlePage, AnnotationsPage,
  StudyDNAPage, StatsPage, FocusModePage, ReportPage
} from './pages/OtherPages'

function MainApp() {
  const { user, theme } = useApp()
  const [page, setPage] = useState('knowledge')
  const [focusOpen, setFocusOpen] = useState(false)

  useEffect(() => {
    const handler = () => setFocusOpen(false)
    window.addEventListener('closeFocus', handler)
    return () => window.removeEventListener('closeFocus', handler)
  }, [])

  useEffect(() => {
    if (page === 'focus') {
      setFocusOpen(true)
      setPage('knowledge')
    }
  }, [page])

  if (!user) return <LoginPage />

  const PAGES = {
    knowledge: <KnowledgeBase />,
    tools: <StudyTools />,
    revision: <RevisionPage />,
    battle: <BattlePage />,
    annotations: <AnnotationsPage />,
    dna: <StudyDNAPage />,
    stats: <StatsPage />,
    report: <ReportPage />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Background theme={theme} />

      {/* Focus Mode overlay */}
      {focusOpen && <FocusModePage />}

      {/* Sidebar */}
      <Sidebar activePage={page} setPage={(p) => {
        if (p === 'focus') setFocusOpen(true)
        else setPage(p)
      }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <Navbar setPage={setPage} />
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {PAGES[page] || <KnowledgeBase />}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}
