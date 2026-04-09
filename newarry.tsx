// 原始数据项
interface RawItem {
    applicationName: string;
    context: string;
    userCount: number;
}

// 目标结构
interface MergedItem {
    Customer_ID: string;           // 这里假设使用 applicationName，你可根据业务修改
    Customer_Name: string;         // 同样假设使用 applicationName
    Context: string;
    Application_Name: string;
    Meaningful_Clicks: number;     // 来自 a 数组的 userCount
    Unique_User_Log: number;       // 来自 b 数组的 userCount
    Total_User_Log: number;        // 来自 c 数组的 userCount
}

// 合并函数
function mergeData(a: RawItem[], b: RawItem[], c: RawItem[]): MergedItem[] {
    const map = new Map<string, MergedItem>();

    // 生成唯一键：applicationName + context
    const getKey = (item: RawItem) => `${item.applicationName}|${item.context}`;

    // 辅助添加逻辑
    const addToMap = (
        arr: RawItem[],
        field: 'Meaningful_Clicks' | 'Unique_User_Log' | 'Total_User_Log'
    ) => {
        arr.forEach(item => {
            const key = getKey(item);
            if (!map.has(key)) {
                // 初始化默认值
                map.set(key, {
                    Customer_ID: item.applicationName,      // 可替换为真实ID逻辑
                    Customer_Name: item.applicationName,
                    Context: item.context,
                    Application_Name: item.applicationName,
                    Meaningful_Clicks: 0,
                    Unique_User_Log: 0,
                    Total_User_Log: 0
                });
            }
            const entry = map.get(key)!;
            entry[field] = item.userCount;   // 赋值
        });
    };

    addToMap(a, 'Meaningful_Clicks');
    addToMap(b, 'Unique_User_Log');
    addToMap(c, 'Total_User_Log');

    return Array.from(map.values());
}

// 使用示例
const a: RawItem[] = [
    { applicationName: "app1", context: "wa", userCount: 100 }
];
const b: RawItem[] = [
    { applicationName: "app2", context: "wa", userCount: 100 }
];
const c: RawItem[] = [
    { applicationName: "app1", context: "wa", userCount: 100 }
];

const result = mergeData(a, b, c);
console.log(result);
// 输出：
// [
//   {
//     Customer_ID: "app1",
//     Customer_Name: "app1",
//     Context: "wa",
//     Application_Name: "app1",
//     Meaningful_Clicks: 100,
//     Unique_User_Log: 0,
//     Total_User_Log: 100
//   },
//   {
//     Customer_ID: "app2",
//     Customer_Name: "app2",
//     Context: "wa",
//     Application_Name: "app2",
//     Meaningful_Clicks: 0,
//     Unique_User_Log: 100,
//     Total_User_Log: 0
//   }
// ]
