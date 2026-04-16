function exportCustomExcel() {
    // 完全自定义的数据（与网格数据无关）
    const customRows = [
        { product: '产品A', sales: 12500, region: '华东' },
        { product: '产品B', sales: 8900, region: '华南' },
        { product: '产品C', sales: 15600, region: '华北' }
    ];

    // 自定义的列标题（与网格列定义无关）
    const customHeaders = ['产品名称', '销售额(元)', '销售区域'];

    gridApi.exportDataAsExcel({
        fileName: '自定义报表.xlsx',
        sheetName: '销售数据',
        
        // 完全自定义列标题行
        processHeaderCallback: (params) => {
            // 根据列索引返回对应的自定义标题
            const colIndex = params.column.getColDef().colIndex ?? 
                             params.column.getColDef().headerName;
            const headerMap = {
                product: customHeaders[0],
                sales: customHeaders[1],
                region: customHeaders[2]
            };
            // 根据字段名返回标题
            if (params.column.getColDef().field && 
                headerMap[params.column.getColDef().field]) {
                return headerMap[params.column.getColDef().field];
            }
            // 默认返回原标题（避免异常）
            return params.api.getDisplayNameForColumn(params.column, null);
        },
        
        // 完全自定义数据行内容（不依赖网格原始数据）
        processCellCallback: (params) => {
            const field = params.column.getColDef().field;
            const rowIndex = params.node.rowIndex;
            
            // 使用自定义数据源替代网格数据
            if (customRows[rowIndex]) {
                return customRows[rowIndex][field] ?? '';
            }
            return '';
        },
        
        // 跳过网格原有的所有行（防止原始数据残留）
        shouldRowBeSkipped: (params) => {
            // 当自定义数据行数少于网格实际行数时，跳过多余的行
            return params.node.rowIndex >= customRows.length;
        }
    });
}

function exportSalesReport() {
    // 自定义报表数据（可从任意 API 获取）
    const reportData = [
        { product: '产品A', sales: 12500, region: '华东', growth: '+12%' },
        { product: '产品B', sales: 8900, region: '华南', growth: '+5%' },
        { product: '产品C', sales: 15600, region: '华北', growth: '+18%' },
        { product: '产品D', sales: 7200, region: '西南', growth: '-3%' }
    ];
    
    const columns = ['product', 'sales', 'region', 'growth'];
    const headers = ['产品名称', '销售额', '区域', '同比增长率'];
    
    gridApi.exportDataAsExcel({
        fileName: `销售报表_${new Date().toISOString().slice(0, 10)}.xlsx`,
        sheetName: '销售数据',
        allColumns: true,
        
        processHeaderCallback: (params) => {
            const field = params.column.getColDef().field;
            const idx = columns.indexOf(field);
            return idx !== -1 ? headers[idx] : field;
        },
        
        processCellCallback: (params) => {
            const field = params.column.getColDef().field;
            const rowIdx = params.node.rowIndex;
            
            if (reportData[rowIdx] && reportData[rowIdx][field] !== undefined) {
                let value = reportData[rowIdx][field];
                // 对销售额字段进行格式化
                if (field === 'sales') {
                    return `¥${value.toLocaleString()}`;
                }
                return String(value);
            }
            return '';
        },
        
        shouldRowBeSkipped: (params) => {
            return params.node.rowIndex >= reportData.length;
        },
        
        prependContent: [
            [{ value: '月度销售报表', style: { font: { bold: true, size: 16 } } }],
            [{ value: `生成时间: ${new Date().toLocaleString()}` }],
            [{}]
        ],
        
        appendContent: [
            [{}],
            [{ value: `总销售额: ¥${reportData.reduce((sum, r) => sum + r.sales, 0).toLocaleString()}` }],
            [{ value: `平均增长率: ${(reportData.reduce((sum, r) => sum + parseFloat(r.growth), 0) / reportData.length).toFixed(1)}%` }]
        ]
    });
}
