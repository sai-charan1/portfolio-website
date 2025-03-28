'use client';
import { useState, useRef, useEffect } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function PortfolioChatbot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsExpanded(!isExpanded);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isThinking) return;

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userInput }
          ]
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const botResponse = await response.json();
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: botResponse.content,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting. Please try again shortly.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [chatHistory]);

  const suggestedQuestions = [
    'What projects have you worked on?',
    'Tell me about your education background',
    'What technical skills do you have?'
  ];

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${isExpanded ? 'w-80' : 'w-14'}`}>
      {isExpanded ? (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl border border-indigo-100 overflow-hidden flex flex-col h-[480px]">
          {/* Chat header */}
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <h2 className="font-bold text-lg">My Portfolio Assistant</h2>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-indigo-700 transition-colors">
              ✖
            </button>
          </div>

          {/* Chat messages area */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-600 mt-8">
                <h3 className="text-lg font-medium">Ask me about my work</h3>
                <div className="space-y-2 mt-4">
                  {suggestedQuestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => setUserInput(question)}
                      className="text-sm bg-white border border-indigo-200 rounded-lg px-3 py-2 hover:bg-indigo-50 transition-colors w-full text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={!userInput || isThinking}
                className="bg-indigo-600 text-white px-4 rounded-lg disabled:bg-gray-400 hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors animate-bounce"
        >
          💬
        </button>
      )}
    </div>
  );
}
