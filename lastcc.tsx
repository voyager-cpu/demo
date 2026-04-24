// 第一张图片的数据类型
interface SourceItem {
  ID: string;
  Value: string;
  Checked: boolean;
  Hidden: boolean;
}

// 第二张图片的数据类型
interface APPCOVItem {
  Key: string;
  AppGroupName: string;
  AppApplicationName: string;
  AppApplicationID: string;
  EventType: string;
  EventAction: string;
  EventContent: string;
}

// 子节点类型（没有 children）
interface ChildNode {
  ID: string;
  Value: string;
  Checked: boolean;
  Hidden: boolean;
}

// 父节点类型
interface ParentNode {
  ID: string;
  Value: string;
  Checked: boolean;
  Hidden: boolean;
  Children: ChildNode[];
}

/**
 * 创建树形结构，只创建在第一张图片中有匹配数据的父节点
 * @param appCovArray - 第二张图片的 APP_COV 数组
 * @param sources - 第一张图片的源数据列表
 * @returns ParentNode[] 数组
 */
function buildTreeWithOnlyMatchedParents(appCovArray: APPCOVItem[], sources: SourceItem[]): ParentNode[] {
  // 将源数据按 ID 分组
  const sourceMap = new Map<string, SourceItem[]>();
  for (const source of sources) {
    if (!sourceMap.has(source.ID)) {
      sourceMap.set(source.ID, []);
    }
    sourceMap.get(source.ID)!.push(source);
  }

  // 筛选出有匹配数据的父节点，并转换格式
  const result: ParentNode[] = [];

  for (const item of appCovArray) {
    const matchedSources = sourceMap.get(item.AppApplicationID);
    
    // 只创建有匹配数据的父节点
    if (matchedSources && matchedSources.length > 0) {
      const children: ChildNode[] = matchedSources.map((source) => ({
        ID: source.ID,
        Value: source.Value,
        Checked: false,
        Hidden: false,
      }));

      result.push({
        ID: item.AppApplicationID,
        Value: item.AppApplicationName,
        Checked: false,
        Hidden: false,
        Children: children,
      });
    }
  }

  return result;
}

// 使用示例
// const resultArray: ParentNode[] = buildTreeWithOnlyMatchedParents(APP_COV, sourcesData);
