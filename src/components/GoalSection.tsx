import React from 'react';
import { Target, TrendingDown, TrendingUp, Users, Award } from 'lucide-react';

const GoalSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-4 rounded-2xl">
              <Target className="text-white" size={40} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Mission</span>
          </h2>

          <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-12">
            Empowering students to make informed decisions about their future by
            providing personalized guidance and comprehensive information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-500 p-3 rounded-xl">
                  <TrendingDown className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Reduce Dropouts</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Help students choose the right path from the start, reducing
                dropout rates by ensuring they're in programs that match their
                interests and abilities.
              </p>
              <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm font-semibold text-gray-600">Target Reduction</span>
                <span className="text-2xl font-bold text-red-600">-40%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-teal-500 p-3 rounded-xl">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Increase Enrollment
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Boost informed enrollment in government colleges by showcasing
                opportunities, scholarships, and career prospects available to
                students.
              </p>
              <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm font-semibold text-gray-600">Target Increase</span>
                <span className="text-2xl font-bold text-teal-600">+60%</span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mb-3">
                <Users className="text-white" size={28} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">100K+</p>
              <p className="text-gray-600">Students Reached</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-3">
                <Award className="text-white" size={28} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">500+</p>
              <p className="text-gray-600">Partner Colleges</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-green-400 rounded-full mb-3">
                <Target className="text-white" size={28} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">95%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalSection;
