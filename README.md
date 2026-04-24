🎓 Smart Study — AI-Powered Learning Platform
> *Turn any document into a complete study experience in seconds.*
Smart Study is a modern, gamified learning platform that uses Claude AI to transform uploaded documents into summaries, flashcards, and quizzes — all wrapped in a beautiful animated nature interface with day/night themes, real-time multiplayer battles, spaced repetition, a focus writing mode, and detailed learning analytics.
---
🌟 What Is Smart Study?
Smart Study is built for students, self-learners, and knowledge workers who want to get more out of their reading material. Instead of passively reading a PDF, you upload it and immediately get:
An AI-generated executive summary of the key points
A set of interactive flashcards built from the document's core concepts
A fill-in-the-blank quiz to test your recall
A spaced revision schedule so you review material at the right time
A battle room to race friends through quiz questions live
The app tracks your progress across all sessions and builds a personalized Study DNA profile — showing your strengths, weaknesses, and tailored recommendations for improvement.
---
✨ Feature Breakdown
📚 Knowledge Base
Upload PDF, TXT, or Markdown files (up to 10MB each). Documents are indexed with word count and estimated read time. Search across all uploaded documents instantly. Delete documents you no longer need.
🛠️ Study Tools (AI-Powered)
Three modes powered by the Claude API:
Summarize — Extracts the most important sentences into a clean executive summary using NLP algorithms
Flashcards — Auto-generates 8 question/answer cards from key concepts; click any card to flip between question and answer
Quiz — Creates fill-in-the-blank questions; submit your answers and get an instant score with correct answers revealed for wrong responses
📅 Spaced Revision
Implements a spaced repetition system. Each document gets a review interval that grows as you mark it reviewed. The dashboard shows how many documents need attention today and when each is due next.
⚔️ Battle Mode
Multiplayer real-time quiz battles. Create a room (generates a unique 6-character code), share the code with a friend, and race through quiz questions head-to-head. Works across devices on the same network.
✏️ Annotations
Write notes linked to specific documents with custom tags (Important, Review, Question, Key Concept, Example). Annotations are stored per session and displayed with timestamp and document reference.
🧬 Study DNA
A visual learning profile with four trait bars: Document Depth, Quiz Performance, Study Consistency, and Knowledge Coverage. Click "Analyze" to get a personalized AI-written profile with strengths and actionable study recommendations.
📊 Stats Dashboard
Learning analytics showing total documents, words indexed, flashcards generated, quizzes taken, and average quiz score. Includes a bar chart of quiz score history and a daily rotating Study Tip.
🎯 Focus Mode
A fullscreen, distraction-free writing environment featuring:
Readability indicator — rates your writing as Easy / Moderate / Complex in real time
Momentum bar — fills as you type, slowly drains when you stop — keeps you motivated
Auto-save indicator — confirms your work is saved every 30 seconds
Ambience selector — choose Silent, Rain, Forest, Cafe, or Ocean background sounds
Live word counter — tracks your word count as you write
🎙️ Voice Notes
Record audio notes directly in the browser using your microphone. Recordings are saved as playable audio clips per session — great for verbal summaries after reading.
⏱️ Pomodoro Study Timer
A built-in countdown timer in the sidebar. Choose from 5, 10, 15, 20, 25, 30, 45, or 60-minute sessions. Play, pause, and reset at any time. Designed around the Pomodoro technique for focused, interval-based studying.
🌙 Day / Night Theme
Toggle between two fully animated themes:
Day — Blue sky, sun, green meadow, light card backgrounds
Night — Deep purple starfield, crescent moon, warm orange horizon, dark card backgrounds
Both themes feature animated pine tree silhouettes, floating geometric particles, and gliding birds.
📄 Report
Generate a printable learning report showing your student name, date, all documents studied, flashcard count, quiz scores, and a visual score history chart. One-click print or save as PDF from the browser.
---
🎨 Design & Aesthetics
Style: Whimsical forest adventure meets modern productivity
Background: Fully animated SVG scene with layered pine trees, floating particles, birds, sun/moon
Color palette: Warm orange `#f97316`, gold `#f59e0b`, deep purple `#1e0a3c`, forest green `#166534`
Typography: Nunito (friendly, rounded UI text) + Space Mono (timer display)
Motion: CSS keyframe animations for floats, birds, wave bars, and slide-in page transitions
Cards: Glassmorphism-style with `backdrop-filter: blur` and semi-transparent backgrounds
---
🤖 AI Stack
Capability	Model	Prompt Strategy
Summarization	Claude Sonnet	Extract key sentences, NLP summary
Flashcard generation	Claude Sonnet	JSON output — 8 Q&A pairs
Quiz generation	Claude Sonnet	Fill-in-the-blank JSON array
Study DNA analysis	Claude Sonnet	Personalized profile from usage stats
All AI calls go to `https://api.anthropic.com/v1/messages` using the `claude-sonnet-4-20250514` model.
---
🏗️ Tech Stack
Layer	Technology
Framework	React 18
Build Tool	Vite 5
Routing / State	React Context API
AI	Anthropic Claude API
Icons	Lucide React
Voice	Web MediaRecorder API
File Handling	FileReader API
Styling	Pure CSS with CSS variables
Fonts	Google Fonts (Nunito, Space Mono)
No heavy UI libraries. No Redux. No Tailwind. Just React + CSS + Claude.
---
📁 Project Structure
```
smart-study/
├── src/
│   ├── App.jsx                  # Root app, page routing, focus mode overlay
│   ├── main.jsx                 # React DOM entry point
│   ├── index.css                # Global styles, CSS variables, keyframe animations
│   ├── context/
│   │   └── AppContext.jsx       # Global state: user, documents, timer, theme, scores
│   ├── components/
│   │   ├── Background.jsx       # SVG animated forest/sky scene (day & night)
│   │   ├── Sidebar.jsx          # Nav links, voice recorder, theme toggle, timer
│   │   └── Navbar.jsx           # Top bar: document count, report, username, logout
│   ├── pages/
│   │   ├── LoginPage.jsx        # Auth screen with demo credentials
│   │   ├── KnowledgeBase.jsx    # Upload, search, document list
│   │   ├── StudyTools.jsx       # AI summarize / flashcards / quiz
│   │   └── OtherPages.jsx       # Revision, Battle, Annotations, DNA, Stats, Focus, Report
│   └── utils/
│       └── api.js               # Claude API helper: summary, flashcards, quiz, DNA
├── public/
│   └── index.html
├── package.json
├── vite.config.js
├── README.md
└── DESCRIPTION.md               # ← This file
```
---

