// ---------- 类型定义（不变） ----------
interface DynamicItem {
  checked: boolean;
  value: string;
  hidden: boolean;
  ID: string;
}

interface CoverageItem {
  Key: string;
  AppGroupName: string;
  ApplicationName: string;
  ApplicationID: string;
  EventType: string;
  EventAction: string;
  EventContent: string;
}

interface TreeNode {
  ID: string;
  value: string;
  checked: boolean;
  Hidden: boolean;
}

interface GroupNode {
  ID: string;
  value: string;
  checked: boolean;
  Hidden: boolean;
  children: TreeNode[];
}

// ---------- 辅助函数 ----------
/** 归一化字符串（去空格、转小写），用于灵活比较 */
const normalize = (s: string) => s.trim().toLowerCase();

// ---------- 核心分组函数（扩展版）----------
function groupByAppGroup(
  dynamicData: DynamicItem[],
  coverageList: CoverageItem[]
): GroupNode[] {
  const groupMap = new Map<string, GroupNode>();

  // 构建一个快速查找表：key = 归一化后的 AppGroupName，value = 第一条匹配的 CoverageItem
  const appGroupLookup = new Map<string, CoverageItem>();
  for (const c of coverageList) {
    const normalizedGroup = normalize(c.AppGroupName);
    if (!appGroupLookup.has(normalizedGroup)) {
      appGroupLookup.set(normalizedGroup, c); // 保留首个匹配的 Key
    }
  }

  for (const item of dynamicData) {
    let matchedGroup: CoverageItem | undefined;

    // 1. 优先精确匹配 ApplicationID
    matchedGroup = coverageList.find(c => c.ApplicationID === item.ID);

    // 2. 回退：按 value 与 AppGroupName 模糊匹配（忽略大小写/空格）
    if (!matchedGroup) {
      const normalizedValue = normalize(item.value);
      matchedGroup = appGroupLookup.get(normalizedValue);
    }

    // 仍未匹配则跳过该条目
    if (!matchedGroup) continue;

    const { AppGroupName, Key } = matchedGroup;

    // 若该 AppGroupName 的父节点未创建，则创建
    if (!groupMap.has(AppGroupName)) {
      groupMap.set(AppGroupName, {
        ID: Key,                     // 使用首个匹配到的 Key 作为父节点 ID
        value: AppGroupName,
        checked: false,
        Hidden: false,
        children: [],
      });
    }

    // 将当前条目转为子节点格式（hidden -> Hidden）
    const childNode: TreeNode = {
      ID: item.ID,
      value: item.value,
      checked: item.checked,
      Hidden: item.hidden,
    };

    groupMap.get(AppGroupName)!.children.push(childNode);
  }

  return Array.from(groupMap.values());
}

// ---------- 测试数据 ----------
const dynamicData: DynamicItem[] = [
  { checked: false, value: "client defined group", hidden: false, ID: "ssv-client-defined-group" },
  { checked: false, value: "Data studio",          hidden: false, ID: "hs-data-studio" },
  { checked: false, value: "My Reports",           hidden: false, ID: "hs-reporting-reports" },
];

const APP_COVERAGE_PRIORITIZATION: CoverageItem[] = [
  {
    Key: '1', AppGroupName: 'Data Studio', ApplicationName: 'Client Defined Group',
    ApplicationID: 'ssv-client-defined-group', EventType: 'APP_LOAD', EventAction: '', EventContent: '',
  },
  {
    Key: '2', AppGroupName: 'Data Studio', ApplicationName: 'Client Overrides',
    ApplicationID: 'hss-client-override-ui', EventType: 'APP_LOAD', EventAction: '', EventContent: '',
  },
  {
    Key: '3', AppGroupName: 'Report Store', ApplicationName: 'My Reports',
    ApplicationID: 'hss-reporting-reports', EventType: 'APP_LOAD', EventAction: '', EventContent: '',
  },
];

console.log(JSON.stringify(groupByAppGroup(dynamicData, APP_COVERAGE_PRIORITIZATION), null, 2));
