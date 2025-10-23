import { CalendarDay } from '@/types/date';

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: CalendarDay[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, dateString: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days.push({ day, dateString });
  }

  const totalCells = 42;
  while (days.length < totalCells) {
    days.push({ day: null, dateString: null });
  }

  return days;
}

export function extractDateFromId(id: string): string | null {
  const idParts = id.split('-');
  if (idParts.length >= 2 && idParts[1].length >= 8) {
    const timestamp = idParts[1];
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const day = timestamp.slice(6, 8);
    return `${year}-${month}-${day}`;
  }
  return null;
}

export function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function stringToDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getTodayString(): string {
  return dateToString(new Date());
}

export function formatDateString(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  return stringToDate(dateString).toLocaleDateString('default', options);
}
