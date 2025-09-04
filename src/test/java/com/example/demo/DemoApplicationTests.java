package com.example.demo;

import com.example.demo.utill.StrategyContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest()
class DemoApplicationTests {
    @Autowired
    private StrategyContext context;

    @Test
    public  void testServiceMethod() {
        /***
         *
         * #Stage 1 Test  use StrategyA
         * ****/
        //  Param: code:1     str-Testing strings
        //  use  2 repeated characters，The expectation is to operate normally and the output is equal to the input
        context.getInstance(1).method("aabccbbad");

        //  Param: code:1     str-Testing strings
        //  use  normal string, Expect normal operation, output results step by step to remove duplicates
        context.getInstance(1).method("aabcccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, with only the first three duplicate letters removed from the output
        context.getInstance(1).method("aabccccbbad");

        //  use  6 repeated characters,This is expected to work, output results step by step to remove duplicates
        context.getInstance(1).method("aabccccccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,Expected to work correctly, case sensitive, and without 3 consecutive repeating characters
        context.getInstance(1).method("aabCccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and just removed "ccc",and keep bBad
        context.getInstance(1).method("aabcccbBad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and characters will not be removed
        context.getInstance(1).method("aabcCccBbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(1).method("aab1ccccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(1).method("aab1bccccB bad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep " "
        context.getInstance(1).method("aab1bc  cccB bad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep "***"
        context.getInstance(1).method("aab1bc***cccB bad");


        /***
         *
         * #Stage 2 Test,
         *
         ***/

        //  use  2 repeated characters，The expectation is to operate normally and the output is equal to the input
        context.getInstance(2).method("aabccbbad");

        //  Param: code:2     str-Testing strings
        //  use  normal string, Expect normal operation, output results step by step to remove duplicates
        context.getInstance(2).method("aabcccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, with only the first three duplicate letters removed from the output
        context.getInstance(2).method("aabccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  6 repeated characters,This is expected to work, output results step by step to remove duplicates
        context.getInstance(2).method("aabccccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,Expected to work correctly, case sensitive, and without 3 consecutive repeating characters
        context.getInstance(2).method("aabCccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and just removed "ccc",and keep bBad
        context.getInstance(2).method("aabcccbBad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and characters will not be removed
        context.getInstance(2).method("aabcCccBbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(2).method("aab1ccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(2).method("aab1bccccB bad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep " "
        context.getInstance(2).method("aab1bc  cccB bad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep "***"
        context.getInstance(2).method("aab1bc***cccB bad");
    }<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AG Grid 单元格内Tab导航</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.5/styles/ag-grid.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.5/styles/ag-theme-alpine.css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            background-color: #f5f7f9;
        }
        .container {
            display: flex;
            flex-direction: column;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .description {
            background-color: #e8f4fc;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .grid-container {
            height: 500px;
        }
        .action-cell {
            display: flex;
            gap: 8px;
            padding: 5px 0;
        }
        .action-button {
            padding: 4px 8px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
        .btn-edit {
            background-color: #4CAF50;
            color: white;
        }
        .btn-delete {
            background-color: #f44336;
            color: white;
        }
        .btn-view {
            background-color: #2196F3;
            color: white;
        }
        .instructions {
            margin-top: 20px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #2196F3;
        }
        code {
            background-color: #eee;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>AG Grid 单元格内Tab键导航</h1>
        
        <div class="description">
            <p>此示例演示了如何在AG Grid的单元格内使用Tab键在按钮元素之间导航。使用<code>Tab</code>键可以在单元格内的按钮之间移动焦点，当到达最后一个按钮时，再次按<code>Tab</code>会移动到下一个单元格。</p>
        </div>

        <div id="myGrid" class="ag-theme-alpine grid-container"></div>

        <div class="instructions">
            <h3>使用说明：</h3>
            <ul>
                <li>使用<code>Tab</code>键在单元格之间导航</li>
                <li>当单元格包含按钮时，使用<code>Tab</code>键在按钮之间导航</li>
                <li>使用<code>Shift+Tab</code>键反向导航</li>
                <li>使用<code>Enter</code>或<code>Space</code>键点击获得焦点的按钮</li>
            </ul>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.5/dist/ag-grid-community.min.js"></script>
    <script>
        // 自定义单元格渲染器，包含多个按钮
        function ActionCellRenderer() {}
        ActionCellRenderer.prototype.init = function(params) {
            this.eGui = document.createElement('div');
            this.eGui.className = 'action-cell';
            
            this.buttons = [
                { text: '编辑', class: 'btn-edit' },
                { text: '删除', class: 'btn-delete' },
                { text: '查看', class: 'btn-view' }
            ];
            
            this.buttons.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn.text;
                button.className = `action-button ${btn.class}`;
                button.addEventListener('click', () => {
                    alert(`点击了: ${btn.text} - 行 ${params.node.rowIndex + 1}`);
                });
                this.eGui.appendChild(button);
            });
            
            // 为所有按钮添加tabindex属性
            this.eGui.querySelectorAll('button').forEach(button => {
                button.setAttribute('tabindex', '-1');
            });
        };
        ActionCellRenderer.prototype.getGui = function() {
            return this.eGui;
        };
        ActionCellRenderer.prototype.focus = function() {
            if (this.eGui.querySelector('button')) {
                this.eGui.querySelector('button').setAttribute('tabindex', '0');
                this.eGui.querySelector('button').focus();
            }
        };

        // 列定义
        const columnDefs = [
            { headerName: "ID", field: "id", width: 80 },
            { headerName: "产品名称", field: "product", width: 150 },
            { headerName: "价格", field: "price", width: 120 },
            { headerName: "数量", field: "quantity", width: 100 },
            { 
                headerName: "操作", 
                field: "actions", 
                width: 300,
                cellRenderer: ActionCellRenderer,
                cellClass: 'action-cell',
                suppressNavigable: false,
                // 启用单元格内的Tab键导航
                enableCellTextSelection: true,
                suppressKeyboardEvent: function(params) {
                    // 处理Tab键事件
                    if (params.event.key === 'Tab') {
                        const focusableElements = params.eCell.querySelectorAll('button');
                        const activeElement = document.activeElement;
                        
                        // 检查当前焦点是否在单元格内
                        if (Array.from(focusableElements).includes(activeElement)) {
                            const currentIndex = Array.from(focusableElements).indexOf(activeElement);
                            
                            if (!params.event.shiftKey) {
                                // 向前Tab
                                if (currentIndex < focusableElements.length - 1) {
                                    // 移动到下一个按钮
                                    focusableElements[currentIndex].setAttribute('tabindex', '-1');
                                    focusableElements[currentIndex + 1].setAttribute('tabindex', '0');
                                    focusableElements[currentIndex + 1].focus();
                                    return true; // 阻止默认行为
                                } else {
                                    // 移动到下一个单元格
                                    focusableElements[currentIndex].setAttribute('tabindex', '-1');
                                    return false; // 允许默认行为
                                }
                            } else {
                                // 向后Tab (Shift+Tab)
                                if (currentIndex > 0) {
                                    // 移动到上一个按钮
                                    focusableElements[currentIndex].setAttribute('tabindex', '-1');
                                    focusableElements[currentIndex - 1].setAttribute('tabindex', '0');
                                    focusableElements[currentIndex - 1].focus();
                                    return true; // 阻止默认行为
                                } else {
                                    // 移动到上一个单元格
                                    focusableElements[currentIndex].setAttribute('tabindex', '-1');
                                    return false; // 允许默认行为
                                }
                            }
                        }
                    }
                    return false;
                }
            },
            { headerName: "状态", field: "status", width: 120 }
        ];

        // 示例数据
        const rowData = [
            { id: 1, product: "笔记本电脑", price: 1200, quantity: 15, status: "有库存" },
            { id: 2, product: "智能手机", price: 800, quantity: 0, status: "缺货" },
            { id: 3, product: "平板电脑", price: 600, quantity: 8, status: "有库存" },
            { id: 4, product: "耳机", price: 150, quantity: 20, status: "有库存" },
            { id: 5, product: "键盘", price: 100, quantity: 5, status: "有库存" },
            { id: 6, product: "鼠标", price: 50, quantity: 0, status: "缺货" },
            { id: 7, product: "显示器", price: 300, quantity: 12, status: "有库存" },
            { id: 8, product: "打印机", price: 250, quantity: 3, status: "有库存" }
        ];

        // Grid选项
        const gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            rowHeight: 60,
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true
            },
            suppressKeyboardEvent: function(params) {
                // 全局处理Tab键事件
                if (params.event.key === 'Tab') {
                    const focusedCell = params.api.getFocusedCell();
                    if (focusedCell && focusedCell.column.colId === 'actions') {
                        // 对于操作列，我们已经在列级别处理了Tab键
                        return false;
                    }
                }
                return false;
            },
            onCellFocused: function(event) {
                // 当单元格获得焦点时，如果是操作列，则聚焦到第一个按钮
                if (event.column && event.column.colId === 'actions') {
                    const cellElement = event.api.getCellRendererInstances({
                        rowNodes: [event.node],
                        columns: [event.column]
                    })[0];
                    if (cellElement && cellElement.focus) {
                        setTimeout(() => {
                            cellElement.focus();
                        }, 10);
                    }
                }
            }
        };

        // 初始化Grid
        document.addEventListener('DOMContentLoaded', function() {
            const gridDiv = document.querySelector('#myGrid');
            new agGrid.Grid(gridDiv, gridOptions);
        });
    </script>
</body>
</html>

}
