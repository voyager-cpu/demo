// 第一张图片的数据类型（源子节点数据）
interface SourceItem {
  ID: string;
  value: string;
  Checked: boolean;
  Hidden: boolean;
}

// 第二张图片的数据类型（静态文件导出的 APP_COV 数组）
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
 * 将源数据匹配到 APP_COV 数组的 children 中（支持一个父节点匹配多个子节点）
 * @param appCovArray - 第二张图片的静态数据（export const APP_COV）
 * @param sources - 第一张图片的源数据列表
 * @returns TreeNode[] 树形结构数组
 */
function buildTreeFromAPPCOV(appCovArray: APP_COV_Item[], sources: SourceItem[]): TreeNode[] {
  // 将源数据按 ID 分组，支持一对多匹配
  const sourceMap = new Map<string, SourceItem[]>();
  
  for (const source of sources) {
    if (!sourceMap.has(source.ID)) {
      sourceMap.set(source.ID, []);
    }
    sourceMap.get(source.ID)!.push(source);
  }

  // 转换 APP_COV 数据为 TreeNode 格式
  const result: TreeNode[] = appCovArray.map((item) => {
    // 查找匹配的源数据列表（通过 AppApplicationID 匹配 source.ID）
    const matchedSources = sourceMap.get(item.AppApplicationID) || [];

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
      ID: item.AppApplicationID,
      value: item.AppApplicationName,
      checked: false,
      hidden: false,
      children: children,
    };
  });

  return result;
}

// 使用示例
// 导入静态数据
// import { APP_COV } from './path/to/static/file';

// 第一张图片的数据
// const sourcesData: SourceItem[] = [ ... ];

// 调用方法
// const resultArray: TreeNode[] = buildTreeFromAPPCOV(APP_COV, sourcesData);
// console.log(resultArray);
