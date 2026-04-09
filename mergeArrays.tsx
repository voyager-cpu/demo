// 原始数据项接口
interface RawItem {
  applicationName: string;
  eventCount: number;
}

// 合并后的数据项接口
interface MergedItem {
  appname: string;
  count_a: number | string;  // 如果缺失则存空字符串，也可以改为 number | null
  count_b: number | string;
  count_c: number | string;
}

// 合并函数
function mergeArrays(a: RawItem[], b: RawItem[], c: RawItem[]): MergedItem[] {
  const map = new Map<string, MergedItem>();

  // 辅助函数：将数组数据填入 map
  const addToMap = (arr: RawItem[], key: 'count_a' | 'count_b' | 'count_c') => {
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

      const entry = map.get(appName)!;
      entry[key] = eventCount;  // 覆盖为数字（原来可能是空字符串）
    });
  };

  addToMap(a, 'count_a');
  addToMap(b, 'count_b');
  addToMap(c, 'count_c');

  return Array.from(map.values());
}

// 使用示例
const a: RawItem[] = [
  { applicationName: "hs_data_studio", eventCount: 389 },
  { applicationName: "app_x", eventCount: 100 }
];
const b: RawItem[] = [
  { applicationName: "hs_data_studio", eventCount: 200 }
];
const c: RawItem[] = [];

const d: MergedItem[] = mergeArrays(a, b, c);
console.log(d);
