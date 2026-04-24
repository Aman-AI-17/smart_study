import React from 'react'

const TREES = [
  { x: 2, h: 120, w: 70 }, { x: 7, h: 150, w: 80 }, { x: 12, h: 100, w: 60 },
  { x: 18, h: 140, w: 75 }, { x: 24, h: 110, w: 65 }, { x: 30, h: 160, w: 85 },
  { x: 36, h: 130, w: 70 }, { x: 42, h: 145, w: 80 }, { x: 48, h: 105, w: 62 },
  { x: 54, h: 155, w: 82 }, { x: 60, h: 120, w: 68 }, { x: 66, h: 140, w: 76 },
  { x: 72, h: 130, w: 72 }, { x: 78, h: 150, w: 78 }, { x: 84, h: 115, w: 66 },
  { x: 90, h: 145, w: 80 }, { x: 96, h: 125, w: 70 }
]

export default function Background({ theme }) {
  const isDay = theme === 'day'

  const skyGradient = isDay
    ? 'linear-gradient(to bottom, #4fc3f7 0%, #87ceeb 35%, #b2dfdb 70%, #c8e6c9 100%)'
    : 'linear-gradient(to bottom, #0d0221 0%, #1a0536 20%, #3b0764 45%, #7c2d12 70%, #f97316 85%, #fde68a 100%)'

  const treeColor = isDay ? '#1b5e20' : '#0d3b1a'
  const treeDark = isDay ? '#145214' : '#0a2d12'
  const groundColor = isDay ? '#4caf50' : '#1a4a1a'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      background: skyGradient,
      overflow: 'hidden'
    }}>
      {/* Sun / Moon */}
      {isDay ? (
        <div style={{
          position: 'absolute', top: '8%', right: '12%',
          width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, #fff176, #ffeb3b)',
          boxShadow: '0 0 40px #ffeb3b, 0 0 80px rgba(255,235,59,0.4)',
          animation: 'float 8s ease-in-out infinite'
        }} />
      ) : (
        <>
          <div style={{
            position: 'absolute', top: '6%', right: '15%',
            width: 50, height: 50, borderRadius: '50%',
            background: 'radial-gradient(circle, #fff9c4, #f5f5dc)',
            boxShadow: '0 0 30px rgba(255,249,196,0.8)',
          }} />
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() > 0.7 ? 3 : 2,
              height: Math.random() > 0.7 ? 3 : 2,
              borderRadius: '50%',
              background: '#fff',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </>
      )}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${20 + i * 10}%`,
          left: `${10 + i * 15}%`,
          width: i % 2 === 0 ? 12 : 16,
          height: i % 2 === 0 ? 12 : 16,
          borderRadius: i % 3 === 0 ? '50%' : '3px',
          background: i % 2 === 0 ? '#f97316' : '#fde68a',
          opacity: 0.7,
          animation: `float ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          transform: `rotate(${i * 30}deg)`
        }} />
      ))}

      {/* Birds */}
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${10 + i * 8}%`,
          animation: `flyBird ${15 + i * 5}s linear infinite`,
          animationDelay: `${i * 4}s`,
          fontSize: 12,
          opacity: 0.6,
          color: isDay ? '#555' : '#aaa'
        }}>〜</div>
      ))}

      {/* Ground */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '28%',
        background: `linear-gradient(to bottom, ${groundColor}, #0a3d0a)`
      }} />

      {/* Trees */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '35%' }}
        viewBox="0 0 1000 250" preserveAspectRatio="none">
        {TREES.map((t, i) => {
          const x = t.x * 10
          const base = 250
          const tip = base - t.h
          const half = t.w / 2
          // 3-layer pine
          return (
            <g key={i}>
              <polygon points={`${x},${tip} ${x-half*0.5},${tip+t.h*0.4} ${x+half*0.5},${tip+t.h*0.4}`} fill={treeDark} />
              <polygon points={`${x},${tip+t.h*0.25} ${x-half*0.7},${tip+t.h*0.65} ${x+half*0.7},${tip+t.h*0.65}`} fill={treeColor} />
              <polygon points={`${x},${tip+t.h*0.5} ${x-half},${base} ${x+half},${base}`} fill={treeColor} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
