数据处理```typescript
/**
 * 将后台返回的数据转换为AG Grid所需格式
 * @param apiData 图一格式的数据数组
 * @returns 图二格式的数据数组
 */
const transformToGridData = (apiData: any[]): any[] => {
  if (!apiData || apiData.length === 0) return [];
  
  return apiData.map(item => ({
    "HSBCnet Customer ID": item.customerId || item.customerID || "N/A",
    "Customer Name": item.customerName || item.customer || "N/A",
    "Context": item.context || "",
    "Application Name": item.applicationName || "",
    "Meaningful Clicks": item.eventCount?.toLocaleString() || "0",
    "Unique User Log-in": item.uniqueUsers?.toLocaleString() || item.eventCount?.toLocaleString() || "0",
    "Total User Log-in": item.totalUsers?.toLocaleString() || item.eventCount?.toLocaleString() || "0"
  }));
};

// 使用示例
const originalData = transformToGridData(appList);
```
