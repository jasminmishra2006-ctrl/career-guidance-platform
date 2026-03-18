import React from 'react';
import { Sparkles, ArrowRight, Users, Award, CheckCircle } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Sparkles className="text-yellow-500" size={20} />
            <span className="text-sm font-semibold text-gray-700">
              For Class 10 & 12 Students
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-teal-600 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-gray-800">Perfect Career Path</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            Get personalized career guidance from our AI assistant. Take aptitude
            tests, explore colleges, and receive expert recommendations tailored
            to your strengths and interests!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:border-orange-500 hover:text-orange-500 transition-all">
              Explore Features
            </button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-orange-600">50K+</p>
              <p className="text-sm text-gray-600">Students Guided</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-pink-600">500+</p>
              <p className="text-sm text-gray-600">Colleges Listed</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-teal-600">95%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={32} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Your Career Advisor</p>
                  <p className="text-lg font-bold text-gray-800">AI Assistant</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  "Hi! I'm here to guide you through your career journey. Let's
                  start by understanding your interests!"
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online & Ready to Help</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4 border-2 border-teal-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">Personality Analysis</p>
                    <p className="text-xs text-gray-600">Discover your strengths</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-teal-600">100%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">Aptitude Test</p>
                    <p className="text-xs text-gray-600">Get AI predictions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-pink-600">Ready</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 opacity-60">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">College Match</p>
                    <p className="text-xs text-gray-600">Find perfect fit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500">Locked</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-4 border-2 border-orange-300">
                <p className="text-sm font-bold text-gray-800 mb-2">
                  Start your personalized journey today!
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Progress: 0/3 completed</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
