import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { generateSummary, generateFlashcards, generateQuiz } from '../utils/api'

export default function StudyTools() {
  const { documents, flashcards, setFlashcards, quizScores, setQuizScores, theme } = useApp()
  const [tab, setTab] = useState('summarize')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [quiz, setQuiz] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const isDay = theme === 'day'
  const cardBg = isDay ? 'rgba(255,248,230,0.95)' : 'rgba(20,8,45,0.88)'
  const textColor = isDay ? '#1a0a2e' : '#fef3c7'
  const subColor = isDay ? '#92400e' : '#d97706'
  const borderColor = isDay ? 'rgba(249,115,22,0.25)' : 'rgba(249,115,22,0.2)'

  const getDoc = () => documents.find(d => d.id === +selectedDoc)

  const handleSummarize = async () => {
    const doc = getDoc()
    if (!doc) return alert('Select a document')
    setLoading(true)
    try {
      const result = await generateSummary(doc.text)
      setSummary(result)
    } catch (e) {
      setSummary('Error generating summary: ' + e.message)
    }
    setLoading(false)
  }

  const handleFlashcards = async () => {
    const doc = getDoc()
    if (!doc) return alert('Select a document')
    setLoading(true)
    try {
      const result = await generateFlashcards(doc.text)
      setCards(result)
      setFlashcards(result)
      setFlipped({})
    } catch (e) { alert('Error: ' + e.message) }
    setLoading(false)
  }

  const handleQuiz = async () => {
    const doc = getDoc()
    if (!doc) return alert('Select a document')
    setLoading(true)
    try {
      const result = await generateQuiz(doc.text)
      setQuiz(result)
      setAnswers({})
      setSubmitted(false)
    } catch (e) { alert('Error: ' + e.message) }
    setLoading(false)
  }

  const submitQuiz = () => {
    setSubmitted(true)
    const correct = quiz.filter((q, i) =>
      answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim()
    ).length
    const score = Math.round((correct / quiz.length) * 100)
    setQuizScores(prev => [...prev, score])
  }

  const TABS = [
    { id: 'summarize', label: 'Summarize', icon: '📄' },
    { id: 'flashcards', label: 'Flashcards', icon: '🗂️' },
    { id: 'quiz', label: 'Quiz', icon: '✅' },
  ]

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{
        background: cardBg, borderRadius: 16, padding: '20px 24px',
        border: `1px solid ${borderColor}`, backdropFilter: 'blur(12px)', marginBottom: 20
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: textColor, fontWeight: 800, fontSize: 20 }}>📖 Select a Document to Study</h2>
            <p style={{ color: subColor, fontSize: 13, marginTop: 4 }}>
              Choose a document from your knowledge base to generate study materials.
            </p>
          </div>
          <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: 10, border: `1px solid ${borderColor}`,
              background: isDay ? '#fff' : 'rgba(30,10,60,0.8)',
              color: textColor, fontSize: 14, cursor: 'pointer', minWidth: 200, outline: 'none'
            }}>
            <option value="">Select a document...</option>
            {documents.map(d => <option key={d.id} value={d.id} style={{ background: '#1a0a2e' }}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 0, background: cardBg,
        borderRadius: 12, border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(12px)', marginBottom: 20, overflow: 'hidden'
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '12px', border: 'none',
            background: tab === t.id ? '#1e0a3c' : 'transparent',
            color: tab === t.id ? '#f97316' : subColor,
            fontWeight: tab === t.id ? 700 : 500,
            fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Summarize */}
      {tab === 'summarize' && (
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid ${borderColor}`, backdropFilter: 'blur(12px)' }}>
          <h3 style={{ color: textColor, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Executive Summary</h3>
          <p style={{ color: subColor, fontSize: 14, marginBottom: 20 }}>Extracts the most important sentences using NLP algorithms.</p>
          {summary && (
            <div style={{
              background: isDay ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)',
              borderRadius: 12, padding: 16, marginBottom: 16,
              color: textColor, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap'
            }}>{summary}</div>
          )}
          <div style={{ textAlign: 'center' }}>
            <button onClick={handleSummarize} disabled={loading} style={{
              padding: '12px 32px', borderRadius: 24,
              background: loading ? '#666' : 'linear-gradient(135deg,#f97316,#ea580c)',
              border: 'none', color: '#fff', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Generating...' : 'Generate Summary'}
            </button>
          </div>
        </div>
      )}

      {/* Flashcards */}
      {tab === 'flashcards' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <button onClick={handleFlashcards} disabled={loading} style={{
              padding: '12px 32px', borderRadius: 24,
              background: loading ? '#666' : 'linear-gradient(135deg,#f97316,#ea580c)',
              border: 'none', color: '#fff', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Generating...' : '🗂️ Generate Flashcards'}
            </button>
          </div>
          {cards.length > 0 && (
            <>
              <p style={{ color: subColor, fontSize: 13, marginBottom: 16 }}>
                Auto-generated from key concepts in your document. Click cards to flip.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {cards.map((c, i) => (
                  <div key={i} onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
                    style={{
                      background: isDay ? '#fffde7' : '#fffef0',
                      borderRadius: 14, padding: '20px 16px',
                      minHeight: 160, cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      display: 'flex', flexDirection: 'column',
                      transition: 'transform 0.2s', border: '1px solid rgba(249,115,22,0.2)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    <span style={{
                      alignSelf: 'flex-start', padding: '3px 10px', borderRadius: 20,
                      border: '1px solid rgba(90,60,120,0.3)', fontSize: 11,
                      color: '#5a3c78', fontWeight: 600, marginBottom: 12
                    }}>
                      {flipped[i] ? 'Answer' : 'Question'}
                    </span>
                    <p style={{ flex: 1, color: '#1a0a2e', fontSize: 13, lineHeight: 1.5 }}>
                      {flipped[i] ? c.answer : c.question}
                    </p>
                    <p style={{ fontSize: 11, color: '#92400e', marginTop: 12 }}>Click to flip</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Quiz */}
      {tab === 'quiz' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <button onClick={handleQuiz} disabled={loading} style={{
              padding: '12px 32px', borderRadius: 24,
              background: loading ? '#666' : 'linear-gradient(135deg,#f97316,#ea580c)',
              border: 'none', color: '#fff', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Generating...' : '✅ Generate Quiz'}
            </button>
          </div>
          {quiz.length > 0 && (
            <>
              <p style={{ color: subColor, fontSize: 13, marginBottom: 16 }}>
                Test your recall of specific terms and concepts.
              </p>
              {quiz.map((q, i) => {
                const correct = submitted && answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim()
                const wrong = submitted && answers[i] && !correct
                return (
                  <div key={i} style={{
                    background: isDay ? '#fffde7' : 'rgba(255,253,231,0.95)',
                    borderRadius: 14, padding: 20, marginBottom: 14,
                    border: submitted ? `2px solid ${correct ? '#22c55e' : wrong ? '#ef4444' : '#e5e7eb'}` : '1px solid #e5e7eb',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                  }}>
                    <p style={{ color: '#1a0a2e', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                      <strong>{i + 1}.</strong> {q.question}
                    </p>
                    <input
                      value={answers[i] || ''}
                      onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                      disabled={submitted}
                      placeholder="Type your answer..."
                      style={{
                        width: '60%', padding: '8px 14px', borderRadius: 8,
                        border: `1px solid ${correct ? '#22c55e' : wrong ? '#ef4444' : 'rgba(0,0,0,0.2)'}`,
                        background: submitted ? (correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : '#f9f9f9',
                        color: '#1a0a2e', fontSize: 14, outline: 'none'
                      }}
                    />
                    {submitted && wrong && (
                      <p style={{ color: '#22c55e', fontSize: 12, marginTop: 6 }}>Answer: {q.answer}</p>
                    )}
                  </div>
                )
              })}
              {!submitted ? (
                <button onClick={submitQuiz} style={{
                  padding: '12px 32px', borderRadius: 12,
                  background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                  border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer'
                }}>Submit Quiz</button>
              ) : (
                <div style={{
                  background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e',
                  borderRadius: 12, padding: '14px 20px', display: 'inline-block'
                }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>
                    Score: {quiz.filter((q, i) => answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim()).length}/{quiz.length}
                    ({Math.round(quiz.filter((q, i) => answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim()).length / quiz.length * 100)}%)
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
