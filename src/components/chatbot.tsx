"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Pixel, your friendly guide to Jalina Hirushan's portfolio. What can I help you find? ✨",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sendingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
  useEffect(() => () => abortRef.current?.abort(), []);
  const closeChat = () => { setIsOpen(false); toggleRef.current?.focus(); };

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    const container = messagesRef.current;
    container?.scrollTo({ top: container.scrollHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // Auto-scroll when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || sendingRef.current) return;
    sendingRef.current = true;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      clearTimeout(timeout);
      sendingRef.current = false;
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls="pixel-chat"
        onClick={() => isOpen ? closeChat() : setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-emerald-300/60 bg-emerald-300 p-4 text-black shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div id="pixel-chat" role="dialog" aria-labelledby="pixel-title" onKeyDown={e => { if (e.key === "Escape") closeChat(); }} className="fixed bottom-24 right-4 z-40 flex h-96 max-h-[calc(100dvh-7rem)] w-[min(22rem,calc(100vw-2rem))] flex-col rounded-2xl border border-emerald-400/20 bg-black/90 shadow-[0_30px_120px_-70px_rgba(16,185,129,0.6)] backdrop-blur-xl">
          {/* Header */}
          <div className="rounded-t-2xl border-b border-emerald-400/20 bg-emerald-500/10 p-4 text-slate-100">
            <h3 id="pixel-title" className="font-semibold text-emerald-200">Chat with Pixel</h3>
            <p className="text-sm text-slate-300">Ask me about Jalina.</p>
          </div>

          {/* Messages Container */}
          <div ref={messagesRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin scrollbar-track-black scrollbar-thumb-emerald-500/40">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg backdrop-blur-sm ${
                    message.isUser
                      ? "bg-emerald-300 font-semibold text-black shadow-lg shadow-emerald-500/30"
                      : "border border-white/10 bg-white/5 text-slate-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-slate-100 backdrop-blur-sm">
                  <span className="sr-only">Pixel is responding</span>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-emerald-300" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                aria-label="Message to Pixel"
                maxLength={2000}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Jalina..."
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-400/30"
                readOnly={isLoading}
              />
              <button
                aria-label="Send message"
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="rounded-lg bg-emerald-300 p-2 text-black transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
