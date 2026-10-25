/**
 * ═══════════════════════════════════════════════════════════
 *  AI ASSISTANT CHATBOT — script.js
 *  Author: AI Assistant Project
 *  Features:
 *    - Predefined smart responses (no API needed)
 *    - Anthropic Claude API integration support
 *    - localStorage chat history
 *    - Voice input (Web Speech API)
 *    - Typing animation
 *    - Multi-session chat management
 *    - Copy message support
 * ═══════════════════════════════════════════════════════════
 */


/* ══════════════════════════════════════════════════════════
   ⚙️  CONFIGURATION
   - To connect a real AI, set USE_API = true and provide
     your Anthropic API key in API_KEY below.
   - IMPORTANT: Never commit real API keys to public repos.
══════════════════════════════════════════════════════════ */
const CONFIG = {
  USE_API: true,                  // Set true to use Anthropic Claude API
  API_KEY: "",                      // Add your Anthropic API key here
  API_MODEL: "claude-sonnet-4-20250514",
  MAX_TOKENS: 1000,
  TYPING_MIN_DELAY: 800,          // Minimum typing indicator duration (ms)
  TYPING_MAX_DELAY: 2200,
  STORAGE_KEY: "ai_chatbot_data",
  BOT_NAME: "AI Assistant",
  USER_NAME: "You",
};


