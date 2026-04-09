function mergeArrays(a, b, c) {
  const map = new Map();

  // 辅助函数：将数组数据存入 map
  const addToMap = (arr, sourceKey) => {
    arr.forEach(item => {
      const appName = item.applicationName;
      const eventCount = item.eventCount;
      if (!map.has(appName)) {
        map.set(appName, {
          appname: appName,
          count_a: '',
          count_b: '',
          count_c: ''
        });
      }
      const entry = map.get(appName);
      entry[sourceKey] = eventCount;
    });
  };

  addToMap(a, 'count_a');
  addToMap(b, 'count_b');
  addToMap(c, 'count_c');

  // 将 Map 转换为数组
  return Array.from(map.values());
}

// 使用示例
const a = [
  { applicationName: "hs_data_studio", eventCount: 389 },
  { applicationName: "app_x", eventCount: 100 }
];
const b = [
  { applicationName: "hs_data_studio", eventCount: 200 }
];
const c = [];

const d = mergeArrays(a, b, c);
console.log(d);
// 输出：
// [
//   { appname: "hs_data_studio", count_a: 389, count_b: 200, count_c: '' },
//   { appname: "app_x", count_a: 100, count_b: '', count_c: '' }
// ]