📸 Screenshots Reference
<img width="1919" height="925" alt="Screenshot 2026-04-24 151153" src="https://github.com/user-attachments/assets/c548c871-a635-492f-9a2f-26f4969fd2bc" />
<img width="1919" height="925" alt="Screenshot 2026-04-24 151153" src="https://github.com/user-attachments/assets/3208bc1f-a384-4351-8a00-d33063d4c28b" />
<img width="1290" height="736" alt="Screenshot 2026-04-24 151428" src="https://github.com/user-attachments/assets/92568e98-e62c-4dac-9b75-1ae2339de202" />
<img width="1312" height="840" alt="Screenshot 2026-04-24 151418" src="https://github.com/user-attachments/assets/b1d5a304-4eb0-41bb-813f-35bc5182b01b" />
<img width="322" height="193" alt="Screenshot 2026-04-24 151332" src="https://github.com/user-attachments/assets/f3001ed3-5b3f-40e2-868b-80802ccf9ad9" />
<img width="1919" height="929" alt="Screenshot 2026-04-24 151347" src="https://github.com/user-attachments/assets/5a1fabbd-4653-41b1-8e10-326b73ac4a4f" />
<img width="321" height="163" alt="Screenshot 2026-04-24 151355" src="https://github.com/user-attachments/assets/f85872d9-8daa-4277-b9ac-3339308c755e" />
<img width="1919" height="925" alt="Screenshot 2026-04-24 151153" src="https://github.com/user-attachments/assets/437b34a5-1c34-4860-9727-067a669a544d" />
<img width="1919" height="928" alt="Screenshot 2026-04-24 151017" src="https://github.com/user-attachments/assets/0fd0a3f6-a4fe-48bd-8a61-36752a6ccb1c" />
<img width="1919" height="930" alt="Screenshot 2026-04-24 151041" src="https://github.com/user-attachments/assets/de2ebffa-2f64-4b22-9ec7-156eb8c1b971" />
<img width="1919" height="923" alt="Screenshot 2026-04-24 151052" src="https://github.com/user-attachments/assets/ff8a5228-c455-4800-882e-08c9633fdab5" />
<img width="1919" height="929" alt="Screenshot 2026-04-24 151130" src="https://github.com/user-attachments/assets/7c8e72a1-7a79-4ce2-a932-2e156265c789" />

Screen	Description
Login	Daytime forest scene, cream card, orange Sign In button
Knowledge Base (Night)	Purple/orange sunset bg, upload zone, document list
Knowledge Base (Day)	Blue sky bg, same layout in light theme
Study Tools — Summarize	Select document dropdown, Generate Summary button
Study Tools — Flashcards	4×2 grid of flip cards
Study Tools — Quiz	Fill-in-the-blank questions with input fields

Spaced Revision	Document review schedule with interval badges
Battle Mode	Create Room + Join Room split layout with room code input
Stats	5 stat cards + study tip panel
Focus Mode	Fullscreen dark editor with readability/momentum/autosave sidebar
Voice Note	Recording UI with animated wave bars
Night theme timer	Compact Pomodoro timer in sidebar
---
📄 License
MIT — free to use, modify, and deploy.
---
Built with ❤️ using Replit ai