/* ══════════════════════════════════════════════════════════
   🧠  PREDEFINED SMART RESPONSES
   Used when USE_API is false or when there's no API key.
   Mapped by keyword patterns → responses array (random pick).
══════════════════════════════════════════════════════════ */
const SMART_RESPONSES = [
  {
    patterns: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "howdy"],
    responses: [
      "Hello! 👋 I'm your AI Assistant. How can I help you today?",
      "Hi there! Great to see you. What's on your mind?",
      "Hey! I'm here and ready to help. What would you like to explore?"
    ]
  },
  {
    patterns: ["how are you", "how do you do", "what's up", "whats up"],
    responses: [
      "I'm doing great, thanks for asking! I'm always ready to assist. What can I help you with?",
      "Running perfectly and excited to help! How are YOU doing?",
      "All systems go! Ready to tackle any question you have. 🚀"
    ]
  },
  {
    patterns: ["what can you do", "what are your capabilities", "help me", "features", "abilities"],
    responses: [
      "Great question! Here's what I can help with:\n\n• **Answer questions** on almost any topic\n• **Write & edit** — emails, essays, code, stories\n• **Explain concepts** in simple or technical terms\n• **Brainstorm** ideas and creative solutions\n• **Analyze** text, data, or problems\n• **Translate** languages (basic support)\n\nWhat would you like to try first?"
    ]
  },
  {
    patterns: ["javascript", "js", "nodejs", "react", "vue", "angular"],
    responses: [
      "JavaScript is one of the most versatile languages! Whether it's frontend with React/Vue, backend with Node.js, or full-stack — JS powers the modern web.\n\nAre you working on a specific project? I can help with code, architecture, or debugging!",
      "Love that you're interested in JS! Here's a hot tip: master async/await, closures, and the event loop — they're the core of writing clean JavaScript. What are you building?"
    ]
  },
  {
    patterns: ["python", "django", "flask", "fastapi", "machine learning", "ml", "artificial intelligence"],
    responses: [
      "Python is fantastic — especially for AI/ML, data science, and web backends. Libraries like NumPy, Pandas, and PyTorch make it incredibly powerful.\n\nAre you working on a data project, building an API, or diving into machine learning? I'd love to help!",
      "Python's clean syntax makes it perfect for beginners AND experts alike. What specifically are you working on? I can help with code, best practices, or concepts."
    ]
  },
  {
    patterns: ["html", "css", "web design", "frontend", "website"],
    responses: [
      "Web development is so rewarding! HTML provides structure, CSS the style, and JavaScript the interactivity.\n\nPro tip: Learn Flexbox and CSS Grid thoroughly — they'll solve 90% of your layout challenges. What aspect of frontend are you focusing on?",
      "Building for the web? Exciting! A good starting stack is HTML5 + CSS3 + Vanilla JS, then level up to a framework like React. What are you trying to build?"
    ]
  },
  {
    patterns: ["internship", "resume", "job", "career", "interview"],
    responses: [
      "Preparing for internships or jobs? Here's my top advice:\n\n1. **Build real projects** — like this chatbot! 🎉\n2. **Host on GitHub** with clean READMEs\n3. **Practice DSA** on LeetCode/HackerRank\n4. **Learn one framework** deeply (React, Django, etc.)\n5. **Contribute to open source** when possible\n\nYou're already on the right track by building your own projects!",
    ]
  },
  {
    patterns: ["quantum", "quantum computing"],
    responses: [
      "Quantum computing is a mind-bending field! 🌀\n\nUnlike classical computers that use **bits** (0 or 1), quantum computers use **qubits** which can exist in both states simultaneously — this is called **superposition**.\n\n**Key concepts:**\n• **Superposition** — qubits can be 0, 1, or both at once\n• **Entanglement** — qubits can be linked across any distance\n• **Interference** — used to amplify correct answers\n\nThis allows quantum computers to solve certain problems (like cryptography and drug discovery) exponentially faster than classical computers. Still in early stages but the future looks incredible!"
    ]
  },
  {
    patterns: ["email", "write email", "professional email"],
    responses: [
      "Here's a template for a professional meeting reschedule email:\n\n---\n**Subject:** Request to Reschedule Our Meeting\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding our scheduled meeting on [date/time].\n\nDue to [brief reason], I need to request a reschedule. I sincerely apologize for any inconvenience this may cause.\n\nCould we perhaps meet on [alternative date/time]? Please let me know what works best for your schedule.\n\nThank you for your understanding. I look forward to our conversation!\n\nBest regards,\n[Your Name]\n\n---\nWould you like me to customize this further?"
    ]
  },
  {
    patterns: ["code", "coding", "programming", "best practices", "learn to code"],
    responses: [
      "Here are the best practices for learning to code effectively:\n\n**1. Start with one language** — Don't jump around. Master JavaScript or Python first.\n\n**2. Build projects, not just tutorials** — Real learning happens when you create something from scratch.\n\n**3. Read documentation** — Get comfortable with official docs early.\n\n**4. Version control from day one** — Learn Git. It's non-negotiable.\n\n**5. Code every day** — Even 30 minutes daily beats 5-hour weekend sessions.\n\n**6. Join communities** — GitHub, Stack Overflow, Discord servers.\n\n**7. Embrace debugging** — Every bug is a lesson. Use console.log freely!\n\nYou're coding RIGHT NOW by building this project. Keep going! 💪"
    ]
  },
  {
    patterns: ["business idea", "startup", "business ideas", "entrepreneurship"],
    responses: [
      "Here are 5 creative business ideas for 2025:\n\n**1. 🤖 AI Prompt Consulting** — Help businesses craft effective AI prompts for their workflows. High demand, low startup cost.\n\n**2. 🌱 Micro SaaS Products** — Build small, focused tools that solve one problem really well. Target niche audiences.\n\n**3. 📚 Online Skill Bootcamps** — Create intensive, affordable courses on in-demand skills (AI tools, no-code platforms, etc.)\n\n**4. 🎨 Digital Product Store** — Sell templates, UI kits, icon packs, or Notion dashboards on Gumroad or Etsy.\n\n**5. 🏠 Hyper-local Services App** — Connect local service providers (cleaners, tutors, handymen) with customers in your city.\n\nWhich of these interests you most?"
    ]
  },
  {
    patterns: ["time", "what time", "date", "today"],
    responses: [
      `The current date and time is: **${new Date().toLocaleString()}**\n\nIs there anything time-sensitive I can help you with?`
    ]
  },
  {
    patterns: ["joke", "funny", "make me laugh", "tell me a joke"],
    responses: [
      "Why do programmers prefer dark mode? 🌙\n\nBecause **light attracts bugs!** 🐛😂",
      "A SQL query walks into a bar, walks up to two tables and asks... **'Can I join you?'** 😄",
      "Why did the JavaScript developer go broke?\n\nBecause he used up all his **cache!** 💸😂"
    ]
  },
  {
    patterns: ["thanks", "thank you", "thx", "ty", "appreciate"],
    responses: [
      "You're very welcome! 😊 Happy to help anytime.",
      "Glad I could assist! Feel free to ask me anything else.",
      "Anytime! That's what I'm here for. Is there anything else you'd like to explore?"
    ]
  },
  {
    patterns: ["bye", "goodbye", "see you", "ciao", "later"],
    responses: [
      "Goodbye! 👋 It was a pleasure chatting with you. Come back anytime!",
      "See you later! Take care and keep building awesome things! 🚀",
      "Bye for now! Feel free to start a new chat whenever you need me. 😊"
    ]
  },
  {
    patterns: ["who are you", "what are you", "your name", "about you"],
    responses: [
      "I'm your **AI Assistant** — a smart chatbot built with HTML, CSS, and JavaScript! 🤖\n\nI'm powered by predefined intelligent responses, and I can be connected to the **Anthropic Claude API** for even more powerful conversations.\n\nI was built as an internship-level project to demonstrate modern web development skills. What can I help you with?"
    ]
  },
  {
    patterns: ["weather", "temperature", "forecast"],
    responses: [
      "I don't have access to live weather data in my current mode, but I'd recommend:\n\n• **weather.com** for detailed forecasts\n• **Google** — just search your city + 'weather'\n• **Weather apps** on your phone for real-time updates\n\nIf I'm connected to an API with web access, I can fetch live weather data for you! Would you like to explore other topics?"
    ]
  }
];


