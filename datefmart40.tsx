function addDaysWithLimit(dateStr: string, days: number): Date {
  // 解析 "dd/mm/yyyy" 格式
  const [day, month, year] = dateStr.split('/').map(Number);
  
  // 创建日期对象（月份从0开始）
  const targetDate = new Date(year, month - 1, day);
  // 往后推指定天数
  targetDate.setDate(targetDate.getDate() + days);
  
  // 获取今天（清除时间部分，只保留日期）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 返回两者中较早的日期
  return targetDate < today ? targetDate : today;
}

// 使用示例
const originalDate = "17/04/2026";
const result = addDaysWithLimit(originalDate, 40);
console.log(result); // 如果推算日期超过今天，返回今天；否则返回推算日期
