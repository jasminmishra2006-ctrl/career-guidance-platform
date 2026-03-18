import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your CareerPath assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'How do I choose a career?',
    'Tell me about scholarships',
    'What colleges are best for engineering?',
    'Help with aptitude test',
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('career') || lowerMessage.includes('choose')) {
      return 'To choose the right career, start by taking our Personality Test and Aptitude Quiz. These will help identify your strengths and interests. Then explore our College Directory and Career Mapping tools to see which paths align with your profile.';
    } else if (lowerMessage.includes('scholarship')) {
      return 'We have a comprehensive list of government scholarships available for students. Check our Timeline Tracker to never miss scholarship application deadlines. You can also filter colleges by scholarship availability in our College Directory.';
    } else if (lowerMessage.includes('engineering') || lowerMessage.includes('college')) {
      return 'For engineering, top government colleges include IITs, NITs, and state engineering colleges. Visit our College Directory to explore programs, fees, facilities, and eligibility criteria. Don\'t forget to check admission timelines in our Timeline Tracker!';
    } else if (lowerMessage.includes('aptitude') || lowerMessage.includes('test')) {
      return 'Our Aptitude Test is customized for Class 10th and 12th students. For 10th graders, it helps choose the right stream (Science, Commerce, or Arts). For 12th graders, it recommends college courses. Take the test from the main menu!';
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('jee') || lowerMessage.includes('neet')) {
      return 'We track all major entrance exams including JEE, NEET, CLAT, and more. Use our Timeline Tracker to set reminders for registration, exam dates, and result declarations. Check out our Study Resources for preparation materials!';
    } else if (lowerMessage.includes('ebook') || lowerMessage.includes('book') || lowerMessage.includes('study')) {
      return 'Visit our eBooks Marketplace for comprehensive study materials covering JEE, NEET, and other competitive exams. We have books for all subjects and streams, authored by experienced educators.';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return 'I\'m here to help you navigate your career journey! You can ask me about: choosing careers, finding colleges, scholarships, entrance exams, study resources, and more. What would you like to know?';
    } else {
      return 'That\'s a great question! For detailed information, I recommend exploring our platform features: Personality Test, Aptitude Quiz, College Directory, Career Mapping, Timeline Tracker, and Study Resources. Is there anything specific you\'d like to know about these features?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    if (user) {
      await supabase.from('chat_history').insert({
        user_id: user.id,
        message: inputMessage,
        sender: 'user',
      });
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      if (user) {
        supabase.from('chat_history').insert({
          user_id: user.id,
          message: botResponse.text,
          sender: 'bot',
        });
      }
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="text-white" size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-gray-200">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">CareerPath Assistant</h3>
                <p className="text-xs text-white opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-400 to-green-400'
                      : 'bg-gradient-to-r from-orange-400 to-pink-400'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="text-white" size={18} />
                  ) : (
                    <Bot className="text-white" size={18} />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-orange-400 to-pink-400">
                  <Bot className="text-white" size={18} />
                </div>
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors text-left"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="text-white" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