/* ══════════════════════════════════════════════════════════
   📦  STATE MANAGEMENT
   All app state lives here. Persisted to localStorage.
══════════════════════════════════════════════════════════ */
let appState = {
  sessions: [],        // Array of chat sessions
  activeSessionId: null,
  isTyping: false,
  voiceMode: false,
  recognition: null,
};


/* ══════════════════════════════════════════════════════════
   🔌  DOM REFERENCES
══════════════════════════════════════════════════════════ */
const DOM = {
  // Screens
  landing:          () => document.getElementById('landing'),
  chatApp:          () => document.getElementById('chatApp'),
  // Landing
  startChatBtn:     () => document.getElementById('startChatBtn'),
  // Sidebar
  sidebar:          () => document.getElementById('sidebar'),
  sidebarOverlay:   () => document.getElementById('sidebarOverlay'),
  historyList:      () => document.getElementById('historyList'),
  newChatBtn:       () => document.getElementById('newChatBtn'),
  clearAllBtn:      () => document.getElementById('clearAllBtn'),
  backToLandingBtn: () => document.getElementById('backToLandingBtn'),
  // Header
  hamburgerBtn:     () => document.getElementById('hamburgerBtn'),
  clearChatBtn:     () => document.getElementById('clearChatBtn'),
  themeToggleBtn:   () => document.getElementById('themeToggleBtn'),
  headerStatus:     () => document.getElementById('headerStatus'),
  // Messages
  messagesContainer: () => document.getElementById('messagesContainer'),
  welcomeScreen:    () => document.getElementById('welcomeScreen'),
  messagesList:     () => document.getElementById('messagesList'),
  // Input
  chatInput:        () => document.getElementById('chatInput'),
  sendBtn:          () => document.getElementById('sendBtn'),
  voiceBtn:         () => document.getElementById('voiceBtn'),
  // Misc
  toast:            () => document.getElementById('toast'),
  modalOverlay:     () => document.getElementById('modalOverlay'),
  modalTitle:       () => document.getElementById('modalTitle'),
  modalDesc:        () => document.getElementById('modalDesc'),
  modalCancel:      () => document.getElementById('modalCancel'),
  modalConfirm:     () => document.getElementById('modalConfirm'),
};


/* ══════════════════════════════════════════════════════════
   💾  LOCAL STORAGE HELPERS
══════════════════════════════════════════════════════════ */

/** Save the entire app state to localStorage */
function saveToStorage() {
  try {
    const data = {
      sessions: appState.sessions,
      activeSessionId: appState.activeSessionId,
      theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
    };
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

/** Load state from localStorage on startup */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    appState.sessions = data.sessions || [];
    appState.activeSessionId = data.activeSessionId || null;
    // Restore theme
    if (data.theme === 'light') {
      document.body.classList.add('light-theme');
      updateThemeIcon();
    }
    return true;
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
    return false;
  }
}


/* ══════════════════════════════════════════════════════════
   🗓️  SESSION MANAGEMENT
══════════════════════════════════════════════════════════ */

