# 🤖 AI Assistant Chatbot

<div align="center">

![AI Chatbot Banner](https://img.shields.io/badge/AI-Assistant%20Chatbot-4f8ef7?style=for-the-badge&logo=robot&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude%20API-7c5cfc?style=for-the-badge)

**A premium, production-grade AI chatbot interface built with pure frontend technologies.**

[Live Demo](#) · [Features](#features) · [Setup](#setup) · [API Integration](#api-integration)

</div>

---

## ✨ Overview

AI Assistant Chatbot is a fully responsive, modern chat application built with HTML, CSS, and JavaScript. It features a polished dark-mode UI inspired by ChatGPT and Claude, complete with multi-session chat history, voice input, and seamless Anthropic Claude API integration.

Built as an internship-level showcase project demonstrating real-world frontend engineering skills.

---

## 🎯 Features

| Feature | Description |
|--------|-------------|
| 🌑 **Dark Mode UI** | Deep-space dark theme with blue-purple accent gradients |
| 💬 **ChatGPT-style Interface** | Clean chat bubbles, avatar icons, timestamps |
| 🧠 **Smart Responses** | 50+ predefined keyword-matched responses (no API needed) |
| 🔌 **Claude API Ready** | Plug in your Anthropic API key for full AI power |
| 💾 **localStorage Persistence** | Chats saved automatically, survive page refresh |
| 📁 **Multi-session History** | Create, switch between, and delete conversations |
| 🎤 **Voice Input** | Web Speech API integration for hands-free input |
| ✍️ **Typing Animation** | Animated dots while bot is "thinking" |
| 📱 **Fully Responsive** | Slide-out sidebar on mobile, works on all screen sizes |
| 🌗 **Theme Toggle** | Switch between dark and light themes |
| 🔤 **Markdown Support** | Bot responses support **bold**, `code`, and code blocks |
| 📋 **Copy Messages** | One-click copy for any message |
| 🚨 **Confirmation Modals** | Safe deletion with animated modal dialogs |
| 🍞 **Toast Notifications** | Subtle feedback toasts for user actions |

---

## 📁 Project Structure

```
ai-chatbot/
├── index.html      # Main HTML (landing + chat app)
├── style.css       # All styles (variables, components, responsive)
├── script.js       # Full app logic (state, API, voice, storage)
└── README.md       # This file
```

---

## 🚀 Setup

### Option 1: Run Directly (No Build Step)

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-assistant-chatbot.git
cd ai-assistant-chatbot

# Open in browser
open index.html
# OR use VS Code Live Server for best experience
```

No npm, no webpack, no dependencies. Just open `index.html`.

### Option 2: VS Code Live Server

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. App launches at `http://127.0.0.1:5500`

---

## 🔌 API Integration

To connect Anthropic Claude for real AI responses:

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. Open `script.js`
3. Update the `CONFIG` object at the top:

```javascript
const CONFIG = {
  USE_API: true,                          // ← Set to true
  API_KEY: "sk-ant-your-key-here",        // ← Paste your key
  API_MODEL: "claude-sonnet-4-20250514",  // ← Model to use
  MAX_TOKENS: 1000,
  // ...
};
```

> ⚠️ **Security Note:** Never commit your API key to a public repository. For production, route API calls through a backend server.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#4f8ef7` | Primary blue, buttons, links |
| `--accent-2` | `#7c5cfc` | Purple gradient end |
| `--bg-primary` | `#080b12` | Main background |
| `--bg-secondary` | `#0e1420` | Sidebar, header |
| Font Display | **Syne** 800 | Titles, badges |
| Font Body | **DM Sans** 400 | Messages, UI text |

---

## 🧠 Smart Response Engine

Without an API key, the bot uses a keyword-matching system with 15+ response categories including:

- Greetings & farewells
- Programming (JavaScript, Python, HTML/CSS)
- Career & internship advice
- Creative writing (email templates)
- Concept explanations (quantum computing)
- Business ideas & entrepreneurship
- Fun (jokes, date/time)

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `> 900px` | Full layout: sidebar + chat side by side |
| `640–900px` | Stacked landing, full chat layout |
| `< 640px` | Hamburger menu, slide-out drawer sidebar |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure, accessibility attributes
- **CSS3** — Custom properties, Flexbox, Grid, animations, `@keyframes`
- **Vanilla JavaScript (ES6+)** — Async/await, DOM API, localStorage, Web Speech API
- **Feather Icons** — Clean SVG icon library (CDN)
- **Google Fonts** — Syne + DM Sans

---

## 📈 Resume Description

> **AI Assistant Chatbot** | HTML · CSS · JavaScript  
> Developed a full-featured AI chatbot web application with a premium dark-mode UI. Implemented multi-session chat management with localStorage persistence, Anthropic Claude API integration, Web Speech API voice input, typing animations, and responsive mobile design. Features 50+ predefined intelligent responses and a modular JavaScript architecture following clean code principles.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — free to use for personal and commercial projects.

---

<div align="center">
  Built with ❤️ as an internship portfolio project
</div>
