import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Briefcase, GraduationCap, FileText, ArrowRight } from 'lucide-react';

interface CareerMappingProps {
  onBack: () => void;
}

const CareerMapping: React.FC<CareerMappingProps> = ({ onBack }) => {
  const [selectedDegree, setSelectedDegree] = useState('btech-cs');

  const careerPaths = {
    'btech-cs': {
      degree: 'B.Tech Computer Science',
      careers: [
        { title: 'Software Engineer', salary: '₹6-20 LPA', demand: 'Very High' },
        { title: 'Data Scientist', salary: '₹8-25 LPA', demand: 'Very High' },
        { title: 'Full Stack Developer', salary: '₹5-18 LPA', demand: 'High' },
        { title: 'AI/ML Engineer', salary: '₹10-30 LPA', demand: 'Very High' },
      ],
      exams: ['GATE', 'GRE', 'CAT', 'Company Placements'],
      higherStudies: ['M.Tech', 'MS abroad', 'MBA', 'PhD'],
    },
    'mbbs': {
      degree: 'MBBS',
      careers: [
        { title: 'General Physician', salary: '₹6-15 LPA', demand: 'Very High' },
        { title: 'Surgeon', salary: '₹10-40 LPA', demand: 'High' },
        { title: 'Pediatrician', salary: '₹8-20 LPA', demand: 'High' },
        { title: 'Medical Researcher', salary: '₹5-15 LPA', demand: 'Medium' },
      ],
      exams: ['NEET PG', 'USMLE', 'PLAB', 'FMGE'],
      higherStudies: ['MD/MS', 'DM/MCh', 'Fellowship', 'PhD'],
    },
    'bcom': {
      degree: 'B.Com',
      careers: [
        { title: 'Chartered Accountant', salary: '₹7-20 LPA', demand: 'High' },
        { title: 'Financial Analyst', salary: '₹5-15 LPA', demand: 'High' },
        { title: 'Tax Consultant', salary: '₹4-12 LPA', demand: 'Medium' },
        { title: 'Investment Banker', salary: '₹8-25 LPA', demand: 'High' },
      ],
      exams: ['CA', 'CS', 'CMA', 'CFA'],
      higherStudies: ['M.Com', 'MBA', 'CFA', 'CA'],
    },
  };

  const degrees = [
    { id: 'btech-cs', label: 'B.Tech CS', gradient: 'from-blue-400 to-cyan-400' },
    { id: 'mbbs', label: 'MBBS', gradient: 'from-teal-400 to-green-400' },
    { id: 'bcom', label: 'B.Com', gradient: 'from-orange-400 to-amber-400' },
  ];

  const currentPath = careerPaths[selectedDegree as keyof typeof careerPaths];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-3 rounded-xl">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Course-to-Career Mapping
              </h2>
              <p className="text-gray-600 mt-1">
                Explore career paths for different degrees
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              SELECT A DEGREE
            </p>
            <div className="flex flex-wrap gap-3">
              {degrees.map((degree) => (
                <button
                  key={degree.id}
                  onClick={() => setSelectedDegree(degree.id)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    selectedDegree === degree.id
                      ? `bg-gradient-to-r ${degree.gradient} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {degree.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPath.careers.map((career, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <Briefcase className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">
                            {career.title}
                          </h4>
                          <p className="text-sm text-gray-600">{career.salary}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          career.demand === 'Very High'
                            ? 'bg-green-100 text-green-700'
                            : career.demand === 'High'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {career.demand} Demand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Entrance Exams
                  </h3>
                </div>
                <div className="space-y-2">
                  {currentPath.exams.map((exam, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border border-purple-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-700">{exam}</span>
                      <ArrowRight className="text-purple-600" size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-teal-500 p-2 rounded-lg">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Higher Studies
                  </h3>
                </div>
                <div className="space-y-2">
                  {currentPath.higherStudies.map((study, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border border-teal-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-700">{study}</span>
                      <ArrowRight className="text-teal-600" size={18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Dynamic Career Roadmap
              </h3>
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border-2 border-orange-300 flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span className="font-semibold text-gray-700">Complete Degree</span>
                </div>
                <ArrowRight className="text-gray-400 flex-shrink-0" size={20} />
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border-2 border-pink-300 flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <span className="font-semibold text-gray-700">Entrance Exams</span>
                </div>
                <ArrowRight className="text-gray-400 flex-shrink-0" size={20} />
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border-2 border-teal-300 flex-shrink-0">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <span className="font-semibold text-gray-700">Career / Higher Studies</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This roadmap adapts based on your interests and performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerMapping;
