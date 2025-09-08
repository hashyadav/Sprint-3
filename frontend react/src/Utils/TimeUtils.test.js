// TimeUtils.test.js - Test file for timing utility functions

import { formatTweetTime, formatTweetTimeDetailed, formatTweetTimeFull } from './TimeUtils';

// Mock current time for consistent testing
const mockNow = new Date('2024-01-15T12:00:00Z');

// Override Date.now() for testing
const originalDateNow = Date.now;
Date.now = jest.fn(() => mockNow.getTime());

describe('TimeUtils', () => {
  beforeEach(() => {
    // Reset Date.now mock before each test
    Date.now.mockReturnValue(mockNow.getTime());
  });

  afterAll(() => {
    // Restore original Date.now
    Date.now = originalDateNow;
  });

  describe('formatTweetTime', () => {
    it('should return "now" for tweets less than 1 minute old', () => {
      const tweetTime = new Date('2024-01-15T11:59:30Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('now');
    });

    it('should return minutes for tweets less than 1 hour old', () => {
      const tweetTime = new Date('2024-01-15T11:30:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('30m');
    });

    it('should return hours for tweets less than 1 day old', () => {
      const tweetTime = new Date('2024-01-15T08:00:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('4h');
    });

    it('should return days for tweets less than 1 week old', () => {
      const tweetTime = new Date('2024-01-12T12:00:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('3d');
    });

    it('should return weeks for tweets less than 1 month old', () => {
      const tweetTime = new Date('2024-01-01T12:00:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('2w');
    });

    it('should return months for tweets less than 1 year old', () => {
      const tweetTime = new Date('2023-11-15T12:00:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('2mo');
    });

    it('should return years for tweets older than 1 year', () => {
      const tweetTime = new Date('2022-01-15T12:00:00Z').toISOString();
      expect(formatTweetTime(tweetTime)).toBe('1y');
    });

    it('should return empty string for null/undefined input', () => {
      expect(formatTweetTime(null)).toBe('');
      expect(formatTweetTime(undefined)).toBe('');
    });
  });

  describe('formatTweetTimeDetailed', () => {
    it('should format time with month, day, hour, and minute', () => {
      const tweetTime = new Date('2024-01-15T10:30:00Z').toISOString();
      const result = formatTweetTimeDetailed(tweetTime);
      expect(result).toMatch(/Jan \d+, \d+:\d+ (AM|PM)/);
    });

    it('should return empty string for null/undefined input', () => {
      expect(formatTweetTimeDetailed(null)).toBe('');
      expect(formatTweetTimeDetailed(undefined)).toBe('');
    });
  });

  describe('formatTweetTimeFull', () => {
    it('should format time with full date and time', () => {
      const tweetTime = new Date('2024-01-15T10:30:00Z').toISOString();
      const result = formatTweetTimeFull(tweetTime);
      expect(result).toMatch(/January \d+, \d{4}, \d+:\d+ (AM|PM)/);
    });

    it('should return empty string for null/undefined input', () => {
      expect(formatTweetTimeFull(null)).toBe('');
      expect(formatTweetTimeFull(undefined)).toBe('');
    });
  });
});
