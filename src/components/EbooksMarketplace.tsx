import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, ShoppingCart, Star, Download, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface EbooksMarketplaceProps {
  onBack: () => void;
}

interface Ebook {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  cover: string;
  pages: number;
}

const EbooksMarketplace: React.FC<EbooksMarketplaceProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [purchasedBooks, setPurchasedBooks] = useState<string[]>([]);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const ebooks: Ebook[] = [
    {
      id: '1',
      title: 'Complete JEE Main 2025 Guide',
      author: 'Dr. Rajesh Kumar',
      category: 'Engineering',
      price: 599,
      rating: 4.8,
      reviews: 1250,
      description: 'Comprehensive guide covering all topics for JEE Main with practice questions',
      cover: 'from-blue-400 to-cyan-400',
      pages: 850,
    },
    {
      id: '2',
      title: 'NEET Biology Masterclass',
      author: 'Dr. Priya Sharma',
      category: 'Medical',
      price: 799,
      rating: 4.9,
      reviews: 2100,
      description: 'Complete biology preparation for NEET with diagrams and illustrations',
      cover: 'from-teal-400 to-green-400',
      pages: 920,
    },
    {
      id: '3',
      title: 'Mathematics Formula Handbook',
      author: 'Prof. Arun Patel',
      category: 'Mathematics',
      price: 399,
      rating: 4.7,
      reviews: 980,
      description: 'All essential formulas and shortcuts for competitive exams',
      cover: 'from-purple-400 to-pink-400',
      pages: 450,
    },
    {
      id: '4',
      title: 'Accounting for Commerce Students',
      author: 'CA Meera Singh',
      category: 'Commerce',
      price: 699,
      rating: 4.8,
      reviews: 1500,
      description: 'Complete accountancy guide for Class 11-12 and competitive exams',
      cover: 'from-orange-400 to-amber-400',
      pages: 720,
    },
    {
      id: '5',
      title: 'English Grammar & Composition',
      author: 'Prof. Anjali Verma',
      category: 'Language',
      price: 449,
      rating: 4.6,
      reviews: 850,
      description: 'Master English grammar, vocabulary, and essay writing',
      cover: 'from-pink-400 to-rose-400',
      pages: 580,
    },
    {
      id: '6',
      title: 'Physics Problem Solver',
      author: 'Dr. Suresh Reddy',
      category: 'Engineering',
      price: 649,
      rating: 4.7,
      reviews: 1100,
      description: 'Solved problems and concepts for JEE and board exams',
      cover: 'from-indigo-400 to-blue-400',
      pages: 780,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Books' },
    { id: 'Engineering', label: 'Engineering' },
    { id: 'Medical', label: 'Medical' },
    { id: 'Commerce', label: 'Commerce' },
    { id: 'Mathematics', label: 'Mathematics' },
    { id: 'Language', label: 'Language' },
  ];

  const filteredEbooks = ebooks.filter((ebook) => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = async (ebook: Ebook) => {
    if (!user) {
      alert('Please sign in to purchase books');
      return;
    }

    setPurchasing(ebook.id);

    try {
      const { error } = await supabase.from('ebook_purchases').insert({
        user_id: user.id,
        ebook_id: ebook.id,
        ebook_title: ebook.title,
        price: ebook.price,
      });

      if (error) throw error;

      setPurchasedBooks([...purchasedBooks, ebook.id]);
      alert(`Successfully purchased "${ebook.title}"!`);
    } catch (error: any) {
      alert('Error purchasing book: ' + error.message);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-400 to-lime-400 p-3 rounded-xl">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">eBooks Marketplace</h2>
                <p className="text-gray-600 mt-1">
                  Purchase quality study materials for your preparation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
              <ShoppingCart className="text-orange-600" size={20} />
              <span className="font-bold text-orange-600">{purchasedBooks.length}</span>
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
                placeholder="Search books by title or author..."
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
            {filteredEbooks.map((ebook) => {
              const isPurchased = purchasedBooks.includes(ebook.id);
              const isPurchasing = purchasing === ebook.id;

              return (
                <div
                  key={ebook.id}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
                >
                  <div
                    className={`w-full h-48 bg-gradient-to-br ${ebook.cover} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <BookOpen className="text-white" size={64} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {ebook.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="font-bold text-gray-800 text-sm">
                          {ebook.rating}
                        </span>
                        <span className="text-gray-500 text-xs">({ebook.reviews})</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{ebook.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {ebook.author}</p>
                    <p className="text-xs text-gray-600 mb-3">{ebook.description}</p>
                    <p className="text-xs text-gray-500">{ebook.pages} pages</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">₹{ebook.price}</p>
                    </div>
                    {isPurchased ? (
                      <button className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                        <Check size={18} />
                        <span>Purchased</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(ebook)}
                        disabled={isPurchasing}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-lime-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
                      >
                        <ShoppingCart size={18} />
                        <span>{isPurchasing ? 'Buying...' : 'Buy Now'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {purchasedBooks.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-start space-x-3">
                <Download className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Your Library</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    You have purchased {purchasedBooks.length} book
                    {purchasedBooks.length !== 1 ? 's' : ''}. Access them anytime from your
                    dashboard.
                  </p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Go to My Library
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EbooksMarketplace;
