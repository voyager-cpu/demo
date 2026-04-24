function addDaysButNotBeyondToday(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    
    // 用时间戳加 40 天（毫秒数）
    const newDate = new Date(inputDate.getTime() + 40 * 86400000);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return newDate > today ? today : newDate;
}
