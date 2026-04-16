gridApi.exportDataAsExcel({
  prependContent: [
    [{ value: '报表标题', style: { font: { bold: true, size: 14 } } }]
  ],
  appendContent: [
    [{ value: '生成时间: ' + new Date().toLocaleString() }]
  ]

gridApi.exportDataAsExcel({
  customMetadata: {
    ExportID: 'EXP-2026-001',
    GeneratedBy: '财务系统',
    Disclaimer: '初步数据，仅供参考'
  }
});


// 导出函数
function exportToExcel() {
  gridApi.exportDataAsExcel({
    // 基础配置
    fileName: '数据报表.xlsx',
    sheetName: '详细数据',
    allColumns: true,
    
    // 数据自定义
    processCellCallback: (params) => {
      if (params.value === null || params.value === undefined) {
        return '';
      }
      // 日期格式化
      if (params.column.getColDef().field === 'createTime') {
        return new Date(params.value).toLocaleDateString();
      }
      return String(params.value);
    },
    
    // 列标题自定义
    processHeaderCallback: (params) => {
      const colDef = params.column.getColDef();
      const headerMap = {
        'userId': '用户ID',
        'userName': '用户名称',
        'amount': '金额(元)'
      };
      return headerMap[colDef.field] || colDef.headerName || colDef.field;
    },
    
    // 表前内容：报表标题
    prependContent: [
      [{ value: '月度销售报表', style: { font: { bold: true, size: 16 } } }],
      [{ value: `生成时间: ${new Date().toLocaleString()}` }],
      [{}]  // 空行分隔
    ],
    
    // 表后内容：统计信息
    appendContent: [
      [{}],  // 空行分隔
      [{ value: `总行数: ${gridApi.getDisplayedRowCount()} 行` }]
    ],
    
    // 页脚配置
    headerFooterConfig: {
      all: {
        footer: [{ value: '第 &[Page] 页 / 共 &[Pages] 页 - 导出时间: &[Date]' }]
      }
    },
    
    // 跳过分组表头（如需导出分组表头则设为 false）
    skipColumnGroupHeaders: true
  });
}

});
