import React from 'react';
import {
  Brain,
  PuzzleIcon,
  School,
  TrendingUp,
  BookOpen,
  Bell,
  Award,
  Target,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { profile } = useAuth();

  const quickActions = [
    {
      id: 'aichat',
      icon: Brain,
      title: 'AI Career Counselor',
      description: 'Chat with AI for personalized guidance',
      gradient: 'from-orange-400 to-red-400',
      status: 'available',
    },
    {
      id: 'aptitude',
      icon: PuzzleIcon,
      title: 'Aptitude Quiz',
      description: 'Get personalized recommendations',
      gradient: 'from-pink-400 to-rose-400',
      status: 'available',
    },
    {
      id: 'colleges',
      icon: School,
      title: 'Explore Colleges',
      description: 'Find your perfect college match',
      gradient: 'from-purple-400 to-indigo-400',
      status: 'available',
    },
    {
      id: 'career',
      icon: TrendingUp,
      title: 'Career Roadmap',
      description: 'Plan your career journey',
      gradient: 'from-blue-400 to-cyan-400',
      status: 'available',
    },
  ];

  const upcomingEvents = [
    { title: 'JEE Main Registration', date: 'Nov 15, 2024', daysLeft: 5, type: 'exam' },
    { title: 'NEET Application Deadline', date: 'Nov 20, 2024', daysLeft: 10, type: 'exam' },
    { title: 'Scholarship Portal Opens', date: 'Nov 25, 2024', daysLeft: 15, type: 'scholarship' },
  ];

  const recommendedCourses = profile?.grade_level === '10th'
    ? [
        { name: 'Science (PCM)', match: 95, description: 'For Engineering & Tech' },
        { name: 'Science (PCB)', match: 88, description: 'For Medical & Bio' },
        { name: 'Commerce', match: 82, description: 'For Business & Finance' },
      ]
    : [
        { name: 'Computer Science', match: 96, description: 'B.Tech / B.Sc' },
        { name: 'Mechanical Engineering', match: 90, description: 'B.Tech' },
        { name: 'Medicine (MBBS)', match: 85, description: 'Medical Field' },
      ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome back, <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">{profile?.full_name || 'Student'}!</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Let's continue your career journey today
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 px-6 py-3 rounded-2xl border-2 border-orange-300">
              <p className="text-sm text-gray-600 font-semibold">Your Grade</p>
              <p className="text-2xl font-bold text-orange-600">Class {profile?.grade_level || '10th/12th'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Target size={32} />
                <span className="text-3xl font-bold">0%</span>
              </div>
              <h3 className="text-lg font-bold">Profile Complete</h3>
              <p className="text-sm opacity-90">Complete tests to get personalized guidance</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Award size={32} />
                <span className="text-3xl font-bold">0</span>
              </div>
              <h3 className="text-lg font-bold">Tests Completed</h3>
              <p className="text-sm opacity-90">Take personality & aptitude tests</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <School size={32} />
                <span className="text-3xl font-bold">0</span>
              </div>
              <h3 className="text-lg font-bold">Colleges Saved</h3>
              <p className="text-sm opacity-90">Explore and save your favorites</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
                <span className="text-sm text-gray-500">{profile?.grade_level} Student</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onNavigate(action.id)}
                      className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all text-left"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                      <div className="flex items-center text-orange-600 font-semibold text-sm">
                        <span>Start Now</span>
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Recommended for You
              </h2>
              <div className="space-y-4">
                {recommendedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4 border-2 border-teal-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">{course.match}%</div>
                        <p className="text-xs text-gray-600">Match</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="text-orange-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">{event.title}</h3>
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-bold">
                        {event.daysLeft}d
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('timeline')}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                View All Events
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen size={24} />
                <h2 className="text-xl font-bold">Study Materials</h2>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Access quality eBooks and learning resources tailored for your career path
              </p>
              <button
                onClick={() => onNavigate('ebooks')}
                className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse eBooks
              </button>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 border-2 border-pink-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Need Help?</h3>
                  <p className="text-sm text-gray-600">Chat with our AI assistant</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                Get instant answers about careers, colleges, and exams from our AI-powered chatbot
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