/** Create a new chat session */
function createNewSession() {
  const session = {
    id: `session_${Date.now()}`,
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  appState.sessions.unshift(session); // Add to top
  appState.activeSessionId = session.id;
  saveToStorage();
  return session;
}

/** Get the currently active session */
function getActiveSession() {
  return appState.sessions.find(s => s.id === appState.activeSessionId) || null;
}

/** Add a message to the active session */
function addMessageToSession(role, content) {
  const session = getActiveSession();
  if (!session) return null;

  const message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    role,        // "user" or "bot"
    content,
    timestamp: new Date().toISOString(),
  };
  session.messages.push(message);
  session.updatedAt = new Date().toISOString();

  // Auto-title: use first user message, trimmed
  if (role === "user" && session.title === "New Chat") {
    session.title = content.slice(0, 42) + (content.length > 42 ? "…" : "");
  }

  saveToStorage();
  return message;
}

/** Delete a session by id */
function deleteSession(sessionId) {
  appState.sessions = appState.sessions.filter(s => s.id !== sessionId);
  if (appState.activeSessionId === sessionId) {
    appState.activeSessionId = appState.sessions.length > 0 ? appState.sessions[0].id : null;
  }
  saveToStorage();
}

/** Clear all messages from current session */
function clearCurrentSession() {
  const session = getActiveSession();
  if (!session) return;
  session.messages = [];
  session.title = "New Chat";
  saveToStorage();
}


/* ══════════════════════════════════════════════════════════
   🎨  RENDER — SIDEBAR HISTORY
══════════════════════════════════════════════════════════ */
function renderHistory() {
  const list = DOM.historyList();
  list.innerHTML = "";

  if (appState.sessions.length === 0) {
    list.innerHTML = `
      <div class="no-history">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        No chats yet.<br/>Start a new conversation!
      </div>`;
    return;
  }

  appState.sessions.forEach(session => {
    const item = document.createElement('div');
    item.className = `history-item${session.id === appState.activeSessionId ? ' active' : ''}`;
    item.dataset.id = session.id;
    item.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span class="history-text">${escapeHtml(session.title)}</span>
      <button class="history-delete" data-id="${session.id}" title="Delete chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>`;

    // Click to load session
    item.addEventListener('click', (e) => {
      if (e.target.closest('.history-delete')) return;
      loadSession(session.id);
      closeSidebar();
    });

    // Delete button
    item.querySelector('.history-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      showModal(
        "Delete this chat?",
        "This conversation will be permanently removed.",
        () => {
          deleteSession(session.id);
          renderHistory();
          renderMessages();
        }
      );
    });

    list.appendChild(item);
  });
}


/* ══════════════════════════════════════════════════════════
   🎨  RENDER — MESSAGES
══════════════════════════════════════════════════════════ */
function renderMessages() {
  const session = getActiveSession();
  const msgList = DOM.messagesList();
  const welcome = DOM.welcomeScreen();

  msgList.innerHTML = "";

  if (!session || session.messages.length === 0) {
    welcome.style.display = "flex";
    msgList.style.display = "none";
    return;
  }

  welcome.style.display = "none";
  msgList.style.display = "flex";

  session.messages.forEach((msg, index) => {
    // Add date separator if first message or new day
    if (index === 0) {
      const sep = createDateSeparator(msg.timestamp);
      msgList.appendChild(sep);
    }

    const el = createMessageElement(msg);
    msgList.appendChild(el);
  });

  scrollToBottom(false);
}

/** Create a date separator element */
function createDateSeparator(timestamp) {
  const div = document.createElement('div');
  div.className = 'date-separator';
  div.textContent = formatDate(timestamp);
  return div;
}

/** Create a DOM element for a single message */
function createMessageElement(msg) {
  const div = document.createElement('div');
  div.className = `message ${msg.role}`;
  div.dataset.id = msg.id;

  const isBot = msg.role === 'bot';
  const avatarContent = isBot
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
    : `<span>U</span>`;

  div.innerHTML = `
    <div class="msg-avatar">${avatarContent}</div>
    <div class="msg-content">
      <div class="msg-name">${isBot ? CONFIG.BOT_NAME : CONFIG.USER_NAME}</div>
      <div class="msg-text">${formatMessage(msg.content)}</div>
      <div class="msg-time">${formatTime(msg.timestamp)}</div>
      <div class="msg-actions">
        <button class="msg-action-btn copy-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
    </div>`;

  // Copy button handler
  div.querySelector('.copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(msg.content).then(() => {
      showToast("Copied to clipboard!", "success");
    });
  });

  return div;
}

