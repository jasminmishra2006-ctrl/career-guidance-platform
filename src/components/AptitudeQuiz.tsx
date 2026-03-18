import React, { useState, useEffect } from 'react';
import { ArrowLeft, PuzzleIcon, CheckCircle, TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AptitudeQuizProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

const AptitudeQuiz: React.FC<AptitudeQuizProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const grade10Questions: Question[] = [
    {
      id: 1,
      question: 'I enjoy working with numbers and solving mathematical problems',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'analytical',
    },
    {
      id: 2,
      question: 'I am interested in understanding how things work mechanically',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'technical',
    },
    {
      id: 3,
      question: 'I like reading about business, economics, and finance',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'commerce',
    },
    {
      id: 4,
      question: 'I enjoy creative activities like art, music, or writing',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'arts',
    },
    {
      id: 5,
      question: 'I am fascinated by scientific experiments and discoveries',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'science',
    },
    {
      id: 6,
      question: 'I prefer learning about history, geography, and social issues',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'arts',
    },
    {
      id: 7,
      question: 'I am good at managing money and keeping track of expenses',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'commerce',
    },
    {
      id: 8,
      question: 'I enjoy solving physics and chemistry problems',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'science',
    },
    {
      id: 9,
      question: 'I like working with computers and technology',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'technical',
    },
    {
      id: 10,
      question: 'I am interested in biology and life sciences',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'science',
    },
    {
      id: 11,
      question: 'I prefer practical, hands-on learning over theoretical concepts',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'technical',
    },
    {
      id: 12,
      question: 'I enjoy participating in debates and expressing my opinions',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'arts',
    },
  ];

  const grade12Questions: Question[] = [
    {
      id: 1,
      question: 'I am passionate about building and creating technical solutions',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'engineering',
    },
    {
      id: 2,
      question: 'I am interested in healthcare and helping people medically',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'medical',
    },
    {
      id: 3,
      question: 'I enjoy studying subjects like physics, chemistry, and mathematics deeply',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'engineering',
    },
    {
      id: 4,
      question: 'I am fascinated by human anatomy and biological systems',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'medical',
    },
    {
      id: 5,
      question: 'I prefer a well-rounded education in various subjects over specialization',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'general',
    },
    {
      id: 6,
      question: 'I am interested in coding, software development, and technology',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'engineering',
    },
    {
      id: 7,
      question: 'I want to pursue research in pure sciences like Physics or Chemistry',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'general',
    },
    {
      id: 8,
      question: 'I am comfortable with the idea of a 5+ year professional course',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'medical',
    },
    {
      id: 9,
      question: 'I enjoy designing, innovating, and problem-solving with logic',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'engineering',
    },
    {
      id: 10,
      question: 'I am interested in pursuing humanities, arts, or social sciences',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'general',
    },
    {
      id: 11,
      question: 'I want to work in a field where I can directly help patients',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'medical',
    },
    {
      id: 12,
      question: 'I am interested in working with circuits, machines, or structures',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'engineering',
    },
  ];

  const questions = profile?.grade_level === '10th' ? grade10Questions : grade12Questions;

  const calculatePrediction = () => {
    const categoryScores: Record<string, number> = {};

    questions.forEach((q) => {
      const answer = answers[q.id] || 0;
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = 0;
      }
      categoryScores[q.category] += answer;
    });

    if (profile?.grade_level === '10th') {
      const maxScore = Math.max(...Object.values(categoryScores));
      const topCategories = Object.entries(categoryScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

      let recommendedStream = '';
      let description = '';
      let careers = [];
      let subjects = [];

      if (categoryScores.science > categoryScores.commerce && categoryScores.science > categoryScores.arts) {
        if (categoryScores.analytical > categoryScores.technical / 2) {
          recommendedStream = 'Science (PCM)';
          description = 'Physics, Chemistry, Mathematics - Perfect for Engineering and Technology careers';
          careers = ['Software Engineer', 'Mechanical Engineer', 'Data Scientist', 'Architect'];
          subjects = ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'];
        } else {
          recommendedStream = 'Science (PCB)';
          description = 'Physics, Chemistry, Biology - Ideal for Medical and Life Sciences';
          careers = ['Doctor', 'Biotechnologist', 'Pharmacist', 'Research Scientist'];
          subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
        }
      } else if (categoryScores.commerce > categoryScores.science && categoryScores.commerce > categoryScores.arts) {
        recommendedStream = 'Commerce';
        description = 'Business, Accountancy, Economics - Great for Business and Finance careers';
        careers = ['Chartered Accountant', 'Investment Banker', 'Entrepreneur', 'Financial Analyst'];
        subjects = ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'];
      } else if (categoryScores.technical > categoryScores.science && categoryScores.technical > categoryScores.commerce) {
        recommendedStream = 'Vocational/Diploma';
        description = 'Practical skills and technical training for immediate career opportunities';
        careers = ['IT Technician', 'Electrician', 'Graphic Designer', 'Web Developer'];
        subjects = ['Technical Skills', 'Computer Applications', 'Practical Training'];
      } else {
        recommendedStream = 'Arts/Humanities';
        description = 'History, Political Science, Literature - Perfect for creative and social careers';
        careers = ['Lawyer', 'Journalist', 'Civil Servant', 'Teacher', 'Psychologist'];
        subjects = ['History', 'Political Science', 'English', 'Psychology'];
      }

      return {
        stream: recommendedStream,
        confidence: Math.round((maxScore / (questions.length * 5)) * 100),
        description,
        careers,
        subjects,
        alternativeStreams: topCategories.slice(0, 2).map(([cat]) => {
          if (cat === 'science') return 'Science Stream';
          if (cat === 'commerce') return 'Commerce';
          if (cat === 'arts') return 'Arts/Humanities';
          return 'Vocational';
        }),
      };
    } else {
      const maxScore = Math.max(...Object.values(categoryScores));
      let recommendedPath = '';
      let description = '';
      let courses = [];
      let careers = [];
      let entranceExams = [];

      if (categoryScores.engineering > categoryScores.medical && categoryScores.engineering > categoryScores.general) {
        recommendedPath = 'Engineering';
        description = 'Technical problem-solving, innovation, and building solutions for real-world challenges';
        courses = ['Computer Science Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];
        careers = ['Software Developer', 'Data Scientist', 'Mechanical Engineer', 'Electronics Engineer'];
        entranceExams = ['JEE Main', 'JEE Advanced', 'State Engineering Entrance'];
      } else if (categoryScores.medical > categoryScores.engineering && categoryScores.medical > categoryScores.general) {
        recommendedPath = 'Medical';
        description = 'Healthcare, patient care, medical research, and biological sciences';
        courses = ['MBBS', 'BDS', 'BAMS', 'B.Pharm', 'Nursing'];
        careers = ['Doctor', 'Dentist', 'Pharmacist', 'Medical Researcher', 'Surgeon'];
        entranceExams = ['NEET UG', 'AIIMS', 'JIPMER'];
      } else {
        recommendedPath = 'General Degree (+3)';
        description = 'Broad-based education with flexibility to explore multiple fields and interests';
        courses = ['B.Sc (Physics/Chemistry/Math)', 'B.A (Humanities)', 'B.Com', 'BCA'];
        careers = ['Research Scientist', 'Teacher', 'Civil Servant', 'Analyst', 'Consultant'];
        entranceExams = ['CUET', 'University Entrance Exams', 'DU Entrance'];
      }

      return {
        path: recommendedPath,
        confidence: Math.round((maxScore / (questions.length * 5)) * 100),
        description,
        courses,
        careers,
        entranceExams,
        whatYouCanDo: `With ${recommendedPath}, you can pursue diverse opportunities in ${careers.slice(0, 3).join(', ')} and many more fields. This path offers excellent career growth and multiple specialization options.`,
      };
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: optionIndex + 1 });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculatePrediction();
      setPrediction(result);
      setShowResults(true);

      if (user) {
        await supabase.from('aptitude_results').insert({
          user_id: user.id,
          grade_level: profile?.grade_level || '',
          results: { answers, prediction: result },
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && prediction) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mb-4">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Test Complete!
              </h2>
              <p className="text-gray-600">
                Based on your responses, here's our personalized recommendation
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Recommended {profile?.grade_level === '10th' ? 'Stream' : 'Path'}</p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {profile?.grade_level === '10th' ? prediction.stream : prediction.path}
                      </h3>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{prediction.confidence}%</div>
                    <p className="text-xs text-gray-600">Match</p>
                  </div>
                </div>
                <p className="text-gray-700">{prediction.description}</p>
              </div>

              {profile?.grade_level === '12th' && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="text-blue-600" size={24} />
                    <h3 className="text-xl font-bold text-gray-800">What You Can Do</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{prediction.whatYouCanDo}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="text-teal-600" size={24} />
                    <h3 className="text-xl font-bold text-gray-800">
                      {profile?.grade_level === '10th' ? 'Subjects' : 'Recommended Courses'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(profile?.grade_level === '10th' ? prediction.subjects : prediction.courses).map((item: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Briefcase className="text-purple-600" size={24} />
                    <h3 className="text-xl font-bold text-gray-800">Career Options</h3>
                  </div>
                  <ul className="space-y-2">
                    {prediction.careers.map((career: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {profile?.grade_level === '12th' && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Entrance Exams</h3>
                  <div className="flex flex-wrap gap-3">
                    {prediction.entranceExams.map((exam: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg font-semibold">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Explore Colleges
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:border-orange-500 hover:text-orange-500 transition-all"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-pink-400 to-rose-400 p-3 rounded-xl">
              <PuzzleIcon className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Aptitude & Career Prediction Test
              </h2>
              <p className="text-gray-600 text-sm">
                Question {currentQuestion + 1} of {questions.length} • {profile?.grade_level} Student
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    answers[questions[currentQuestion].id] === index + 1
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300 bg-white'
                  }`}
                >
                  <span className="font-semibold text-gray-700">{option}</span>
                  {answers[questions[currentQuestion].id] === index + 1 && (
                    <CheckCircle className="text-pink-500" size={24} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-full font-semibold border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={answers[questions[currentQuestion].id] === undefined}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AptitudeQuiz;
