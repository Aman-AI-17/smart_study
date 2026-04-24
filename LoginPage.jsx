import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Background from '../components/Background'

export default function LoginPage() {
  const { login } = useApp()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!login(username, password)) {
      setError('Invalid credentials')
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.1)', background: '#fff',
    fontSize: 15, outline: 'none', color: '#1a0a2e',
    fontFamily: 'Nunito, sans-serif', marginBottom: 14
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Background theme="day" />
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%'
      }}>
        <div style={{
          background: '#fffde7', borderRadius: 24, padding: '40px 40px',
          width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          animation: 'slideIn 0.5s ease'
        }}>
          {/* Tree decoration */}
          <div style={{ textAlign: 'center', marginBottom: -10 }}>
            <div style={{ fontSize: 32 }}>🌲</div>
          </div>

          <h1 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: '#f97316', marginBottom: 6 }}>
            Smart Study
          </h1>
          <p style={{ textAlign: 'center', color: '#92400e', fontSize: 14, marginBottom: 28 }}>
            Sign in to your learning workspace
          </p>

          <input
            type="text" placeholder="Username" value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={inputStyle}
          />

          {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 10, textAlign: 'center' }}>{error}</p>}

          <button onClick={handleSubmit} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none', color: '#fff',
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
            transition: 'transform 0.15s, box-shadow 0.15s'
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(249,115,22,0.5)' }}
            onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 4px 15px rgba(249,115,22,0.4)' }}
          >
            Sign In
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#b45309', marginTop: 16 }}>
            Demo credentials: admin / study123
          </p>
        </div>
      </div>
    </div>
  )
}
