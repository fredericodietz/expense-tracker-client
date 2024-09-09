export const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const isTomorrow = (dueDay: number): boolean => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDayNumber = tomorrow.getDate();
  return dueDay === tomorrowDayNumber;
};

export const isDayInCurrentWeek = (day: number): boolean => {
  const now = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay());
  const daysOfThisWeek = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date();
    nextDay.setDate(startOfWeek.getDate() + i);
    daysOfThisWeek.push(nextDay.getDate());
  }

  return daysOfThisWeek.includes(day);
};
