在React中，两个子页面之间的通信可以通过多种方式实现。以下是最常用的几种方法：

## 1. **通过父组件传递状态和回调函数**（推荐）

这是React中最标准的方式，通过状态提升（lifting state up）：

```jsx
// ParentComponent.js
import { useState } from 'react';
import PageA from './PageA';
import PageB from './PageB';

function ParentComponent() {
  const [sharedData, setSharedData] = useState('');
  const [message, setMessage] = useState('');

  // 处理从子页面发送的消息
  const handleMessageFromPageA = (data) => {
    setMessage(`来自PageA: ${data}`);
    // 可以根据需要将数据传递给PageB
  };

  const handleMessageFromPageB = (data) => {
    setMessage(`来自PageB: ${data}`);
  };

  return (
    <div>
      <PageA 
        onSendMessage={handleMessageFromPageA}
        sharedData={sharedData}
      />
      <PageB 
        onSendMessage={handleMessageFromPageB}
        sharedData={sharedData}
        message={message}
      />
    </div>
  );
}

// PageA.js
function PageA({ onSendMessage, sharedData }) {
  const handleClick = () => {
    // 发送消息到父组件
    onSendMessage('Hello from PageA');
  };

  return (
    <div>
      <h1>Page A</h1>
      <button onClick={handleClick}>发送消息到PageB</button>
      <p>来自共享数据: {sharedData}</p>
    </div>
  );
}

// PageB.js
function PageB({ onSendMessage, message, sharedData }) {
  return (
    <div>
      <h1>Page B</h1>
      <p>收到的消息: {message}</p>
      <p>共享数据: {sharedData}</p>
    </div>
  );
}
```

## 2. **使用React Context API**（适合多层嵌套）

当组件层级较深时，使用Context可以避免"prop drilling"：

```jsx
// 创建Context
import { createContext, useState, useContext } from 'react';

const PageCommunicationContext = createContext();

// Context Provider组件
export function PageCommunicationProvider({ children }) {
  const [pagesData, setPagesData] = useState({
    pageA: '',
    pageB: '',
    messages: []
  });

  const sendMessage = (from, to, message) => {
    setPagesData(prev => ({
      ...prev,
      messages: [...prev.messages, { from, to, message, timestamp: Date.now() }]
    }));
  };

  const updatePageData = (page, data) => {
    setPagesData(prev => ({
      ...prev,
      [page]: data
    }));
  };

  return (
    <PageCommunicationContext.Provider 
      value={{ pagesData, sendMessage, updatePageData }}
    >
      {children}
    </PageCommunicationContext.Provider>
  );
}

// 自定义hook
export const usePageCommunication = () => useContext(PageCommunicationContext);

// PageA.js - 使用Context
function PageA() {
  const { sendMessage, pagesData, updatePageData } = usePageCommunication();

  const handleSend = () => {
    sendMessage('pageA', 'pageB', 'Hello from Page A');
  };

  return (
    <div>
      <h1>Page A</h1>
      <button onClick={handleSend}>发送消息</button>
      <p>来自PageB的数据: {pagesData.pageB}</p>
    </div>
  );
}

// App.js
function App() {
  return (
    <PageCommunicationProvider>
      <PageA />
      <PageB />
    </PageCommunicationProvider>
  );
}
```

## 3. **使用状态管理库**（适合复杂应用）

### Redux Toolkit示例：
```jsx
// store/slices/pageCommunicationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pageCommunicationSlice = createSlice({
  name: 'pageCommunication',
  initialState: {
    messages: [],
    pageAData: null,
    pageBData: null
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setPageAData: (state, action) => {
      state.pageAData = action.payload;
    },
    setPageBData: (state, action) => {
      state.pageBData = action.payload;
    }
  }
});

export const { sendMessage, setPageAData, setPageBData } = pageCommunicationSlice.actions;
export default pageCommunicationSlice.reducer;

// PageA.js
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, setPageAData } from '../store/slices/pageCommunicationSlice';

function PageA() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.pageCommunication.messages);
  const pageBData = useSelector(state => state.pageCommunication.pageBData);

  const handleSend = () => {
    dispatch(sendMessage({
      from: 'pageA',
      to: 'pageB',
      content: 'Hello!',
      timestamp: Date.now()
    }));
  };

  return (
    <div>
      <button onClick={handleSend}>发送到PageB</button>
      <p>PageB的数据: {pageBData}</p>
    </div>
  );
}
```

## 4. **使用自定义事件**（较少使用）

```jsx
// eventBus.js - 创建事件总线
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

export const eventBus = new EventBus();

// PageA.js
import { useEffect } from 'react';
import { eventBus } from './eventBus';

function PageA() {
  useEffect(() => {
    // 监听来自PageB的事件
    const handleMessageFromB = (data) => {
      console.log('收到来自PageB:', data);
    };

    eventBus.on('fromPageB', handleMessageFromB);

    return () => {
      eventBus.off('fromPageB', handleMessageFromB);
    };
  }, []);

  const sendToPageB = () => {
    eventBus.emit('fromPageA', { message: 'Hello PageB!' });
  };

  return (
    <button onClick={sendToPageB}>发送到PageB</button>
  );
}
```

## 5. **使用路由参数/状态传递**

如果使用React Router，可以通过路由状态传递数据：

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

// PageA.js
function PageA() {
  const navigate = useNavigate();

  const goToPageB = () => {
    navigate('/page-b', { 
      state: { 
        fromPageA: 'This data is from Page A',
        timestamp: Date.now()
      }
    });
  };

  return <button onClick={goToPageB}>前往PageB并传递数据</button>;
}

// PageB.js
function PageB() {
  const location = useLocation();
  const dataFromA = location.state?.fromPageA;

  return (
    <div>
      <h1>Page B</h1>
      {dataFromA && <p>来自PageA的数据: {dataFromA}</p>}
    </div>
  );
}
```

## 选择建议：

1. **父子组件通信**：使用props和回调函数
2. **兄弟组件通信**：通过共同的父组件传递状态
3. **多层嵌套组件**：使用Context API
4. **大型复杂应用**：使用Redux、MobX等状态管理库
5. **临时数据传递**：使用路由状态
6. **避免过度设计**：只在必要时引入复杂的状态管理

对于大多数应用，**通过父组件传递状态**或**使用Context API**是最佳选择，因为它们更符合React的设计理念，且易于理解和维护。
