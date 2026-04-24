import React, { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'

const NAV = [
  { id: 'knowledge', label: 'Knowledge Base', icon: '📊' },
  { id: 'tools', label: 'Study Tools', icon: '🎯' },
  { id: 'revision', label: 'Revision', icon: '📅' },
  { id: 'battle', label: 'Battle', icon: '⚔️' },
  { id: 'annotations', label: 'Annotations', icon: '✏️' },
  { id: 'dna', label: 'Study DNA', icon: '🧬' },
  { id: 'stats', label: 'Stats', icon: '📈' },
  { id: 'focus', label: 'Focus Mode', icon: '🎯' },
]

export default function Sidebar({ activePage, setPage }) {
  const { theme, setTheme, studyTime, timerRunning, setTimerRunning, resetTimer, formatTime, timerDuration, setTimerDuration, voiceNotes, setVoiceNotes } = useApp()
  const [recording, setRecording] = useState(false)
  const mediaRef = useRef(null)
  const chunksRef = useRef([])

  const isDay = theme === 'day'

  const sidebarStyle = {
    width: 270, minWidth: 270,
    background: isDay
      ? 'linear-gradient(180deg, #fff8e1 0%, #fffde7 100%)'
      : 'linear-gradient(180deg, #1a0a2e 0%, #0f0520 100%)',
    borderRight: `1px solid ${isDay ? 'rgba(249,115,22,0.2)' : 'rgba(249,115,22,0.15)'}`,
    display: 'flex', flexDirection: 'column',
    padding: '16px 0', zIndex: 10, position: 'relative',
    overflow: 'hidden'
  }

  const handleVoiceNote = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mr = new MediaRecorder(stream)
        chunksRef.current = []
        mr.ondataavailable = e => chunksRef.current.push(e.data)
        mr.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const url = URL.createObjectURL(blob)
          setVoiceNotes(prev => [...prev, { id: Date.now(), url, date: new Date().toLocaleString() }])
          stream.getTracks().forEach(t => t.stop())
        }
        mr.start()
        mediaRef.current = mr
        setRecording(true)
      } catch { alert('Microphone access denied') }
    } else {
      mediaRef.current?.stop()
      setRecording(false)
    }
  }

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={{ padding: '0 20px 16px', borderBottom: `1px solid ${isDay ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)'}` }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#f97316', letterSpacing: '-0.5px' }}>Smart Study</div>
        <div style={{ fontSize: 11, color: isDay ? '#92400e' : '#d97706', marginTop: 2 }}>AI-Powered Learning</div>
        <div style={{ width: 32, height: 3, background: 'linear-gradient(90deg,#f97316,#fbbf24)', borderRadius: 2, marginTop: 6 }} />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
        {NAV.map(item => {
          const active = activePage === item.id
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 14px',
                borderRadius: 10, border: 'none',
                background: active
                  ? isDay ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.2)'
                  : 'transparent',
                color: active ? '#f97316' : isDay ? '#92400e' : '#d97706',
                fontWeight: active ? 700 : 500,
                fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s', marginBottom: 2
              }}
              onMouseEnter={e => !active && (e.currentTarget.style.background = isDay ? 'rgba(249,115,22,0.08)' : 'rgba(249,115,22,0.1)')}
              onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Voice Note */}
      <div style={{ padding: '12px 16px' }}>
        <button onClick={handleVoiceNote} style={{
          width: '100%', padding: '10px 16px',
          borderRadius: 10, border: recording ? '1px solid #ef4444' : `1px solid ${isDay ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.25)'}`,
          background: recording ? 'rgba(239,68,68,0.15)' : 'transparent',
          color: recording ? '#ef4444' : '#f97316',
          fontWeight: 600, fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
        }}>
          <span>{recording ? '🔴' : '🎙️'}</span>
          {recording ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              Stop recording
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2, background: '#ef4444',
                  animation: `waveBar 0.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  height: 8
                }} />
              ))}
            </span>
          ) : 'Voice note'}
        </button>
      </div>

      {/* Theme Toggle */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setTheme(isDay ? 'night' : 'day')} style={{
          flex: 1, padding: '8px 14px', borderRadius: 20,
          border: `1px solid ${isDay ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.3)'}`,
          background: isDay ? 'rgba(255,255,255,0.8)' : 'rgba(30,10,60,0.6)',
          color: isDay ? '#92400e' : '#fde68a',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          {isDay ? '☀️ Day' : '🌙 Night'}
        </button>
        <button title="Fullscreen" onClick={() => document.documentElement.requestFullscreen?.()}
          style={{
            width: 36, height: 36, borderRadius: 8,
            border: `1px solid ${isDay ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.3)'}`,
            background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#f97316'
          }}>⛶</button>
      </div>

      {/* Timer */}
      <div style={{
        margin: '0 12px 8px', padding: '12px 16px', borderRadius: 12,
        background: '#0f172a', border: '1px solid rgba(249,115,22,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#d97706', letterSpacing: 1 }}>STUDY TIME</span>
          <select value={timerDuration} onChange={e => { setTimerDuration(+e.target.value); resetTimer() }}
            style={{ background: 'transparent', border: 'none', color: '#d97706', fontSize: 12, cursor: 'pointer' }}>
            {[5,10,15,20,25,30,45,60].map(m => <option key={m} value={m} style={{background:'#0f172a'}}>{m}m</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', fontFamily: 'Space Mono, monospace' }}>
            {formatTime(studyTime)}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setTimerRunning(r => !r)} style={{
              background: 'none', border: 'none', color: '#f97316', fontSize: 18, cursor: 'pointer'
            }}>{timerRunning ? '⏸' : '▶'}</button>
            <button onClick={resetTimer} style={{
              background: 'none', border: 'none', color: '#f97316', fontSize: 18, cursor: 'pointer'
            }}>↺</button>
          </div>
        </div>
      </div>
    </div>
  )
}
