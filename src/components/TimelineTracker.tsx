import React, { useState } from 'react';
import { ArrowLeft, Bell, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TimelineTrackerProps {
  onBack: () => void;
}

const TimelineTracker: React.FC<TimelineTrackerProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState(true);

  const events = [
    {
      title: 'JEE Main Registration Opens',
      date: 'Jan 15, 2026',
      daysLeft: 5,
      category: 'Exam',
      status: 'upcoming',
      color: 'orange',
    },
    {
      title: 'NEET Application Deadline',
      date: 'May 20, 2026',
      daysLeft: 10,
      category: 'Exam',
      status: 'upcoming',
      color: 'red',
    },
    {
      title: 'DU Admission Portal Opens',
      date: 'March 25, 2026',
      daysLeft: 15,
      category: 'Admission',
      status: 'upcoming',
      color: 'blue',
    },
    {
      title: 'National Scholarship Deadline',
      date: 'April 30, 2026',
      daysLeft: 20,
      category: 'Scholarship',
      status: 'upcoming',
      color: 'green',
    },
    {
      title: 'IIT JEE Advanced Results',
      date: 'June 5, 2026',
      daysLeft: 25,
      category: 'Results',
      status: 'upcoming',
      color: 'purple',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Events', color: 'gray' },
    { id: 'exam', label: 'Exams', color: 'orange' },
    { id: 'admission', label: 'Admissions', color: 'blue' },
    { id: 'scholarship', label: 'Scholarships', color: 'green' },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
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
              <div className="bg-gradient-to-br from-yellow-400 to-amber-400 p-3 rounded-xl">
                <Bell className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Timeline Tracker
                </h2>
                <p className="text-gray-600 mt-1">
                  Never miss important deadlines
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                notifications
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
              }`}
            >
              <Bell size={18} />
              <span>{notifications ? 'Notifications On' : 'Notifications Off'}</span>
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg font-semibold bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200 transition-all`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-${event.color}-50 to-white rounded-2xl p-6 border-2 border-${event.color}-200 hover:shadow-lg transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`bg-${event.color}-500 p-3 rounded-xl flex-shrink-0`}
                    >
                      {event.category === 'Exam' && (
                        <Calendar className="text-white" size={24} />
                      )}
                      {event.category === 'Admission' && (
                        <Bell className="text-white" size={24} />
                      )}
                      {event.category === 'Scholarship' && (
                        <CheckCircle className="text-white" size={24} />
                      )}
                      {event.category === 'Results' && (
                        <AlertCircle className="text-white" size={24} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold bg-${event.color}-100 text-${event.color}-700`}
                        >
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{event.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      className={`px-5 py-2 rounded-lg font-semibold bg-${event.color}-500 text-white hover:bg-${event.color}-600 transition-all`}
                    >
                      Set Reminder
                    </button>
                    <button className="px-5 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
            <div className="flex items-start space-x-3">
              <Bell className="text-yellow-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Notification Settings
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get reminders via SMS, Email, or App notifications. We'll alert
                  you 7 days before, 3 days before, and on the day of important
                  deadlines.
                </p>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-yellow-600 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      SMS Alerts
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-yellow-600 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Email Alerts
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-yellow-600 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      App Notifications
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineTracker;
