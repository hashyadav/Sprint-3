// TweetTimingDemo.jsx - Demo component to showcase tweet timing functionality

import React from 'react';
import { formatTweetTime, formatTweetTimeDetailed, formatTweetTimeFull } from '../Utils/TimeUtils';

const TweetTimingDemo = () => {
  // Sample tweet times for demonstration
  const sampleTweets = [
    {
      id: 1,
      content: "Just posted this tweet!",
      createdAt: new Date(Date.now() - 30 * 1000).toISOString(), // 30 seconds ago
      user: { fullName: "John Doe" }
    },
    {
      id: 2,
      content: "This was posted 5 minutes ago",
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      user: { fullName: "Jane Smith" }
    },
    {
      id: 3,
      content: "This was posted 2 hours ago",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      user: { fullName: "Bob Johnson" }
    },
    {
      id: 4,
      content: "This was posted 3 days ago",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      user: { fullName: "Alice Brown" }
    },
    {
      id: 5,
      content: "This was posted 2 weeks ago",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
      user: { fullName: "Charlie Wilson" }
    },
    {
      id: 6,
      content: "This was posted 6 months ago",
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months ago
      user: { fullName: "Diana Lee" }
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tweet Timing Display Demo</h2>
      
      <div className="space-y-4">
        {sampleTweets.map((tweet) => (
          <div key={tweet.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-800">{tweet.user.fullName}</span>
              <span className="text-gray-500 text-sm">
                @{tweet.user.fullName.toLowerCase().replace(' ', '_')}
              </span>
              <span className="text-gray-500 text-sm">·</span>
              <span 
                className="text-gray-500 text-sm cursor-pointer hover:text-gray-700" 
                title={formatTweetTimeDetailed(tweet.createdAt)}
              >
                {formatTweetTime(tweet.createdAt)}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{tweet.content}</p>
            
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong>Short format:</strong> {formatTweetTime(tweet.createdAt)}</div>
              <div><strong>Detailed format:</strong> {formatTweetTimeDetailed(tweet.createdAt)}</div>
              <div><strong>Full format:</strong> {formatTweetTimeFull(tweet.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Features Implemented:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Real-time relative timing (now, 5m, 2h, 3d, 2w, 6mo, 1y)</li>
          <li>• Hover tooltip showing detailed date and time</li>
          <li>• Consistent formatting across all tweet displays</li>
          <li>• Automatic updates as time passes</li>
          <li>• Handles edge cases (null/undefined dates)</li>
        </ul>
      </div>
    </div>
  );
};

export default TweetTimingDemo;
