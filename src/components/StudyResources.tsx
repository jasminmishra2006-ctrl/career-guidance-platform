import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, FileText, Video, Headphones, Search } from 'lucide-react';

interface StudyResourcesProps {
  onBack: () => void;
}

const StudyResources: React.FC<StudyResourcesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      title: 'Complete Guide to JEE Main 2025',
      type: 'PDF',
      category: 'Engineering',
      size: '25 MB',
      downloads: '12.5K',
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'NEET Biology Video Lectures',
      type: 'Video',
      category: 'Medical',
      size: '500 MB',
      downloads: '8.2K',
      icon: Video,
      color: 'teal',
    },
    {
      title: 'Mathematics Formula Handbook',
      type: 'PDF',
      category: 'Engineering',
      size: '15 MB',
      downloads: '15.8K',
      icon: FileText,
      color: 'purple',
    },
    {
      title: 'English Grammar Audio Course',
      type: 'Audio',
      category: 'General',
      size: '120 MB',
      downloads: '5.3K',
      icon: Headphones,
      color: 'orange',
    },
    {
      title: 'Commerce Accounting eBook',
      type: 'PDF',
      category: 'Commerce',
      size: '18 MB',
      downloads: '6.7K',
      icon: FileText,
      color: 'green',
    },
    {
      title: 'Physics Concept Videos - Class 12',
      type: 'Video',
      category: 'Engineering',
      size: '350 MB',
      downloads: '9.1K',
      icon: Video,
      color: 'pink',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'medical', label: 'Medical' },
    { id: 'commerce', label: 'Commerce' },
    { id: 'general', label: 'General' },
  ];

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
            <div className="bg-gradient-to-br from-green-400 to-lime-400 p-3 rounded-xl">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Study Resources
              </h2>
              <p className="text-gray-600 mt-1">
                eBooks, videos, and materials for your learning journey
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for study materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-${resource.color}-50 to-white rounded-2xl p-6 border-2 border-${resource.color}-200 hover:shadow-lg transition-all transform hover:-translate-y-1`}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-${resource.color}-400 to-${resource.color}-500 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold bg-${resource.color}-100 text-${resource.color}-700`}
                      >
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {resource.size}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {resource.category} • {resource.downloads} downloads
                    </p>
                  </div>

                  <button
                    className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-${resource.color}-500 to-${resource.color}-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105`}
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-start space-x-3">
              <BookOpen className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Personalized Learning Materials
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Based on your personality test and chosen career path, we
                  recommend these resources specifically for you. All materials
                  are curated by expert educators and aligned with current
                  syllabi.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Updated Weekly
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    Free Access
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    Multilingual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyResources;
