import { useState, useRef, useEffect } from "react";
import "./Chatbox.css";

const QUICK_PROMPTS = [
  { icon: "💊", text: "Is Amoxicillin 500mg fairly priced?" },
  { icon: "📍", text: "Find Jan Aushadhi stores near me" },
  { icon: "⚠️", text: "How do I report overpricing?" },
  { icon: "💰", text: "What is the NPPA ceiling price for Metformin?" },
  { icon: "🔄", text: "Suggest cheaper alternatives to Azithromycin" },
];

const SYSTEM_PROMPT = `You are SafeMeds AI, an intelligent pharmaceutical price transparency assistant for India. Your role is to:

1. Help users check and understand NPPA (National Pharmaceutical Pricing Authority) government ceiling prices for medicines
2. Identify potential overpricing by comparing retail prices with official ceiling prices
3. Guide users on how to report overpricing through SafeMeds
4. Suggest cheaper generic alternatives to branded medicines
5. Provide information about Jan Aushadhi stores and government schemes
6. Explain consumer rights under DPCO (Drug Price Control Order)
7. Help locate nearby medical stores

Key medicine prices you know (NPPA ceiling prices):
- Paracetamol 500mg: ₹14.30/strip of 10
- Amoxicillin 500mg: ₹48.50/strip of 10
- Metformin 500mg: ₹22.10/strip of 20
- Azithromycin 250mg: ₹36.80/strip of 6
- Ciprofloxacin 500mg: ₹42.00/strip of 10
- Atorvastatin 10mg: ₹31.00/strip of 15
- Amlodipine 5mg: ₹27.60/strip of 10
- Omeprazole 20mg: ₹19.50/strip of 10

Always:
- Be clear and concise
- Use ₹ symbol for prices
- Mention the NPPA ceiling price when discussing medicine prices
- If overpriced, clearly state how much above the ceiling price
- Always end with a relevant actionable tip
- Add a medical disclaimer when giving health-related advice
- Never diagnose conditions or prescribe medicines
- Be empathetic and helpful in tone

Format your responses clearly with line breaks for readability.`;

function TypingIndicator() {
  return (
    <div className="msg-row">
      <div className="msg-avatar ai">AI</div>
      <div className="msg-bubble ai">
        <div className="typing">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className={`msg-row ${isUser ? "user" : ""}`}>
      <div className={`msg-avatar ${isUser ? "user" : "ai"}`}>{isUser ? "U" : "AI"}</div>
      <div>
        <div className={`msg-bubble ${isUser ? "user" : "ai"}`}>
          {msg.content.split("\n").map((line, i) => (
            <span key={i}>{line}{i < msg.content.split("\n").length - 1 && <br />}</span>
          ))}
        </div>
        <div className={`msg-time ${isUser ? "right" : ""}`}>{time}</div>
      </div>
    </div>
  );
}

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm SafeMeds AI 👋\n\nI can help you:\n• Check medicine prices against NPPA ceiling prices\n• Find cheaper generic alternatives\n• Locate nearby Jan Aushadhi stores\n• Guide you through reporting overpricing\n\nWhat would you like to know?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Welcome", time: "Just now", active: true },
  ]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleInput = (e) => {
    setInput(e.target.value);
    // Auto resize textarea
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 120) + "px"; }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg = { id: Date.now(), role: "user", content, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
    setLoading(true);

    // Update chat history title from first user message
    setChatHistory((prev) =>
      prev.map((h) => h.active && h.title === "Welcome" ? { ...h, title: content.slice(0, 40) } : h)
    );

    try {
      const conversationMessages = [...messages, userMsg]
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationMessages,
        }),
      });

      const data = await response.json();
      const aiText = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: aiText,
        timestamp: Date.now(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm having trouble connecting right now. Please check your connection and try again.",
        timestamp: Date.now(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    const newId = Date.now();
    setChatHistory((prev) => [
      { id: newId, title: "New Chat", time: "Just now", active: true },
      ...prev.map((h) => ({ ...h, active: false })),
    ]);
    setMessages([{
      id: newId,
      role: "assistant",
      content: "Hi! I'm SafeMeds AI 👋\n\nI can help you:\n• Check medicine prices against NPPA ceiling prices\n• Find cheaper generic alternatives\n• Locate nearby Jan Aushadhi stores\n• Guide you through reporting overpricing\n\nWhat would you like to know?",
      timestamp: Date.now(),
    }]);
  };

  const showWelcome = messages.length === 1 && messages[0].role === "assistant";

  return (
    <main className="chatbox-page">
      <div className="chat-layout">

        {/* ── SIDEBAR ── */}
        <aside className="chat-sidebar">
          <div className="sidebar-top">
            <h3>Chat History</h3>
            <button className="new-chat-btn" onClick={startNewChat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Chat
            </button>
          </div>

          <div className="chat-history-list">
            {chatHistory.map((h) => (
              <div key={h.id} className={`hist-item ${h.active ? "active" : ""}`}>
                <div className="hist-title">{h.title}</div>
                <div className="hist-time">{h.time}</div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer" style={{display:"none"}} />
        </aside>

        {/* ── MAIN CHAT ── */}
        <div className="chat-main">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div>
                <div className="ai-name">SafeMeds AI</div>
                <div className="ai-status">
                  <div className="status-dot" />
                  {loading ? "Thinking..." : "Online"}
                </div>
              </div>
            </div>
            <div className="chat-header-right">
              <button className="icon-btn" title="Clear chat" onClick={startNewChat}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="disclaimer-banner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <p>⚕ SafeMeds AI gives informational guidance only. Always consult a licensed doctor for medical advice.</p>
          </div>

          {/* Messages */}
          <div className="messages-area">
            {showWelcome ? (
              <div className="welcome-state">
                <div className="welcome-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h2>SafeMeds AI Assistant</h2>
                <p>Ask me about medicine prices, consumer rights, overpricing reports, or cheaper alternatives.</p>

                <div className="quick-prompts">
                  <div className="qp-label">Try asking</div>
                  {QUICK_PROMPTS.map((qp) => (
                    <button key={qp.text} className="quick-prompt" onClick={() => sendMessage(qp.text)}>
                      <span className="qp-icon">{qp.icon}</span>
                      {qp.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => <Message key={msg.id} msg={msg} />)}
                {loading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="input-wrap">
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                placeholder="Ask about medicine prices, alternatives, or how to report..."
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                className={`send-btn ${(!input.trim() || loading) ? "disabled" : ""}`}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="input-footer">
              <p>SafeMeds AI · Powered by NPPA data · Not a substitute for medical advice</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}