/** Create the typing indicator element */
function createTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'message bot typing';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    </div>
    <div class="msg-content">
      <div class="msg-name">${CONFIG.BOT_NAME}</div>
      <div class="msg-text">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>`;
  return div;
}


/* ══════════════════════════════════════════════════════════
   🤖  RESPONSE ENGINE
══════════════════════════════════════════════════════════ */

/**
 * Get a bot response — either from Anthropic API or predefined responses
 * @param {string} userText - The user's input message
 * @param {Array}  history  - Previous messages for context
 * @returns {Promise<string>}
 */
async function getBotResponse(userText, history) {
  // Use Anthropic Claude API if configured
  if (CONFIG.USE_API && CONFIG.API_KEY) {
    return await callAnthropicAPI(userText, history);
  }
  // Otherwise use smart predefined responses
  return getSmartResponse(userText);
}

/**
 * Call Anthropic Claude API
 */
async function callAnthropicAPI(userText, history) {
  // Build message history in Anthropic format
  const messages = history.map(msg => ({
    role: msg.role === 'bot' ? 'assistant' : 'user',
    content: msg.content,
  }));
  // Add the current user message
  messages.push({ role: 'user', content: userText });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CONFIG.API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CONFIG.API_MODEL,
      max_tokens: CONFIG.MAX_TOKENS,
      system: "You are a helpful, friendly, and intelligent AI assistant. Be concise but thorough. Use markdown formatting when helpful (bold for emphasis, bullet points for lists, code blocks for code).",
      messages: messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API Error ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "I couldn't generate a response. Please try again.";
}

/**
 * Get a smart predefined response based on keyword matching
 * @param {string} text - User input
 * @returns {string}
 */
function getSmartResponse(text) {
  const lower = text.toLowerCase().trim();

  // Find the best matching response category
  for (const category of SMART_RESPONSES) {
    for (const pattern of category.patterns) {
      if (lower.includes(pattern)) {
        // Pick a random response from the array
        const arr = category.responses;
        return arr[Math.floor(Math.random() * arr.length)];
      }
    }
  }

  // Default fallback responses
  const fallbacks = [
    `That's an interesting question! While I'm running in **offline mode** right now, I can tackle many topics.\n\nTry asking me about:\n• Programming & web development\n• Writing professional emails\n• Business ideas\n• Career & internship tips\n• Jokes & fun facts\n\nOr connect me to the **Anthropic Claude API** for unlimited intelligent conversations!`,
    `I'd love to help with that! For more complex queries, consider connecting me to the **Claude API** by setting your API key in the config.\n\nIn the meantime, I'm great at answering questions about coding, writing, career advice, and more. What else can I help with?`,
    `Great question! I'm currently in **demo mode** with predefined responses. For full AI capabilities, update \`CONFIG.API_KEY\` in the script.js file.\n\nIs there something specific I can help you with right now?`
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}


/* ══════════════════════════════════════════════════════════
   💬  SEND MESSAGE FLOW
══════════════════════════════════════════════════════════ */

/**
 * Main function to send a user message and get a bot reply
 * @param {string} text - The message to send
 */
async function sendMessage(text) {
  text = text.trim();
  if (!text || appState.isTyping) return;

  // Ensure there's an active session
  if (!appState.activeSessionId) {
    createNewSession();
    renderHistory();
  }

  const session = getActiveSession();

  // Hide welcome screen, show messages
  DOM.welcomeScreen().style.display = "none";
  DOM.messagesList().style.display = "flex";

  // Save and render user message
  const userMsg = addMessageToSession("user", text);
  const userEl = createMessageElement(userMsg);
  DOM.messagesList().appendChild(userEl);
  scrollToBottom();
  renderHistory(); // Update sidebar title

  // Clear input
  const input = DOM.chatInput();
  input.value = "";
  input.style.height = "auto";
  updateSendBtn();

  // Show typing indicator
  appState.isTyping = true;
  updateStatus("typing...");
  const typingEl = createTypingIndicator();
  DOM.messagesList().appendChild(typingEl);
  scrollToBottom();

  // Simulate realistic typing delay (or wait for API)
  const minDelay = new Promise(r => setTimeout(r, CONFIG.TYPING_MIN_DELAY));

  try {
    const [botText] = await Promise.all([
      getBotResponse(text, session.messages.slice(0, -1)), // exclude the just-added user msg
      minDelay,
    ]);

    // Remove typing indicator
    typingEl.remove();

    // Save and render bot message
    const botMsg = addMessageToSession("bot", botText);
    const botEl = createMessageElement(botMsg);
    DOM.messagesList().appendChild(botEl);
    scrollToBottom();
    renderHistory();

  } catch (error) {
    console.error("Error getting bot response:", error);
    typingEl.remove();

    const errorText = `Sorry, I encountered an error: **${error.message}**\n\nPlease check your API key configuration or try again.`;
    const errMsg = addMessageToSession("bot", errorText);
    const errEl = createMessageElement(errMsg);
    DOM.messagesList().appendChild(errEl);
    scrollToBottom();
    showToast("Error getting response", "error");
  } finally {
    appState.isTyping = false;
    updateStatus("Online · Ready to help");
  }
}


