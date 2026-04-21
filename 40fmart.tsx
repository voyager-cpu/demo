function addDaysButNotBeyondToday(dateStr: string): Date {
  // 解析 dd/MM/yyyy
  const [day, month, year] = dateStr.split('/').map(Number);
  const inputDate = new Date(year, month - 1, day);
  
  // 向后推40天
  const newDate = new Date(inputDate);
  newDate.setDate(inputDate.getDate() + 40);
  
  // 获取今天的开始（00:00:00）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 不能超过今天
  return newDate > today ? today : newDate;
}

// 使用示例
const resultDate = addDaysButNotBeyondToday('15/03/2026');
console.log(resultDate); // Date 对象
console.log(resultDate.toLocaleDateString('en-GB')); // 格式化为 dd/MM/yyyy
