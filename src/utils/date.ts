export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isTomorrow(due_day: number): boolean {
  const today = new Date();
  const todayNumber = today.getDate();
  const current_year = today.getFullYear();
  const current_month = today.getMonth();
  return (
    due_day === todayNumber + 1 ||
    (todayNumber >= daysInMonth(current_year, current_month) && due_day === 1)
  );
}

export function isThisWeek(due_day: number): boolean {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const startOfWeek = new Date();
  startOfWeek.setDate(today.getDate() - currentDayOfWeek);
  const endOfWeek = new Date();
  endOfWeek.setDate(today.getDate() + (6 - currentDayOfWeek));
  const current_month = today.getMonth();
  const current_year = today.getFullYear();
  const lastDayOfCurrentMonth = daysInMonth(current_year, current_month);

  if (
    startOfWeek.getMonth() === current_month &&
    endOfWeek.getMonth() === current_month
  ) {
    if (
      due_day > lastDayOfCurrentMonth &&
      lastDayOfCurrentMonth === endOfWeek.getDate()
    ) {
      return true;
    }
    return due_day >= startOfWeek.getDate() && due_day <= endOfWeek.getDate();
  }

  if (due_day >= startOfWeek.getDate() && due_day >= endOfWeek.getDate()) {
    return true;
  }

  if (due_day <= startOfWeek.getDate() && due_day <= endOfWeek.getDate()) {
    return true;
  }

  return false;
}
