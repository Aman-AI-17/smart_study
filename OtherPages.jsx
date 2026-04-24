import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

// ─── SHARED STYLES ───────────────────────────────────────────────
function useThemeStyles() {
  const { theme } = useApp()
  const isDay = theme === 'day'
  return {
    isDay,
    cardBg: isDay ? 'rgba(255,248,230,0.95)' : 'rgba(20,8,45,0.88)',
    text: isDay ? '#1a0a2e' : '#fef3c7',
    sub: isDay ? '#92400e' : '#d97706',
    border: isDay ? 'rgba(249,115,22,0.25)' : 'rgba(249,115,22,0.2)',
  }
}

// ─── REVISION ─────────────────────────────────────────────────────
export function RevisionPage() {
  const { documents, theme } = useApp()
  const s = useThemeStyles()
  const [reviewed, setReviewed] = useState({})

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>📅 Spaced Revision</h2>
      <p style={{ color: s.sub, fontSize: 14, marginBottom: 24 }}>
        {Object.values(reviewed).filter(Boolean).length} documents need attention.
      </p>
      {documents.length === 0 ? (
        <div style={{ textAlign: 'center', color: s.sub, padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
          <p>Upload documents to start spaced revision.</p>
        </div>
      ) : (
        documents.map(doc => {
          const interval = reviewed[doc.id] ? '3d' : '1d'
          return (
            <div key={doc.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: s.cardBg, borderRadius: 14, padding: '16px 20px',
              border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)', marginBottom: 12
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(249,115,22,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
              }}>🔄</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: s.text, fontWeight: 700 }}>{doc.name}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <span style={{ background: '#06b6d4', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                    In {interval}
                  </span>
                  <span style={{ color: s.sub, fontSize: 12 }}>Interval: {interval}</span>
                  <span style={{ color: s.sub, fontSize: 12 }}>Reviewed {reviewed[doc.id] || 0}×</span>
                </div>
              </div>
              <button onClick={() => setReviewed(r => ({ ...r, [doc.id]: (r[doc.id] || 0) + 1 }))}
                style={{
                  padding: '8px 20px', borderRadius: 20,
                  background: 'linear-gradient(135deg,#f97316,#ea580c)',
                  border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13
                }}>
                Review now
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}

// ─── BATTLE ──────────────────────────────────────────────────────
export function BattlePage() {
  const { documents } = useApp()
  const s = useThemeStyles()
  const [name, setName] = useState('')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [roomCode] = useState(() => Math.random().toString(36).substr(2, 6).toUpperCase())
  const [joinCode, setJoinCode] = useState(roomCode)
  const [created, setCreated] = useState(false)

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>⚔️ Battle Mode</h2>
      <p style={{ color: s.sub, fontSize: 14, marginBottom: 24 }}>Race a friend through quiz questions in real time.</p>

      <div style={{ background: s.cardBg, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, marginBottom: 20, backdropFilter: 'blur(12px)' }}>
        <label style={{ color: s.text, fontWeight: 700, fontSize: 14 }}>Your name</label>
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Enter your battle name"
          style={{
            display: 'block', width: '100%', marginTop: 8, padding: '12px 16px',
            borderRadius: 10, border: `1px solid ${s.border}`,
            background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
            color: s.text, fontSize: 14, outline: 'none'
          }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Create Room */}
        <div style={{ background: s.cardBg, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)' }}>
          <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 6 }}>Create Room</h3>
          <p style={{ color: s.sub, fontSize: 13, marginBottom: 14 }}>Pick a document for your quiz</p>
          <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${s.border}`, marginBottom: 14,
              background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
              color: s.text, fontSize: 13, outline: 'none'
            }}>
            <option value="">Select a document...</option>
            {documents.map(d => <option key={d.id} value={d.id} style={{ background: '#1a0a2e' }}>{d.name}</option>)}
          </select>
          <button onClick={() => setCreated(true)}
            style={{
              width: '100%', padding: '12px', borderRadius: 10,
              background: 'linear-gradient(135deg,#f97316,#ea580c)',
              border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14
            }}>
            {created ? `Room: ${roomCode}` : 'Create Room'}
          </button>
          {created && (
            <p style={{ textAlign: 'center', color: s.sub, fontSize: 12, marginTop: 8 }}>
              Share code: <strong style={{ color: '#f97316' }}>{roomCode}</strong>
            </p>
          )}
        </div>

        {/* Join Room */}
        <div style={{ background: s.cardBg, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)' }}>
          <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 6 }}>Join Room</h3>
          <p style={{ color: s.sub, fontSize: 13, marginBottom: 14 }}>Enter a 6-character room code</p>
          <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
            maxLength={6}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${s.border}`, marginBottom: 14,
              background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
              color: s.text, fontSize: 15, outline: 'none', textAlign: 'center',
              fontFamily: 'Space Mono, monospace', letterSpacing: 4, fontWeight: 700
            }} />
          <button style={{
            width: '100%', padding: '12px', borderRadius: 10,
            background: 'transparent', border: `2px solid rgba(249,115,22,0.5)`,
            color: '#f97316', fontWeight: 700, cursor: 'pointer', fontSize: 14
          }}>Join</button>
        </div>
      </div>
    </div>
  )
}

// ─── ANNOTATIONS ──────────────────────────────────────────────────
export function AnnotationsPage() {
  const { annotations, setAnnotations, documents } = useApp()
  const s = useThemeStyles()
  const [text, setText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [tag, setTag] = useState('')

  const add = () => {
    if (!text.trim()) return
    setAnnotations(prev => [...prev, {
      id: Date.now(), text, doc: selectedDoc, tag, date: new Date().toLocaleString()
    }])
    setText(''); setTag('')
  }

  const TAGS = ['Important', 'Review', 'Question', 'Key Concept', 'Example']

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800, marginBottom: 20 }}>✏️ Annotations</h2>

      <div style={{ background: s.cardBg, borderRadius: 16, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${s.border}`,
              background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
              color: s.text, fontSize: 13, outline: 'none'
            }}>
            <option value="">Link to document (optional)...</option>
            {documents.map(d => <option key={d.id} value={d.name} style={{ background: '#1a0a2e' }}>{d.name}</option>)}
          </select>
          <select value={tag} onChange={e => setTag(e.target.value)}
            style={{
              padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${s.border}`,
              background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
              color: s.text, fontSize: 13, outline: 'none'
            }}>
            <option value="">Tag...</option>
            {TAGS.map(t => <option key={t} value={t} style={{ background: '#1a0a2e' }}>{t}</option>)}
          </select>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder="Write your annotation or note..."
          rows={4}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 10,
            border: `1px solid ${s.border}`,
            background: s.isDay ? '#fff' : 'rgba(10,5,25,0.8)',
            color: s.text, fontSize: 14, outline: 'none', resize: 'vertical',
            marginBottom: 12, display: 'block'
          }} />
        <button onClick={add} style={{
          padding: '10px 24px', borderRadius: 10,
          background: 'linear-gradient(135deg,#f97316,#ea580c)',
          border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer'
        }}>Add Annotation</button>
      </div>

      {annotations.length === 0 ? (
        <div style={{ textAlign: 'center', color: s.sub, padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <p>No annotations yet. Start writing!</p>
        </div>
      ) : annotations.map(a => (
        <div key={a.id} style={{
          background: s.cardBg, borderRadius: 12, padding: '14px 18px',
          border: `1px solid ${s.border}`, backdropFilter: 'blur(8px)', marginBottom: 10,
          borderLeft: '4px solid #f97316'
        }}>
          {(a.tag || a.doc) && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              {a.tag && <span style={{ background: 'rgba(249,115,22,0.2)', color: '#f97316', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{a.tag}</span>}
              {a.doc && <span style={{ color: s.sub, fontSize: 12 }}>📄 {a.doc}</span>}
            </div>
          )}
          <p style={{ color: s.text, fontSize: 14, lineHeight: 1.6 }}>{a.text}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ color: s.sub, fontSize: 11 }}>{a.date}</span>
            <button onClick={() => setAnnotations(prev => prev.filter(x => x.id !== a.id))}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── STUDY DNA ────────────────────────────────────────────────────
export function StudyDNAPage() {
  const { documents, quizScores, studyTime } = useApp()
  const s = useThemeStyles()
  const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(false)

  const traits = [
    { label: 'Document Depth', value: Math.min(documents.length * 20, 100) },
    { label: 'Quiz Performance', value: quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0 },
    { label: 'Study Consistency', value: Math.min(Math.round(studyTime / 60 / 25 * 100), 100) },
    { label: 'Knowledge Coverage', value: Math.min(documents.length * 15, 100) },
  ]

  const analyze = async () => {
    setLoading(true)
    try {
      const { analyzeStudyDNA } = await import('../utils/api')
      const result = await analyzeStudyDNA(documents.length, quizScores, studyTime)
      setProfile(result)
    } catch (e) { setProfile('Unable to analyze: ' + e.message) }
    setLoading(false)
  }

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🧬 Study DNA</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {traits.map(t => (
          <div key={t.label} style={{
            background: s.cardBg, borderRadius: 14, padding: 20,
            border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)'
          }}>
            <p style={{ color: s.sub, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              {t.label.toUpperCase()}
            </p>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 8 }}>
              <div style={{
                height: '100%', borderRadius: 4,
                width: `${t.value}%`,
                background: `linear-gradient(90deg, #f97316, #fbbf24)`,
                transition: 'width 1s ease'
              }} />
            </div>
            <p style={{ color: s.text, fontWeight: 700, fontSize: 20 }}>{t.value}%</p>
          </div>
        ))}
      </div>

      <div style={{ background: s.cardBg, borderRadius: 16, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ color: s.text, fontWeight: 700 }}>AI Learning Profile</h3>
          <button onClick={analyze} disabled={loading} style={{
            padding: '8px 20px', borderRadius: 10,
            background: 'linear-gradient(135deg,#f97316,#ea580c)',
            border: 'none', color: '#fff', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13
          }}>
            {loading ? '⏳ Analyzing...' : '🧬 Analyze'}
          </button>
        </div>
        {profile ? (
          <p style={{ color: s.text, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{profile}</p>
        ) : (
          <p style={{ color: s.sub, fontSize: 14 }}>Click Analyze to generate your personalized AI learning profile.</p>
        )}
      </div>
    </div>
  )
}

// ─── STATS ────────────────────────────────────────────────────────
export function StatsPage() {
  const { documents, flashcards, quizScores } = useApp()
  const s = useThemeStyles()
  const avg = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0
  const totalWords = documents.reduce((sum, d) => sum + (d.words || 0), 0)

  const STATS = [
    { label: 'TOTAL DOCUMENTS', value: documents.length, icon: '📄' },
    { label: 'WORDS INDEXED', value: totalWords.toLocaleString(), icon: '📖' },
    { label: 'FLASHCARDS', value: flashcards.length, icon: '🗂️' },
    { label: 'QUIZZES TAKEN', value: quizScores.length, icon: '✅' },
    { label: 'AVERAGE SCORE', value: `${avg}%`, icon: '🏆' },
  ]

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Learning Analytics</h2>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {STATS.map(st => (
          <div key={st.label} style={{
            flex: '1 1 140px', background: s.cardBg, borderRadius: 16, padding: '20px 16px',
            border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)', textAlign: 'center',
            transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{st.icon}</div>
            <div style={{ width: 32, height: 3, background: '#f97316', borderRadius: 2, margin: '0 auto 12px' }} />
            <p style={{ color: s.text, fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{st.value}</p>
            <p style={{ color: s.sub, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{st.label}</p>
          </div>
        ))}
      </div>

      {quizScores.length > 0 && (
        <div style={{ background: s.cardBg, borderRadius: 16, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)', marginBottom: 20 }}>
          <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 16 }}>Quiz Score History</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
            {quizScores.map((score, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ color: s.sub, fontSize: 10 }}>{score}%</span>
                <div style={{
                  width: '100%', height: `${score * 0.6}px`,
                  background: `linear-gradient(to top, #f97316, #fbbf24)`,
                  borderRadius: '4px 4px 0 0', minHeight: 4
                }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        background: s.cardBg, borderRadius: 16, padding: 20,
        border: `1px solid rgba(249,115,22,0.3)`, backdropFilter: 'blur(12px)',
        borderLeft: '4px solid #f97316'
      }}>
        <p style={{ color: '#f97316', fontWeight: 700, marginBottom: 8 }}>💡 Study Tip</p>
        <p style={{ color: s.text, fontSize: 14, lineHeight: 1.6 }}>
          Consistency is key. Try to use the Pomodoro timer for 25 minutes of focused studying, followed by a 5-minute break. 
          Reviewing your flashcards with spaced repetition will dramatically improve your retention over time!
        </p>
      </div>
    </div>
  )
}

// ─── FOCUS MODE ───────────────────────────────────────────────────
export function FocusModePage() {
  const [text, setText] = useState('')
  const [words, setWords] = useState(0)
  const [lastTyped, setLastTyped] = useState(Date.now())
  const [momentum, setMomentum] = useState(0)
  const [ambience, setAmbience] = useState('Silent')
  const [readability, setReadability] = useState(null)

  const AMBIENCES = ['Silent', 'Rain', 'Forest', 'Cafe', 'Ocean']

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastTyped
      setMomentum(prev => Math.max(0, prev - 2))
    }, 1000)
    return () => clearInterval(interval)
  }, [lastTyped])

  const handleChange = (e) => {
    const val = e.target.value
    setText(val)
    const w = val.trim().split(/\s+/).filter(Boolean).length
    setWords(w)
    setMomentum(prev => Math.min(100, prev + 5))
    setLastTyped(Date.now())

    // Simple readability
    if (w > 10) {
      const avgWordLen = val.replace(/\s/g, '').length / w
      const r = avgWordLen < 5 ? 'Easy' : avgWordLen < 7 ? 'Moderate' : 'Complex'
      setReadability(r)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0d0117', zIndex: 100,
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', borderBottom: '1px solid rgba(249,115,22,0.2)'
      }}>
        <span style={{ color: '#f97316', fontWeight: 800, fontSize: 16 }}>Focus Mode</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select value={ambience} onChange={e => setAmbience(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#fef3c7', borderRadius: 8, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}>
            {AMBIENCES.map(a => <option key={a} style={{ background: '#0d0117' }}>{a}</option>)}
          </select>
          <button style={{ background: 'none', border: 'none', color: '#fef3c7', fontSize: 20, cursor: 'pointer' }}>🔇</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('closeFocus'))}
            style={{ background: 'none', border: 'none', color: '#fef3c7', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: 20, overflow: 'hidden' }}>
        {/* Editor */}
        <textarea value={text} onChange={handleChange}
          placeholder="Begin writing..."
          style={{
            flex: 1, background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(249,115,22,0.4)', borderRadius: 12,
            padding: '20px 24px', color: '#fef3c7', fontSize: 16,
            lineHeight: 1.8, resize: 'none', outline: 'none',
            fontFamily: 'Nunito, sans-serif'
          }} />

        {/* Sidebar */}
        <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px', border: '1px solid rgba(249,115,22,0.2)' }}>
            <p style={{ color: '#d97706', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>READABILITY</p>
            {readability ? (
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                background: readability === 'Easy' ? 'rgba(34,197,94,0.2)' : readability === 'Moderate' ? 'rgba(249,115,22,0.2)' : 'rgba(239,68,68,0.2)',
                color: readability === 'Easy' ? '#22c55e' : readability === 'Moderate' ? '#f97316' : '#ef4444',
              }}>{readability}</span>
            ) : <div style={{ color: '#d97706', fontSize: 18 }}>◌</div>}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px', border: '1px solid rgba(249,115,22,0.2)' }}>
            <p style={{ color: '#d97706', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>MOMENTUM</p>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 8 }}>
              <div style={{
                height: '100%', borderRadius: 3, width: `${momentum}%`,
                background: 'linear-gradient(90deg,#7c3aed,#a855f7)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ color: '#d97706', fontSize: 12 }}>
              {momentum > 60 ? '🔥 On fire!' : momentum > 30 ? '⚡ Building...' : 'Keep typing to fill the bar.'}
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px', border: '1px solid rgba(249,115,22,0.2)' }}>
            <p style={{ color: '#d97706', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>AUTO-SAVE</p>
            <p style={{ color: '#d97706', fontSize: 12 }}>Saved every 30s.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px', border: '1px solid rgba(249,115,22,0.2)' }}>
            <p style={{ color: '#d97706', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>STATS</p>
            <p style={{ color: '#fef3c7', fontSize: 20, fontWeight: 700 }}>{words}</p>
            <p style={{ color: '#d97706', fontSize: 12 }}>words</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── REPORT ───────────────────────────────────────────────────────
export function ReportPage() {
  const { documents, quizScores, annotations, flashcards, user } = useApp()
  const s = useThemeStyles()
  const avg = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: s.text, fontSize: 22, fontWeight: 800 }}>📄 Learning Report</h2>
        <button onClick={() => window.print()} style={{
          padding: '10px 20px', borderRadius: 10,
          background: 'linear-gradient(135deg,#f97316,#ea580c)',
          border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer'
        }}>🖨️ Print Report</button>
      </div>

      <div style={{ background: s.cardBg, borderRadius: 16, padding: 24, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)', marginBottom: 16 }}>
        <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 4 }}>Student: {user?.username}</h3>
        <p style={{ color: s.sub, fontSize: 13 }}>Generated: {new Date().toLocaleString()}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          ['Documents', documents.length, '📄'],
          ['Flashcards', flashcards.length, '🗂️'],
          ['Quizzes', quizScores.length, '✅'],
          ['Avg Score', `${avg}%`, '🏆'],
        ].map(([label, val, icon]) => (
          <div key={label} style={{
            background: s.cardBg, borderRadius: 12, padding: '16px', textAlign: 'center',
            border: `1px solid ${s.border}`, backdropFilter: 'blur(8px)'
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <p style={{ color: s.text, fontWeight: 800, fontSize: 20 }}>{val}</p>
            <p style={{ color: s.sub, fontSize: 11, fontWeight: 700 }}>{label}</p>
          </div>
        ))}
      </div>

      {documents.length > 0 && (
        <div style={{ background: s.cardBg, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(8px)', marginBottom: 14 }}>
          <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 12 }}>Documents Studied</h3>
          {documents.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
              <span style={{ color: s.text, fontSize: 14 }}>{d.name}</span>
              <span style={{ color: s.sub, fontSize: 13 }}>{d.words} words · {d.readTime}min read</span>
            </div>
          ))}
        </div>
      )}

      {quizScores.length > 0 && (
        <div style={{ background: s.cardBg, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, backdropFilter: 'blur(8px)' }}>
          <h3 style={{ color: s.text, fontWeight: 700, marginBottom: 12 }}>Quiz Performance</h3>
          {quizScores.map((score, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ color: s.sub, fontSize: 13, width: 70 }}>Quiz #{i + 1}</span>
              <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${score}%`, background: 'linear-gradient(90deg,#f97316,#fbbf24)', borderRadius: 4 }} />
              </div>
              <span style={{ color: s.text, fontWeight: 700, fontSize: 14, width: 40 }}>{score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
