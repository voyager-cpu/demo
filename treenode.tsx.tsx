// 第一张图片的数据类型
interface SourceItem {
  ID: string;
  value: string;
  Checked: boolean;
  Hidden: boolean;
}

// 第二张图片的数据类型
interface APP_COV_Item {
  key: string;
  AppGroupName: string;
  AppApplicationName: string;
  AppApplicationID: string;
  EventType: string;
  EventAction: string;
  EventContent: string;
}

// 目标输出类型
interface TreeNode {
  ID: string;
  value: string;
  checked: boolean;
  hidden: boolean;
  children: TreeNode[];
}

/**
 * 创建树形结构，只创建在第一张图片中有匹配数据的父节点
 * @param appCovArray - 第二张图片的 APP_COV 数组
 * @param sources - 第一张图片的源数据列表
 * @returns TreeNode[] 只包含有子节点的父节点数组
 */
function buildTreeWithOnlyMatchedParents(appCovArray: APP_COV_Item[], sources: SourceItem[]): TreeNode[] {
  // 将源数据按 ID 分组
  const sourceMap = new Map<string, SourceItem[]>();
  for (const source of sources) {
    if (!sourceMap.has(source.ID)) {
      sourceMap.set(source.ID, []);
    }
    sourceMap.get(source.ID)!.push(source);
  }

  // 筛选出有匹配数据的父节点，并转换格式
  const result: TreeNode[] = [];

  for (const item of appCovArray) {
    const matchedSources = sourceMap.get(item.AppApplicationID);
    
    // 只创建有匹配数据的父节点
    if (matchedSources && matchedSources.length > 0) {
      const children: TreeNode[] = matchedSources.map((source) => ({
        ID: source.ID,
        value: source.value,
        checked: false,
        hidden: false,
        children: [],
      }));

      result.push({
        ID: item.AppApplicationID,
        value: item.AppApplicationName,
        checked: false,
        hidden: false,
        children: children,
      });
    }
  }

  return result;
}

// 使用示例
// const result = buildTreeWithOnlyMatchedParents(APP_COV, sourcesData);
// console.log(result);p
