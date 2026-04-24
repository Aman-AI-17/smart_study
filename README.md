# smart_study
🎓 Smart Study - AI-Powered Learning Platform
A feature-rich study app with AI capabilities powered by Claude API.
✨ Features
Feature	Description
📚 Knowledge Base	Upload PDF, TXT, MD documents (up to 10MB)
🛠️ Study Tools	AI-powered Summarize, Flashcards, Quiz generation
📅 Spaced Revision	Track document review intervals
⚔️ Battle Mode	Real-time multiplayer quiz battles with room codes
✏️ Annotations	Tag and annotate documents
🧬 Study DNA	AI-generated personal learning profile
📊 Stats	Learning analytics dashboard
🎯 Focus Mode	Distraction-free writing with momentum tracking
🎙️ Voice Notes	Record audio study notes
⏱️ Pomodoro Timer	Built-in countdown study timer
🌙 Day/Night Theme	Animated nature background themes
📄 Report	Generate and print learning reports
🚀 Quick Start
Prerequisites
Node.js 18+
npm or yarn
Installation
```bash
# Clone or extract the project
cd smart-study

# Install dependencies
npm install

# Start development server
npm run dev
```
Open http://localhost:3000
Demo Login
Username: admin
Password: study123
> Any username/password works for demo purposes.
🤖 AI Features (Claude API)
The app uses the Anthropic Claude API for:
Document summarization
Flashcard generation
Quiz creation
Study DNA profile analysis
The API is pre-configured and works out of the box in the Claude.ai artifact environment.
For standalone deployment, add your API key:
```js
// src/utils/api.js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
  'anthropic-version': '2023-06-01'
}
```
📁 Project Structure
```
smart-study/
├── src/
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles & animations
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── components/
│   │   ├── Background.jsx      # Animated forest scene
│   │   ├── Sidebar.jsx         # Navigation + timer + voice
│   │   └── Navbar.jsx          # Top bar
│   ├── pages/
│   │   ├── LoginPage.jsx       # Auth screen
│   │   ├── KnowledgeBase.jsx   # Document upload & search
│   │   ├── StudyTools.jsx      # Summarize/Flashcards/Quiz
│   │   └── OtherPages.jsx      # Revision, Battle, Stats, etc.
│   └── utils/
│       └── api.js              # Anthropic API helper
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```
🏗️ Build for Production
```bash
npm run build
npm run preview
```
🎨 Design
Theme: Animated nature/forest scenes with day/night cycle
Colors: Orange (#f97316), Gold (#f59e0b), Deep Purple (#1e0a3c)
Fonts: Nunito (UI), Space Mono (timer)
Animations: Floating particles, flying birds, tree silhouettes
📦 Tech Stack
React 18 - UI framework
Vite - Build tool
Lucide React - Icons
Anthropic Claude API - AI features
Web APIs - MediaRecorder (voice), File API (uploads)
