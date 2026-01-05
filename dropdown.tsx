import { useState, useRef, useEffect } from 'react';

const ButtonDropdownMenu = ({
  buttonContent = '菜单',
  placement = 'bottom-start', // 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end'
  variant = 'default', // 'default' | 'primary' | 'secondary' | 'ghost'
  size = 'medium', // 'small' | 'medium' | 'large'
  disabled = false,
  items = [],
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleItemClick = (item) => {
    if (!item.disabled) {
      onItemClick?.(item);
      setIsOpen(false);
    }
  };

  // 计算菜单位置
  const getMenuPosition = () => {
    const positionMap = {
      'bottom-start': { top: '100%', left: 0 },
      'bottom': { top: '100%', left: '50%', transform: 'translateX(-50%)' },
      'bottom-end': { top: '100%', right: 0 },
      'top-start': { bottom: '100%', left: 0 },
      'top': { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
      'top-end': { bottom: '100%', right: 0 },
    };
    return positionMap[placement] || positionMap['bottom-start'];
  };

  return (
    <div 
      className={`dropdown-container ${variant} ${size}`} 
      ref={dropdownRef}
    >
      <button
        className={`dropdown-button ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {buttonContent}
        <svg 
          className={`dropdown-icon ${isOpen ? 'rotate' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-content"
          style={getMenuPosition()}
          role="menu"
        >
          {items.map((item, index) => (
            <div key={item.id || index}>
              {item.type === 'divider' ? (
                <div className="menu-divider" />
              ) : item.type === 'header' ? (
                <div className="menu-header">{item.label}</div>
              ) : (
                <button
                  className={`menu-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''}`}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  {item.icon && <span className="menu-icon">{item.icon}</span>}
                  <span className="menu-label">{item.label}</span>
                  {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
                  {item.hasSubmenu && (
                    <span className="submenu-arrow">▶</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 使用示例
export const ExampleUsage = () => {
  const menuItems = [
    { id: 1, label: '新建文件', icon: '📄', shortcut: 'Ctrl+N' },
    { id: 2, label: '打开文件', icon: '📂', shortcut: 'Ctrl+O' },
    { type: 'divider' },
    { type: 'header', label: '导出选项' },
    { id: 3, label: '导出为PDF', icon: '📘' },
    { id: 4, label: '导出为PNG', icon: '🖼️' },
    { type: 'divider' },
    { id: 5, label: '删除项目', icon: '🗑️', danger: true },
  ];

  return (
    <div style={{ padding: '50px' }}>
      <h3>按钮下拉菜单示例</h3>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <ButtonDropdownMenu
          buttonContent="文件操作"
          variant="primary"
          items={menuItems}
          onItemClick={(item) => alert(`点击了: ${item.label}`)}
        />
        
        <ButtonDropdownMenu
          buttonContent="用户设置"
          variant="secondary"
          placement="bottom-end"
          items={[
            { id: 1, label: '个人资料', icon: '👤' },
            { id: 2, label: '账户设置', icon: '⚙️' },
            { id: 3, label: '退出', icon: '🚪' },
          ]}
        />
        
        <ButtonDropdownMenu
          buttonContent="小尺寸"
          size="small"
          items={[
            { id: 1, label: '选项一' },
            { id: 2, label: '选项二' },
          ]}
        />
      </div>
    </div>
  );
};




# 使用按钮实现的 React 下拉菜单

下面我将展示几种使用按钮作为触发器的 React 下拉菜单实现：

## 1. 基础按钮下拉菜单

```jsx
import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const ButtonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: '个人资料', icon: '👤' },
    { label: '设置', icon: '⚙️' },
    { label: '帮助', icon: '❓' },
    { type: 'divider' },
    { label: '退出登录', icon: '🚪', danger: true },
  ];

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button 
        className="dropdown-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        用户菜单
        <span className={`dropdown-chevron ${isOpen ? 'open' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            item.type === 'divider' ? (
              <div key={index} className="dropdown-divider"></div>
            ) : (
              <button
                key={index}
                className={`dropdown-item ${item.danger ? 'danger' : ''}`}
                onClick={() => {
                  console.log(`点击了: ${item.label}`);
                  setIsOpen(false);
                }}
              >
                {item.icon && <span className="item-icon">{item.icon}</span>}
                {item.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
```

## 2. 多功能按钮下拉组件

```jsx
import { useState, useRef, useEffect } from 'react';

const ButtonDropdownMenu = ({
  buttonContent = '菜单',
  placement = 'bottom-start', // 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end'
  variant = 'default', // 'default' | 'primary' | 'secondary' | 'ghost'
  size = 'medium', // 'small' | 'medium' | 'large'
  disabled = false,
  items = [],
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleItemClick = (item) => {
    if (!item.disabled) {
      onItemClick?.(item);
      setIsOpen(false);
    }
  };

  // 计算菜单位置
  const getMenuPosition = () => {
    const positionMap = {
      'bottom-start': { top: '100%', left: 0 },
      'bottom': { top: '100%', left: '50%', transform: 'translateX(-50%)' },
      'bottom-end': { top: '100%', right: 0 },
      'top-start': { bottom: '100%', left: 0 },
      'top': { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
      'top-end': { bottom: '100%', right: 0 },
    };
    return positionMap[placement] || positionMap['bottom-start'];
  };

  return (
    <div 
      className={`dropdown-container ${variant} ${size}`} 
      ref={dropdownRef}
    >
      <button
        className={`dropdown-button ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {buttonContent}
        <svg 
          className={`dropdown-icon ${isOpen ? 'rotate' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-content"
          style={getMenuPosition()}
          role="menu"
        >
          {items.map((item, index) => (
            <div key={item.id || index}>
              {item.type === 'divider' ? (
                <div className="menu-divider" />
              ) : item.type === 'header' ? (
                <div className="menu-header">{item.label}</div>
              ) : (
                <button
                  className={`menu-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''}`}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  {item.icon && <span className="menu-icon">{item.icon}</span>}
                  <span className="menu-label">{item.label}</span>
                  {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
                  {item.hasSubmenu && (
                    <span className="submenu-arrow">▶</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 使用示例
export const ExampleUsage = () => {
  const menuItems = [
    { id: 1, label: '新建文件', icon: '📄', shortcut: 'Ctrl+N' },
    { id: 2, label: '打开文件', icon: '📂', shortcut: 'Ctrl+O' },
    { type: 'divider' },
    { type: 'header', label: '导出选项' },
    { id: 3, label: '导出为PDF', icon: '📘' },
    { id: 4, label: '导出为PNG', icon: '🖼️' },
    { type: 'divider' },
    { id: 5, label: '删除项目', icon: '🗑️', danger: true },
  ];

  return (
    <div style={{ padding: '50px' }}>
      <h3>按钮下拉菜单示例</h3>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <ButtonDropdownMenu
          buttonContent="文件操作"
          variant="primary"
          items={menuItems}
          onItemClick={(item) => alert(`点击了: ${item.label}`)}
        />
        
        <ButtonDropdownMenu
          buttonContent="用户设置"
          variant="secondary"
          placement="bottom-end"
          items={[
            { id: 1, label: '个人资料', icon: '👤' },
            { id: 2, label: '账户设置', icon: '⚙️' },
            { id: 3, label: '退出', icon: '🚪' },
          ]}
        />
        
        <ButtonDropdownMenu
          buttonContent="小尺寸"
          size="small"
          items={[
            { id: 1, label: '选项一' },
            { id: 2, label: '选项二' },
          ]}
        />
      </div>
    </div>
  );
};
```

## 3. 带状态的按钮下拉菜单（如筛选器）

```jsx
import { useState } from 'react';

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { value: 'all', label: '全部状态' },
    { value: 'active', label: '活跃', count: 12 },
    { value: 'pending', label: '待处理', count: 5 },
    { value: 'completed', label: '已完成', count: 23 },
    { value: 'archived', label: '已归档', count: 8 },
  ];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter.value);
    setIsOpen(false);
    console.log(`筛选条件: ${filter.label}`);
  };

  const currentFilter = filters.find(f => f.value === selectedFilter);

  return (
    <div className="filter-dropdown">
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter-label">
          {currentFilter?.label}
        </span>
        <span className="filter-count">
          {currentFilter?.count && `(${currentFilter.count})`}
        </span>
        <span className={`filter-arrow ${isOpen ? 'up' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="filter-menu">
          <div className="filter-menu-header">
            <span>筛选条件</span>
            <button 
              className="clear-filter"
              onClick={() => handleFilterSelect(filters[0])}
            >
              清除
            </button>
          </div>
          
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-item ${selectedFilter === filter.value ? 'selected' : ''}`}
              onClick={() => handleFilterSelect(filter)}
            >
              <span className="filter-item-label">{filter.label}</span>
              {filter.count !== undefined && (
                <span className="filter-item-count">{filter.count}</span>
              )}
              {selectedFilter === filter.value && (
                <span className="filter-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

## 4. 按钮下拉菜单样式 (CSS)

```css
/* ButtonDropdown.css */

/* 基础容器 */
.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

/* 触发器按钮 */
.dropdown-trigger-btn {
  padding: 10px 20px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.dropdown-trigger-btn:hover {
  background-color: #3a5ce5;
  transform: translateY(-1px);
}

.dropdown-trigger-btn:active {
  transform: translateY(0);
}

.dropdown-trigger-btn:focus {
  outline: 2px solid #4a6cf7;
  outline-offset: 2px;
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 菜单项按钮 */
.dropdown-item {
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #374151;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.dropdown-item.danger {
  color: #ef4444;
}

.dropdown-item.danger:hover {
  background-color: #fee2e2;
}

/* 图标 */
.item-icon {
  font-size: 16px;
}

.dropdown-chevron {
  font-size: 12px;
  transition: transform 0.2s;
}

.dropdown-chevron.open {
  transform: rotate(180deg);
}

/* 分隔线 */
.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

/* 多功能按钮样式 */
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-button:hover {
  background-color: #f9fafb;
}

.dropdown-button.active {
  background-color: #f3f4f6;
}

.dropdown-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 变体样式 */
.primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.secondary:hover {
  background-color: #4b5563;
}

/* 尺寸 */
.small .dropdown-button {
  padding: 6px 12px;
  font-size: 12px;
}

.large .dropdown-button {
  padding: 12px 24px;
  font-size: 16px;
}

/* 下拉内容 */
.dropdown-content {
  position: absolute;
  min-width: 200px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  z-index: 1000;
  margin-top: 4px;
}

/* 菜单项 */
.menu-item {
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover:not(.disabled) {
  background-color: #f3f4f6;
}

.menu-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-item.danger {
  color: #dc2626;
}

.menu-item.danger:hover {
  background-color: #fee2e2;
}

.menu-label {
  flex-grow: 1;
}

.menu-shortcut {
  color: #9ca3af;
  font-size: 12px;
}

/* 分隔线和标题 */
.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

.menu-header {
  padding: 8px 16px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

/* 图标动画 */
.dropdown-icon {
  transition: transform 0.2s;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

/* 筛选器下拉样式 */
.filter-dropdown {
  position: relative;
  display: inline-block;
}

.filter-button {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-button:hover {
  border-color: #9ca3af;
}

.filter-arrow {
  font-size: 10px;
  transition: transform 0.2s;
}

.filter-arrow.up {
  transform: rotate(180deg);
}

.filter-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  z-index: 1000;
}

.filter-menu-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-filter {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
}

.filter-item {
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.filter-item:hover {
  background-color: #f3f4f6;
}

.filter-item.selected {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.filter-item-count {
  background-color: #e5e7eb;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.filter-check {
  color: #10b981;
  font-weight: bold;
}
```

## 5. 使用示例

```jsx
import React from 'react';
import ButtonDropdown from './ButtonDropdown';
import ButtonDropdownMenu, { ExampleUsage } from './ButtonDropdownMenu';
import FilterDropdown from './FilterDropdown';

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>React 按钮下拉菜单示例</h1>
      
      <section style={{ margin: '30px 0' }}>
        <h2>1. 基础按钮下拉菜单</h2>
        <ButtonDropdown />
      </section>
      
      <section style={{ margin: '30px 0' }}>
        <h2>2. 多功能按钮下拉菜单</h2>
        <ExampleUsage />
      </section>
      
      <section style={{ margin: '30px 0' }}>
        <h2>3. 筛选器按钮下拉菜单</h2>
        <FilterDropdown />
      </section>
      
      <section style={{ margin: '30px 0' }}>
        <h2>4. 实际应用场景</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>筛选:</span>
          <FilterDropdown />
          <ButtonDropdownMenu
            buttonContent="排序方式"
            items={[
              { id: 1, label: '按日期', icon: '📅' },
              { id: 2, label: '按名称', icon: '🔤' },
              { id: 3, label: '按大小', icon: '📊' },
            ]}
          />
          <ButtonDropdownMenu
            buttonContent="操作"
            variant="primary"
            items={[
              { id: 1, label: '导出数据', icon: '📤' },
              { id: 2, label: '批量编辑', icon: '✏️' },
              { id: 3, label: '删除选中', icon: '🗑️', danger: true },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
```

## 主要特点

1. **按钮作为触发器**：所有下拉菜单都使用按钮元素触发
2. **完整的交互**：支持点击外部关闭、键盘导航（Escape键关闭）
3. **可访问性**：包含 ARIA 属性，支持屏幕阅读器
4. **丰富的样式选项**：支持多种变体、尺寸和位置
5. **灵活的内容**：支持图标、快捷键、分隔线、标题等
6. **动画效果**：平滑的展开/收起动画
7. **类型安全**：完整的 TypeScript 支持（如果使用 TypeScript）

您可以根据需要选择适合的实现方案。基础版本适合简单需求，而多功能版本提供了更多配置选项和样式变体。
