function addDaysButNotBeyondToday(dateStr: string): string {
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
  const finalDate = newDate > today ? today : newDate;
  
  // 格式化回 dd/MM/yyyy
  const d = String(finalDate.getDate()).padStart(2, '0');
  const m = String(finalDate.getMonth() + 1).padStart(2, '0');
  const y = finalDate.getFullYear();
  
  return `${d}/${m}/${y}`;
}

// React 组件中使用
const DateCalculator: React.FC = () => {
  const [result, setResult] = useState<string>('');
  
  const handleCalculate = (date: string) => {
    const newDate = addDaysButNotBeyondToday(date);
    setResult(newDate);
  };
  
  return <div>{result}</div>;
};
