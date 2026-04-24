import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('night')
  const [documents, setDocuments] = useState([])
  const [studyTime, setStudyTime] = useState(25 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerDuration, setTimerDuration] = useState(25)
  const [annotations, setAnnotations] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [quizScores, setQuizScores] = useState([])
  const [voiceNotes, setVoiceNotes] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    let interval
    if (timerRunning && studyTime > 0) {
      interval = setInterval(() => setStudyTime(t => t - 1), 1000)
    } else if (studyTime === 0) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, studyTime])

  const login = (username, password) => {
    if (username === 'admin' && password === 'study123') {
      setUser({ username, id: 'admin' })
      return true
    }
    // allow any login for demo
    if (username && password) {
      setUser({ username, id: username })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  const addDocument = (doc) => setDocuments(prev => [...prev, doc])
  const removeDocument = (id) => setDocuments(prev => prev.filter(d => d.id !== id))

  const resetTimer = () => {
    setTimerRunning(false)
    setStudyTime(timerDuration * 60)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <AppContext.Provider value={{
      user, login, logout,
      theme, setTheme,
      documents, addDocument, removeDocument,
      studyTime, timerRunning, setTimerRunning,
      timerDuration, setTimerDuration,
      resetTimer, formatTime,
      annotations, setAnnotations,
      flashcards, setFlashcards,
      quizScores, setQuizScores,
      voiceNotes, setVoiceNotes,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
