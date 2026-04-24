import React from 'react'
import { useApp } from '../context/AppContext'

export default function Navbar({ setPage }) {
  const { user, logout, documents, theme } = useApp()
  const isDay = theme === 'day'

  return (
    <div style={{
      height: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 24px', gap: 16,
      background: isDay ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'}`,
      zIndex: 10, position: 'relative', flexShrink: 0
    }}>
      <button onClick={() => setPage('knowledge')} style={{
        padding: '5px 14px', borderRadius: 20,
        background: '#f97316', border: 'none', color: '#fff',
        fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 0.5
      }}>
        {documents.length} DOCUMENTS
      </button>

      <button onClick={() => setPage('report')} style={{
        background: 'none', border: 'none',
        color: isDay ? '#1a0a2e' : '#fde68a',
        cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6
      }}>
        📄 Report
      </button>

      <span style={{ color: isDay ? '#1a0a2e' : '#fde68a', fontWeight: 600, fontSize: 14 }}>
        {user?.username}
      </span>

      <button onClick={logout} style={{
        background: 'none', border: 'none',
        color: isDay ? '#92400e' : '#d97706',
        cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4
      }}>
        → Log out
      </button>
    </div>
  )
}
