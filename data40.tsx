import dayjs from 'dayjs';

function getLimitedDate(dateStr: string, days: number): Date {
  const targetDate = dayjs(dateStr, "YYYYMMDD")
    .add(days, 'day')
    .toDate();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return targetDate < today ? targetDate : today;
}

// 使用
const result = getLimitedDate("20260417", 40);
console.log(result);
