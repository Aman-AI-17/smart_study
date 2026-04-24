const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

export async function callClaude(prompt, systemPrompt = '') {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt || 'You are a helpful AI study assistant.',
      messages: [{ role: 'user', content: prompt }]
    })
  })
  const data = await response.json()
  if (data.error) throw new Error(data.error.message)
  return data.content[0].text
}

export async function generateSummary(text) {
  return callClaude(
    `Summarize this document extracting the most important sentences and key concepts:\n\n${text.slice(0, 4000)}`,
    'You are an expert at creating concise, informative summaries. Focus on key concepts, important facts, and main arguments.'
  )
}

export async function generateFlashcards(text) {
  const response = await callClaude(
    `Create 8 flashcards from this content. Return ONLY a JSON array: [{"question":"...","answer":"..."}]\n\n${text.slice(0, 3000)}`,
    'Return ONLY valid JSON array of flashcard objects with question and answer fields. No markdown, no backticks, no preamble.'
  )
  try {
    const clean = response.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return [{ question: 'What is the main topic?', answer: 'Please regenerate flashcards.' }]
  }
}

export async function generateQuiz(text) {
  const response = await callClaude(
    `Create 5 fill-in-the-blank quiz questions from this text. Return ONLY JSON: [{"question":"sentence with _____ blank","answer":"word"}]\n\n${text.slice(0, 3000)}`,
    'Return ONLY valid JSON array. Each item has "question" (sentence with _____ for blank) and "answer" (the missing word). No markdown.'
  )
  try {
    const clean = response.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return [{ question: 'What is the main _____ of this document?', answer: 'topic' }]
  }
}

export async function analyzeStudyDNA(docs, scores, time) {
  return callClaude(
    `Based on: ${docs} documents uploaded, ${scores.length} quizzes taken (avg score: ${scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0}%), ${Math.round(time/60)} minutes studied. Generate a short study DNA profile with strengths and recommendations.`,
    'You are a learning analytics expert. Be encouraging and specific. Keep response under 200 words.'
  )
}
