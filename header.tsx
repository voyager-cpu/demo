在Ag Grid中，有多种方法可以在header中显示行数。以下是几种常见的实现方式：

## 方法1：使用headerTooltip（显示在提示中）

```javascript
columnDefs = [
  {
    headerName: '姓名',
    field: 'name',
    headerTooltip: `当前行数: ${rowCount}`,
    // 动态更新
    headerTooltip(params) {
      const rowCount = params.api.getDisplayedRowCount();
      return `姓名 (共${rowCount}行)`;
    }
  }
]
```

## 方法2：自定义Header组件（推荐）

```javascript
// 创建自定义Header组件
const CustomHeader = (props) => {
  const [rowCount, setRowCount] = useState(0);
  
  useEffect(() => {
    const updateRowCount = () => {
      const count = props.api.getDisplayedRowCount();
      setRowCount(count);
    };
    
    updateRowCount();
    // 监听数据变化
    props.api.addEventListener('modelUpdated', updateRowCount);
    props.api.addEventListener('filterChanged', updateRowCount);
    
    return () => {
      props.api.removeEventListener('modelUpdated', updateRowCount);
      props.api.removeEventListener('filterChanged', updateRowCount);
    };
  }, [props.api]);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>{props.displayName}</span>
      <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
        ({rowCount}行)
      </span>
    </div>
  );
};

// 使用自定义Header
columnDefs = [
  {
    headerName: '姓名',
    field: 'name',
    headerComponent: CustomHeader
  }
]
```

## 方法3：在列标题中直接显示（简单但有限）

```javascript
columnDefs = [
  {
    headerName: '姓名',
    field: 'name',
    // 初始化时设置
    headerName: `姓名 (${rowData.length}行)`
  }
]

// 数据更新时刷新
const updateHeader = (api) => {
  const rowCount = api.getDisplayedRowCount();
  const column = api.getColumn('name');
  column.colDef.headerName = `姓名 (${rowCount}行)`;
  api.refreshHeader();
};
```

## 方法4：在Group Header中显示总行数

```javascript
// 配置默认列定义
defaultColDef = {
  headerComponentParams: {
    template: 
      '<div class="ag-cell-label-container">' +
        '<span ref="eText" class="ag-header-cell-text"></span>' +
        '<span class="row-count"></span>' +
      '</div>'
  }
};

// 初始化时添加监听
onGridReady(params) {
  this.gridApi = params.api;
  
  const updateRowCountDisplay = () => {
    const rowCount = params.api.getDisplayedRowCount();
    document.querySelectorAll('.row-count').forEach(el => {
      el.textContent = `(${rowCount}行)`;
    });
  };
  
  updateRowCountDisplay();
  params.api.addEventListener('modelUpdated', updateRowCountDisplay);
  params.api.addEventListener('filterChanged', updateRowCountDisplay);
}
```

## 方法5：使用HeaderClass和CSS

```javascript
// 添加CSS类
columnDefs = [
  {
    headerName: '姓名',
    field: 'name',
    headerClass: 'with-row-count'
  }
]

// 通过CSS添加伪元素
.ag-header-cell.with-row-count::after {
  content: attr(data-row-count);
  font-size: 12px;
  color: #666;
  margin-left: 5px;
}

// JavaScript更新data属性
const updateHeaderRowCount = (api) => {
  const rowCount = api.getDisplayedRowCount();
  const headers = document.querySelectorAll('.with-row-count');
  headers.forEach(header => {
    header.setAttribute('data-row-count', `(${rowCount}行)`);
  });
};
```

## 完整示例（React）

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const RowCountHeader = (props) => {
  const [rowCount, setRowCount] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    
    const updateRowCount = () => {
      if (isMounted.current && props.api) {
        const count = props.api.getDisplayedRowCount();
        setRowCount(count);
      }
    };

    updateRowCount();
    
    // 添加事件监听
    props.api.addEventListener('modelUpdated', updateRowCount);
    props.api.addEventListener('filterChanged', updateRowCount);
    props.api.addEventListener('sortChanged', updateRowCount);

    return () => {
      isMounted.current = false;
      props.api.removeEventListener('modelUpdated', updateRowCount);
      props.api.removeEventListener('filterChanged', updateRowCount);
      props.api.removeEventListener('sortChanged', updateRowCount);
    };
  }, [props.api]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }}>
      <span>{props.displayName}</span>
      <span style={{
        fontSize: '11px',
        color: '#666',
        backgroundColor: '#f0f0f0',
        padding: '2px 6px',
        borderRadius: '3px',
        marginLeft: '8px'
      }}>
        {rowCount}行
      </span>
    </div>
  );
};

const GridWithRowCount = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const columnDefs = [
    {
      headerName: '姓名',
      field: 'name',
      headerComponent: RowCountHeader,
      flex: 1,
    },
    {
      headerName: '年龄',
      field: 'age',
      headerComponent: RowCountHeader,
      width: 100,
    },
    {
      headerName: '城市',
      field: 'city',
      headerComponent: RowCountHeader,
      flex: 1,
    },
  ];

  // 初始化数据
  useEffect(() => {
    setRowData([
      { name: '张三', age: 25, city: '北京' },
      { name: '李四', age: 30, city: '上海' },
      { name: '王五', age: 28, city: '广州' },
    ]);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
      />
    </div>
  );
};

export default GridWithRowCount;
```

## 建议

1. **推荐使用方法2（自定义Header组件）**，因为它最灵活且性能最好
2. 如果只需要简单显示，可以使用**headerTooltip**
3. 记得在组件卸载时清理事件监听，避免内存泄漏
4. 考虑性能，避免在每次渲染时都重新计算行数

这些方法可以根据你的具体需求进行调整和组合使用。
