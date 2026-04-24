import React, { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'

function Card({ children, style }) {
  return (
    <div style={{
      background: 'rgba(20,8,45,0.82)', borderRadius: 16,
      padding: 24, border: '1px solid rgba(249,115,22,0.2)',
      backdropFilter: 'blur(12px)', ...style
    }}>
      {children}
    </div>
  )
}

export default function KnowledgeBase() {
  const { documents, addDocument, removeDocument, theme } = useApp()
  const [search, setSearch] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()
  const isDay = theme === 'day'

  const cardBg = isDay ? 'rgba(255,248,230,0.92)' : 'rgba(20,8,45,0.82)'
  const textColor = isDay ? '#1a0a2e' : '#fef3c7'
  const subColor = isDay ? '#92400e' : '#d97706'

  const readFile = (file) => {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) return alert('File too large (max 10MB)')
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['pdf', 'txt', 'md'].includes(ext)) return alert('Only PDF, TXT, MD supported')

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = ext === 'pdf' ? `[PDF content of ${file.name} - ${file.size} bytes]` : e.target.result
      addDocument({
        id: Date.now(),
        name: file.name,
        type: ext.toUpperCase(),
        text,
        words: text.split(/\s+/).length,
        readTime: Math.ceil(text.split(/\s+/).length / 200),
        uploaded: new Date(),
        raw: e.target.result
      })
    }
    if (ext === 'pdf') reader.readAsArrayBuffer(file)
    else reader.readAsText(file)
  }

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    Array.from(e.dataTransfer.files).forEach(readFile)
  }

  const filtered = documents.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '28px 32px', animation: 'slideIn 0.3s ease', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ color: textColor, fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Upload Document</h2>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          borderRadius: 16, border: `2px dashed ${dragging ? '#f97316' : 'rgba(249,115,22,0.4)'}`,
          background: dragging ? 'rgba(249,115,22,0.1)' : cardBg,
          padding: '40px 24px', textAlign: 'center', cursor: 'pointer',
          transition: 'all 0.2s', marginBottom: 28,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>☁️</div>
        <p style={{ color: textColor, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
          Click to upload or drag and drop
        </p>
        <p style={{ color: subColor, fontSize: 14, marginBottom: 12 }}>PDF, TXT, or MD (max 10MB)</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {['PDF', 'TXT', 'MD'].map(t => (
            <span key={t} style={{
              padding: '4px 12px', borderRadius: 8,
              border: `1px solid rgba(249,115,22,0.4)`,
              color: subColor, fontSize: 12, fontWeight: 600
            }}>📄 {t}</span>
          ))}
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.txt,.md" multiple onChange={e => Array.from(e.target.files).forEach(readFile)} style={{ display: 'none' }} />
      </div>

      {/* Search */}
      <h2 style={{ color: textColor, fontSize: 22, fontWeight: 800, marginBottom: 14 }}>Search Knowledge Base</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search your knowledge base..."
          style={{
            flex: 1, padding: '12px 18px', borderRadius: 12,
            border: '1px solid rgba(249,115,22,0.3)',
            background: isDay ? 'rgba(255,255,255,0.9)' : 'rgba(20,8,45,0.8)',
            color: textColor, fontSize: 14, outline: 'none',
            backdropFilter: 'blur(8px)'
          }}
        />
        <button style={{
          padding: '12px 24px', borderRadius: 12,
          background: '#f97316', border: 'none', color: '#fff',
          fontWeight: 700, cursor: 'pointer', fontSize: 14
        }}>Search</button>
      </div>

      {/* Documents */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ color: textColor, fontSize: 22, fontWeight: 800 }}>Your Documents</h2>
        <span style={{
          padding: '4px 12px', borderRadius: 20,
          background: 'rgba(249,115,22,0.2)', color: '#f97316',
          fontSize: 12, fontWeight: 700
        }}>{documents.length} files</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: subColor }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
          <p>No documents yet. Upload your first document!</p>
        </div>
      ) : (
        filtered.map(doc => (
          <div key={doc.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: cardBg, borderRadius: 14, padding: '16px 20px',
            border: '1px solid rgba(249,115,22,0.15)',
            backdropFilter: 'blur(12px)', marginBottom: 10,
            transition: 'all 0.2s'
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(249,115,22,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>📄</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: textColor, fontWeight: 700, fontSize: 15 }}>{doc.name}</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                <span style={{ background: '#f97316', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                  {doc.type}
                </span>
                <span style={{ color: subColor, fontSize: 12 }}>📝 {doc.words} words</span>
                <span style={{ color: subColor, fontSize: 12 }}>⏱ {doc.readTime} min read</span>
                <span style={{ color: subColor, fontSize: 12 }}>
                  Uploaded {Math.round((Date.now() - doc.uploaded) / 60000)} min ago
                </span>
              </div>
            </div>
            <button onClick={() => removeDocument(doc.id)} style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', borderRadius: 8, padding: '6px 12px',
              cursor: 'pointer', fontSize: 12, fontWeight: 600
            }}>Delete</button>
          </div>
        ))
      )}
    </div>
  )
}
