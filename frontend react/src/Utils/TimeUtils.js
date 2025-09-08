// TimeUtils.js - Utility functions for formatting tweet timing

export const formatTweetTime = (createdAt) => {
  if (!createdAt) return '';
  
  const now = new Date();
  const tweetTime = new Date(createdAt);
  const diffInMs = now - tweetTime;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mo`;
  } else {
    return `${diffInYears}y`;
  }
};

export const formatTweetTimeDetailed = (createdAt) => {
  if (!createdAt) return '';
  
  const tweetTime = new Date(createdAt);
  const options = { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return tweetTime.toLocaleDateString('en-US', options);
};

export const formatTweetTimeFull = (createdAt) => {
  if (!createdAt) return '';
  
  const tweetTime = new Date(createdAt);
  const options = { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return tweetTime.toLocaleDateString('en-US', options);
};