/* ══════════════════════════════════════════════════════════
   🎤  VOICE INPUT (Web Speech API)
══════════════════════════════════════════════════════════ */
function initVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    DOM.voiceBtn().title = "Voice input not supported in this browser";
    DOM.voiceBtn().style.opacity = "0.4";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  appState.recognition = recognition;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    DOM.chatInput().value = transcript;
    DOM.chatInput().dispatchEvent(new Event('input'));
    stopVoice();
    showToast("Voice captured! 🎤", "success");
  };

  recognition.onerror = (e) => {
    stopVoice();
    if (e.error !== 'aborted') showToast("Voice error: " + e.error, "error");
  };

  recognition.onend = () => stopVoice();
}

function startVoice() {
  if (!appState.recognition) return;
  appState.voiceMode = true;
  DOM.voiceBtn().classList.add('recording');
  appState.recognition.start();
  showToast("Listening... 🎤");
}

function stopVoice() {
  appState.voiceMode = false;
  DOM.voiceBtn().classList.remove('recording');
  if (appState.recognition) {
    try { appState.recognition.stop(); } catch(e) {}
  }
}


/* ══════════════════════════════════════════════════════════
   🔧  UI HELPERS
══════════════════════════════════════════════════════════ */

/** Load a chat session and render it */
function loadSession(sessionId) {
  appState.activeSessionId = sessionId;
  saveToStorage();
  renderHistory();
  renderMessages();
}

/** Scroll messages container to bottom */
function scrollToBottom(smooth = true) {
  const container = DOM.messagesContainer();
  container.scrollTo({
    top: container.scrollHeight,
    behavior: smooth ? 'smooth' : 'instant',
  });
}

/** Update the send button state */
function updateSendBtn() {
  const val = DOM.chatInput().value.trim();
  const btn = DOM.sendBtn();
  if (val.length > 0) {
    btn.classList.add('active');
    btn.disabled = false;
  } else {
    btn.classList.remove('active');
    btn.disabled = true;
  }
}

/** Update header status text */
function updateStatus(text) {
  DOM.headerStatus().textContent = text;
}

