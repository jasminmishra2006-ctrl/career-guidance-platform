import React from 'react';
import {
  Brain,
  PuzzleIcon,
  School,
  TrendingUp,
  RefreshCw,
  BookOpen,
  Bell,
  MessageCircle,
} from 'lucide-react';

interface FeatureCardsProps {
  onNavigate: (section: string) => void;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'aichat',
      icon: MessageCircle,
      title: 'AI Career Counselor',
      description:
        'Chat with our intelligent AI assistant for personalized career guidance',
      gradient: 'from-orange-400 to-red-400',
      bgGradient: 'from-orange-50 to-red-50',
    },
    {
      id: 'aptitude',
      icon: PuzzleIcon,
      title: 'Aptitude & Interest Quiz',
      description: 'Get personalized stream & course recommendations with AI predictions',
      gradient: 'from-pink-400 to-rose-400',
      bgGradient: 'from-pink-50 to-rose-50',
    },
    {
      id: 'colleges',
      icon: School,
      title: 'College Directory',
      description:
        'Explore government colleges with programs, eligibility & scholarships',
      gradient: 'from-purple-400 to-indigo-400',
      bgGradient: 'from-purple-50 to-indigo-50',
    },
    {
      id: 'career',
      icon: TrendingUp,
      title: 'Career Mapping',
      description: 'See jobs, entrance exams & higher studies for each degree',
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      id: 'roadmap',
      icon: RefreshCw,
      title: 'Dynamic Roadmap',
      description: 'Adapts automatically when your interests change',
      gradient: 'from-teal-400 to-emerald-400',
      bgGradient: 'from-teal-50 to-emerald-50',
    },
    {
      id: 'ebooks',
      icon: BookOpen,
      title: 'eBooks Marketplace',
      description: 'Purchase quality study materials for your preparation',
      gradient: 'from-green-400 to-lime-400',
      bgGradient: 'from-green-50 to-lime-50',
    },
    {
      id: 'timeline',
      icon: Bell,
      title: 'Timeline Tracker',
      description: 'Never miss admission, scholarship & exam deadlines',
      gradient: 'from-yellow-400 to-amber-400',
      bgGradient: 'from-yellow-50 to-amber-50',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Everything You Need to{' '}
          <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Succeed
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Comprehensive tools and resources designed to guide you at every step
          of your career journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={() => onNavigate(feature.id)}
              className="group cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCards;
