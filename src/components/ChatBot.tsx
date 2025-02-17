import { useState } from 'react';
import { Home, Search, MessageCircle, TicketCheck, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How does vBot work?",
    answer: "vBot uses AI to understand and answer your questions instantly."
  },
  {
    question: "What happens if vBot can't answer a question?",
    answer: "If vBot can't answer, you'll be connected to a human support agent."
  },
  {
    question: "Does vBot support multiple languages?",
    answer: "Yes, vBot supports multiple languages including English, Spanish, and French."
  },
  {
    question: "Can I customize vBot for my business?",
    answer: "Yes, vBot can be customized to match your brand and specific needs."
  }
];

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! What can I help you with?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'll help you with that! What specific information do you need?",
        isBot: true,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">U</span>
        </div>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">U</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-1">What can I help with?</h1>
          <p className="text-gray-500">Your AI-Powered Support Assistant</p>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] p-4 rounded-2xl",
                message.isBot
                  ? "bg-indigo-600 text-white ml-0"
                  : "bg-gray-200 text-gray-900 ml-auto"
              )}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Search for Help?</h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search your Query"
              className="w-full p-3 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <button
                key={index}
                className="w-full p-3 flex justify-between items-center text-left hover:bg-gray-100 rounded-lg"
              >
                <span>{faq.question}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2 p-2 border rounded-full bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Start chatting"
            className="flex-1 px-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="p-2 text-indigo-600 hover:text-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center text-indigo-600">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Chats</span>
          </Link>
          <Link to="/tickets" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <TicketCheck className="w-6 h-6" />
            <span className="text-xs mt-1">Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}