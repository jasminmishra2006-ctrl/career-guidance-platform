import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AIChatProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat: React.FC<AIChatProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${profile?.full_name || 'there'}! I'm your AI Career Counselor. I can help you with career advice, college selection, entrance exams, study tips, and answer any questions about your future. What would you like to know today?`,
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

  const quickQuestions = [
    'What career is best for me?',
    'Which stream should I choose?',
    'Tell me about engineering colleges',
    'How to prepare for JEE/NEET?',
    'What are the career options in Science?',
    'Explain Commerce stream career paths',
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('career') && lowerMessage.includes('best')) {
      return `To find the best career for you, I recommend:\n\n1. **Take the Aptitude Quiz** - This will analyze your interests in different subjects and predict the most suitable stream/field for you.\n\n2. **Consider Your Strengths** - Are you good at mathematics, sciences, creative subjects, or business?\n\n3. **Think Long-term** - Choose a field with growth opportunities and job stability.\n\nWould you like to take the Aptitude Quiz now? It only takes 5 minutes and provides personalized recommendations based on ${profile?.grade_level === '10th' ? 'which stream to choose (Science, Commerce, Arts)' : 'which field to pursue (Engineering, Medical, General Degree)'}.`;
    } else if (lowerMessage.includes('stream') && lowerMessage.includes('choose')) {
      return `Great question! After Class 10, you have several stream options:\n\n**Science (PCM)** - For Engineering, Technology, Architecture\n- Best if you love Math, Physics, and problem-solving\n- Career options: Engineer, Architect, Data Scientist, Pilot\n\n**Science (PCB)** - For Medical, Life Sciences\n- Best if you're interested in Biology and healthcare\n- Career options: Doctor, Dentist, Pharmacist, Biotechnologist\n\n**Commerce** - For Business, Finance, Law\n- Best if you enjoy business, economics, accounting\n- Career options: CA, MBA, Banking, Entrepreneur\n\n**Arts/Humanities** - For Creative and Social fields\n- Best if you love literature, history, psychology\n- Career options: Lawyer, Teacher, Civil Servant, Journalist\n\nTake our Aptitude Quiz to get a personalized recommendation!`;
    } else if (lowerMessage.includes('engineering') && lowerMessage.includes('college')) {
      return `India has excellent government engineering colleges:\n\n**Top Tier:**\n- IIT Delhi, IIT Bombay, IIT Madras\n- NIT Trichy, NIT Surathkal, NIT Warangal\n- IIIT Hyderabad, BITS Pilani\n\n**Entrance Exams:**\n- JEE Main (for NITs, IIITs)\n- JEE Advanced (for IITs)\n- State Engineering Entrance Exams\n\n**Popular Branches:**\n- Computer Science (highest placements)\n- Mechanical Engineering\n- Electrical Engineering\n- Civil Engineering\n\nWant to explore our College Directory for detailed information about fees, placements, and eligibility?`;
    } else if (lowerMessage.includes('jee') || lowerMessage.includes('neet')) {
      const exam = lowerMessage.includes('jee') ? 'JEE' : 'NEET';
      return `Here's how to prepare for ${exam}:\n\n**Study Strategy:**\n1. **Cover NCERT thoroughly** - Foundation is key\n2. **Practice previous years' papers** - Understand the pattern\n3. **Take mock tests regularly** - Build speed and accuracy\n4. **Focus on weak topics** - Analyze and improve\n\n**Time Management:**\n- Study 6-8 hours daily consistently\n- Divide time: 40% concepts, 30% problems, 30% revision\n- Take breaks to avoid burnout\n\n**Recommended Resources:**\n- Check our eBooks Marketplace for preparation materials\n- Join online test series\n- Follow the Timeline Tracker for exam updates\n\n**Key Dates:**\n- ${exam} registration usually opens in January\n- Exam conducted in April-May\n- Results in June\n\nNeed specific subject guidance? Just ask!`;
    } else if (lowerMessage.includes('science') && lowerMessage.includes('career')) {
      return `Science stream opens doors to diverse careers:\n\n**Engineering & Technology:**\n- Software Engineer (₹6-20 LPA)\n- Data Scientist (₹8-25 LPA)\n- Mechanical Engineer (₹5-15 LPA)\n- Civil Engineer (₹4-12 LPA)\n\n**Medical & Healthcare:**\n- Doctor/MBBS (₹6-40 LPA)\n- Dentist (₹5-20 LPA)\n- Pharmacist (₹3-10 LPA)\n- Medical Researcher (₹5-15 LPA)\n\n**Pure Sciences:**\n- Research Scientist (₹5-15 LPA)\n- Professor/Lecturer (₹6-12 LPA)\n- Data Analyst (₹4-12 LPA)\n\n**Other Options:**\n- Pilot (₹8-50 LPA)\n- Architect (₹4-15 LPA)\n- Biotechnologist (₹4-12 LPA)\n\nWhich field interests you most? I can provide more specific guidance!`;
    } else if (lowerMessage.includes('commerce') && lowerMessage.includes('career')) {
      return `Commerce stream offers excellent career opportunities:\n\n**Top Career Paths:**\n\n**1. Chartered Accountant (CA)**\n- Salary: ₹7-25 LPA\n- Duration: 3-5 years\n- Highly respected profession\n\n**2. Company Secretary (CS)**\n- Salary: ₹6-20 LPA\n- Corporate governance expert\n\n**3. MBA/Management**\n- Salary: ₹8-30 LPA (from top B-schools)\n- Leadership roles in companies\n\n**4. Banking & Finance**\n- Investment Banker (₹10-30 LPA)\n- Financial Analyst (₹5-15 LPA)\n\n**5. Entrepreneurship**\n- Start your own business\n- Unlimited earning potential\n\n**6. Law (After graduation)**\n- Corporate Lawyer (₹8-25 LPA)\n- Combines commerce + legal expertise\n\nInterested in any specific field? I can guide you further!`;
    } else if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial')) {
      return `Several scholarships are available for students:\n\n**Government Scholarships:**\n- National Scholarship Portal (for SC/ST/OBC)\n- Merit-cum-Means Scholarship\n- State Government Scholarships\n- PM Scholarship for Central Armed Police Forces\n\n**College-specific:**\n- IIT Fee Waiver (family income < ₹5 lakhs)\n- NIT Scholarships\n- University merit scholarships\n\n**Private Scholarships:**\n- Inspire Scholarship (for science students)\n- Sitaram Jindal Foundation\n- Various corporate scholarships\n\n**How to Apply:**\n1. Register on National Scholarship Portal\n2. Submit income certificate\n3. Upload academic documents\n4. Track application status\n\nCheck our Timeline Tracker for scholarship deadlines!`;
    } else if (lowerMessage.includes('10th') || lowerMessage.includes('class 10')) {
      return `As a Class 10 student, here's your roadmap:\n\n**Immediate Steps:**\n1. **Take our Aptitude Quiz** - Discover which stream suits you best\n2. **Research streams** - Science, Commerce, or Arts\n3. **Set goals** - Which careers interest you?\n\n**Stream Selection Tips:**\n- Choose based on interest, not just marks\n- Consider long-term career goals\n- Talk to professionals in fields you like\n- Don't follow others blindly\n\n**After 10th:**\n- Focus on 11th-12th preparation\n- Start entrance exam preparation early\n- Maintain good grades for college admissions\n- Participate in extracurricular activities\n\nWant personalized guidance? Take the Aptitude Quiz!`;
    } else if (lowerMessage.includes('12th') || lowerMessage.includes('class 12')) {
      return `As a Class 12 student, here's your action plan:\n\n**Priority Tasks:**\n1. **Take Aptitude Quiz** - Get AI-predicted career path (Engineering/Medical/General)\n2. **Prepare for entrance exams** - JEE/NEET/CUET based on your field\n3. **Research colleges** - Explore our College Directory\n4. **Track deadlines** - Use Timeline Tracker for applications\n\n**Career Paths:**\n- **Engineering** - B.Tech in CS, Mechanical, Electrical, etc.\n- **Medical** - MBBS, BDS, BAMS, B.Pharm, Nursing\n- **General Degree** - B.Sc, B.A, B.Com, BCA\n\n**Important Dates:**\n- Board Exams: Feb-March\n- JEE Main: April-May\n- NEET: May\n- College Admissions: June-July\n\nNeed help with college selection or career planning?`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! 👋 I'm your AI Career Counselor. I'm here to help you with:\n\n✅ Career guidance and planning\n✅ Stream/field selection\n✅ College recommendations\n✅ Entrance exam preparation tips\n✅ Scholarship information\n✅ Study strategies\n✅ Career opportunities and salaries\n\nWhat would you like to know? Feel free to ask anything about your future career!`;
    } else if (lowerMessage.includes('thank')) {
      return `You're welcome! 😊 I'm always here to help. Remember:\n\n- Take the Aptitude Quiz for personalized recommendations\n- Explore our College Directory\n- Check Timeline Tracker for important deadlines\n- Browse eBooks for study materials\n\nFeel free to ask more questions anytime. Best of luck with your career journey! 🎓`;
    } else {
      return `That's an interesting question! Here's what I can help you with:\n\n📚 **Career Guidance**\n- Which stream/field to choose\n- Career options and opportunities\n- Salary expectations\n\n🎓 **College Information**\n- Top colleges for your field\n- Entrance exams and preparation\n- Eligibility and admission process\n\n💡 **Personalized Help**\n- Take our Aptitude Quiz for AI-powered predictions\n- Get subject-wise study tips\n- Track admission and exam deadlines\n\nCould you please be more specific about what you'd like to know? For example:\n- "What career is best for me?"\n- "Tell me about engineering colleges"\n- "How to prepare for JEE/NEET?"`;
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
        text: getAIResponse(inputMessage),
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
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-orange-600" size={32} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>AI Career Counselor</span>
                  <Sparkles className="text-yellow-300" size={20} />
                </h2>
                <p className="text-white/90 text-sm">
                  Ask me anything about careers, colleges, and your future!
                </p>
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-400 to-green-400'
                        : 'bg-gradient-to-r from-orange-400 to-pink-400'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="text-white" size={20} />
                    ) : (
                      <Bot className="text-white" size={20} />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
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
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-orange-400 to-pink-400">
                    <Bot className="text-white" size={20} />
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {messages.length <= 2 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-semibold">
                Quick Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-white hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300 text-gray-700 px-3 py-2 rounded-lg transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:border-orange-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="text-white" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
