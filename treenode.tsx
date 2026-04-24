// 第一张图片的数据类型（源子节点数据）
interface SourceItem {
  ID: string;
  value: string;
  Checked: boolean;
  Hidden: boolean;
}

// 第二张图片的数据类型（父级数据）
interface ParentItem {
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
 * 将源数据匹配到父级数据的 children 中（支持一个父节点匹配多个子节点）
 * @param parents - 第二张图片的父级数据列表
 * @param sources - 第一张图片的源数据列表
 * @returns TreeNode[] 树形结构数组
 */
function buildTree(parents: ParentItem[], sources: SourceItem[]): TreeNode[] {
  // 将源数据按 ID 分组，支持一对多匹配
  const sourceMap = new Map<string, SourceItem[]>();
  
  for (const source of sources) {
    if (!sourceMap.has(source.ID)) {
      sourceMap.set(source.ID, []);
    }
    sourceMap.get(source.ID)!.push(source);
  }

  // 转换父级数据为 TreeNode 格式
  const result: TreeNode[] = parents.map((parent) => {
    // 查找匹配的源数据列表
    const matchedSources = sourceMap.get(parent.AppApplicationID) || [];

    // 构建 children
    const children: TreeNode[] = matchedSources.map((source) => ({
      ID: source.ID,
      value: source.value,
      checked: false,
      hidden: false,
      children: [],
    }));

    // 返回父节点
    return {
      ID: parent.AppApplicationID,
      value: parent.AppApplicationName,
      checked: false,
      hidden: false,
      children: children,
    };
  });

  return result;
}

// 使用示例
// const parentsData: ParentItem[] = [ ... ];
// const sourcesData: SourceItem[] = [ ... ];
// const resultArray: TreeNode[] = buildTree(parentsData, sourcesData);
// console.log(resultArray);
