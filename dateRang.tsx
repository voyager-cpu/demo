以下是您需要的基于React和DatePicker的日期范围选择器组件的代码。它使用`react-datepicker`库，提供了开始和结束日期的选择功能。
```jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * 日期范围选择器组件
 * @param {Object} props
 * @param {Date} props.startDate - 开始日期
 * @param {Date} props.endDate - 结束日期
 * @param {Function} props.onChange - 日期变化回调 (dates) => void
 * @param {string} props.placeholderText - 占位文本
 * @param {boolean} props.isClearable - 是否显示清除按钮
 * @param {boolean} props.disabled - 是否禁用
 * @param {string} props.className - 自定义CSS类名
 */
const DateRangePicker = ({
  startDate: externalStartDate,
  endDate: externalEndDate,
  onChange,
  placeholderText = '选择日期范围',
  isClearable = true,
  disabled = false,
  className = '',
  ...restProps
}) => {
  // 内部状态管理（如果未受控）
  const [internalStartDate, setInternalStartDate] = useState(null);
  const [internalEndDate, setInternalEndDate] = useState(null);

  // 使用外部传入的值或内部状态
  const startDate = externalStartDate !== undefined ? externalStartDate : internalStartDate;
  const endDate = externalEndDate !== undefined ? externalEndDate : internalEndDate;

  const handleChange = (dates) => {
    const [newStartDate, newEndDate] = dates;
    
    // 更新内部状态（如果非受控）
    if (externalStartDate === undefined) setInternalStartDate(newStartDate);
    if (externalEndDate === undefined) setInternalEndDate(newEndDate);
    
    // 触发回调
    if (onChange) {
      onChange([newStartDate, newEndDate]);
    }
  };

  return (
    <div className={`date-range-picker ${className}`}>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        placeholderText={placeholderText}
        isClearable={isClearable}
        disabled={disabled}
        {...restProps}
      />
    </div>
  );
};

export default DateRangePicker;
```

## 使用示例

```jsx
import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';

// 受控组件示例
const ControlledDateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div>
      <h3>受控模式</h3>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => setDateRange(dates)}
        placeholderText="请选择日期范围"
      />
      {startDate && endDate && (
        <p>
          已选择: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

// 非受控组件示例
const UncontrolledDateRangePicker = () => {
  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      console.log('日期范围已选择:', start, '至', end);
    }
  };

  return (
    <div>
      <h3>非受控模式</h3>
      <DateRangePicker
        onChange={handleRangeChange}
        placeholderText="选择日期范围"
        isClearable={true}
      />
    </div>
  );
};

export { ControlledDateRangePicker, UncontrolledDateRangePicker };
```

## 安装依赖

```bash
npm install react-datepicker
# 或
yarn add react-datepicker
```

## 组件特性

1. **受控/非受控模式**：支持两种使用方式，通过`startDate`/`endDate` props 控制受控模式
2. **日期范围选择**：内置`selectsRange`属性，用户可选择开始和结束日期
3. **清除按钮**：可配置`isClearable`显示清除按钮
4. **禁用状态**：支持`disabled`属性
5. **完全可定制**：支持透传所有`react-datepicker`的原生属性
6. **回调通知**：通过`onChange`返回选中的日期范围数组

## 高级配置示例

```jsx
// 带限制条件的日期范围选择器
const RestrictedDateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // 限制只能选择未来30天内的日期
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => setDateRange(dates)}
      minDate={new Date()} // 不能选择过去日期
      maxDate={maxDate}     // 最多未来30天
      placeholderText="选择未来30天内的日期范围"
      dateFormat="yyyy/MM/dd"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
};
```

import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';

// 受控组件示例
const ControlledDateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div>
      <h3>受控模式</h3>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => setDateRange(dates)}
        placeholderText="请选择日期范围"
      />
      {startDate && endDate && (
        <p>
          已选择: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

// 非受控组件示例
const UncontrolledDateRangePicker = () => {
  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      console.log('日期范围已选择:', start, '至', end);
    }
  };

  return (
    <div>
      <h3>非受控模式</h3>
      <DateRangePicker
        onChange={handleRangeChange}
        placeholderText="选择日期范围"
        isClearable={true}
      />
    </div>
  );
};

export { ControlledDateRangePicker, UncontrolledDateRangePicker };
