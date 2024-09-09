import { describe, expect, it, test, vi } from 'vitest';
import { isDayInCurrentWeek, isTomorrow, daysInMonth } from './date';

describe('Check if a given day falls this week', () => {
  describe('Week starts and ends within the same month', () => {
    it('Returns true if it is this week', () => {
      // August, 7th => week starts 4th and ends 10th
      const mockDate = new Date(2024, 7, 7);
      vi.setSystemTime(mockDate);
      expect(isDayInCurrentWeek(5)).toBe(true);
      expect(isDayInCurrentWeek(4)).toBe(true);
      expect(isDayInCurrentWeek(10)).toBe(true);
    });
    it('Returns false if it not this week', () => {
      // August, 7th => week starts 4th and ends 10th
      const mockDate = new Date(2024, 7, 7);
      vi.setSystemTime(mockDate);
      expect(isDayInCurrentWeek(11)).toBe(false);
      expect(isDayInCurrentWeek(1)).toBe(false);
      expect(isDayInCurrentWeek(31)).toBe(false);
    });
  });

  describe('Week starts in one month and ends on another month', () => {
    it('Returns true if it is this week', () => {
      // August, 1st => week starts 28th of July and ends 3rd of August
      const mockDate = new Date(2024, 7, 1);
      vi.setSystemTime(mockDate);
      expect(isDayInCurrentWeek(31)).toBe(true);
      expect(isDayInCurrentWeek(28)).toBe(true);
      expect(isDayInCurrentWeek(3)).toBe(true);
    });
    it('Returns false if it not this week', () => {
      // August, 1st => week starts 28th of July and ends 3rd of August
      const mockDate = new Date(2024, 7, 1);
      vi.setSystemTime(mockDate);
      expect(isDayInCurrentWeek(27)).toBe(false);
      expect(isDayInCurrentWeek(4)).toBe(false);
    });
  });
});

describe('If a given day is tomorrow', () => {
  test('Start of month', () => {
    // August, 1st
    const mockDate = new Date(2024, 7, 1);
    vi.setSystemTime(mockDate);
    expect(isTomorrow(2)).toBe(true);
    expect(isTomorrow(31)).toBe(false);
  });
  test('Middle of month', () => {
    // August, 7th
    const mockDate = new Date(2024, 7, 7);
    vi.setSystemTime(mockDate);
    expect(isTomorrow(8)).toBe(true);
    expect(isTomorrow(6)).toBe(false);
  });
  it('End of month', () => {
    // August, 31th
    const mockDate = new Date(2024, 7, 31);
    vi.setSystemTime(mockDate);
    expect(isTomorrow(1)).toBe(true);
    expect(isTomorrow(30)).toBe(false);
  });
});

describe('Get number of days for a given number', () => {
  test('January 2024', () => {
    expect(daysInMonth(2024, 0)).toBe(31);
  });
  test('Februrary 2024', () => {
    expect(daysInMonth(2024, 1)).toBe(29);
  });
  test('Februrary 2023', () => {
    expect(daysInMonth(2023, 1)).toBe(28);
  });
  test('April 2024', () => {
    expect(daysInMonth(2024, 3)).toBe(30);
  });
});