/** Auto-resize textarea height */
function autoResizeInput() {
  const el = DOM.chatInput();
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

/** Toggle sidebar on mobile */
function openSidebar() {
  DOM.sidebar().classList.add('open');
  DOM.sidebarOverlay().classList.add('show');
}
function closeSidebar() {
  DOM.sidebar().classList.remove('open');
  DOM.sidebarOverlay().classList.remove('show');
}

/** Toggle light/dark theme */
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  updateThemeIcon();
  saveToStorage();
}
function updateThemeIcon() {
  const btn = DOM.themeToggleBtn();
  const isLight = document.body.classList.contains('light-theme');
  btn.innerHTML = isLight
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

/** Show a toast notification */
function showToast(message, type = "") {
  const toast = DOM.toast();
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/** Show confirmation modal */
function showModal(title, desc, onConfirm) {
  DOM.modalTitle().textContent = title;
  DOM.modalDesc().textContent = desc;
  DOM.modalOverlay().classList.add('show');
  // Assign confirm handler
  DOM.modalConfirm().onclick = () => {
    hideModal();
    onConfirm();
  };
}
function hideModal() {
  DOM.modalOverlay().classList.remove('show');
}

/** Switch between landing and chat screens */
function showChatApp() {
  DOM.landing().style.display = "none";
  DOM.chatApp().classList.remove('hidden');
  feather.replace(); // re-init icons in chat app
}
function showLanding() {
  DOM.chatApp().classList.add('hidden');
  DOM.landing().style.display = "flex";
}


/* ══════════════════════════════════════════════════════════
   🔤  TEXT FORMATTERS
══════════════════════════════════════════════════════════ */

/** Escape HTML special characters to prevent XSS */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Format message content — converts basic markdown to HTML.
 * Supports: **bold**, `code`, ```blocks```, line breaks
 */
function formatMessage(text) {
  let escaped = escapeHtml(text);

  // Code blocks (```...```)
  escaped = escaped.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Inline code
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  escaped = escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert double newlines to paragraphs
  const paragraphs = escaped.split(/\n\n+/);
  if (paragraphs.length > 1) {
    escaped = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
  } else {
    escaped = escaped.replace(/\n/g, '<br/>');
  }

  return escaped;
}

/** Format ISO timestamp to readable time */
function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Format ISO timestamp to readable date */
function formatDate(isoString) {
  const d = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}


/* ══════════════════════════════════════════════════════════
   🚀  INITIALIZATION — EVENT LISTENERS
══════════════════════════════════════════════════════════ */
function initEventListeners() {

  // ── LANDING ──────────────────────────────────────────────
  DOM.startChatBtn().addEventListener('click', () => {
    showChatApp();
    // Create a new session if none exist
    if (appState.sessions.length === 0 || !appState.activeSessionId) {
      createNewSession();
    }
    renderHistory();
    renderMessages();
  });

  // ── SIDEBAR ──────────────────────────────────────────────
  DOM.newChatBtn().addEventListener('click', () => {
    createNewSession();
    renderHistory();
    renderMessages();
    closeSidebar();
  });

  DOM.clearAllBtn().addEventListener('click', () => {
    showModal(
      "Clear all chats?",
      "All your conversations will be permanently deleted.",
      () => {
        appState.sessions = [];
        appState.activeSessionId = null;
        saveToStorage();
        renderHistory();
        renderMessages();
        showToast("All chats cleared", "success");
      }
    );
  });

  DOM.backToLandingBtn().addEventListener('click', () => {
    showLanding();
    closeSidebar();
  });

  // ── HEADER ───────────────────────────────────────────────
  DOM.hamburgerBtn().addEventListener('click', openSidebar);
  DOM.sidebarOverlay().addEventListener('click', closeSidebar);

  DOM.clearChatBtn().addEventListener('click', () => {
    const session = getActiveSession();
    if (!session || session.messages.length === 0) {
      showToast("Chat is already empty");
      return;
    }
    showModal(
      "Clear this chat?",
      "Messages in the current session will be removed.",
      () => {
        clearCurrentSession();
        renderMessages();
        renderHistory();
        showToast("Chat cleared", "success");
      }
    );
  });

  DOM.themeToggleBtn().addEventListener('click', toggleTheme);

  // ── INPUT ─────────────────────────────────────────────────
  DOM.chatInput().addEventListener('input', () => {
    autoResizeInput();
    updateSendBtn();
  });

  // Enter to send (Shift+Enter for new line)
  DOM.chatInput().addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = DOM.chatInput().value.trim();
      if (text && !appState.isTyping) sendMessage(text);
    }
  });

  DOM.sendBtn().addEventListener('click', () => {
    const text = DOM.chatInput().value.trim();
    if (text && !appState.isTyping) sendMessage(text);
  });

  // ── VOICE ─────────────────────────────────────────────────
  DOM.voiceBtn().addEventListener('click', () => {
    if (appState.voiceMode) {
      stopVoice();
    } else {
      startVoice();
    }
  });

  // ── SUGGESTION CHIPS ─────────────────────────────────────
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.text;
      if (text && !appState.isTyping) sendMessage(text);
    });
  });

  // ── MODAL ─────────────────────────────────────────────────
  DOM.modalCancel().addEventListener('click', hideModal);
  DOM.modalOverlay().addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay()) hideModal();
  });
}


/* ══════════════════════════════════════════════════════════
   🚀  APP ENTRY POINT
══════════════════════════════════════════════════════════ */
function init() {
  // Initialize Feather icons
  feather.replace();

  // Load saved data
  loadFromStorage();

  // Set up all event listeners
  initEventListeners();

  // Initialize voice recognition
  initVoiceInput();

  // Update theme icon on load
  updateThemeIcon();

  // If user has sessions, offer to resume (optional: auto-open chat)
  // For now, always show landing first.
  console.log("🤖 AI Assistant Chatbot initialized!");
  console.log(`📦 ${appState.sessions.length} session(s) loaded from storage.`);
  console.log(`🔌 API mode: ${CONFIG.USE_API && CONFIG.API_KEY ? 'Anthropic Claude' : 'Predefined responses'}`);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
