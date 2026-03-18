import React from 'react';
import { GraduationCap, Globe, Home, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
              <GraduationCap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                CareerPath
              </h1>
              <p className="text-xs text-gray-600">Your Future, Your Choice</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                activeSection === 'home'
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('colleges')}
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
            >
              Colleges
            </button>
            <button
              onClick={() => onNavigate('career')}
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
            >
              Careers
            </button>
            <button
              onClick={() => onNavigate('ebooks')}
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
            >
              eBooks
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
              <Globe size={20} />
              <span className="text-sm">EN</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                  <User size={18} className="text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {profile?.full_name || 'Student'}
                  </span>
                  {profile?.grade_level && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {profile.grade_level}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-700 hover:text-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
