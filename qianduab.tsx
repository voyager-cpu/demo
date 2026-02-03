import { useState, useEffect } from 'react';

function MyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 模拟 API 调用
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 在 return 之前控制显示内容
  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>出错了</h2>
        <p>{error}</p>
        <button onClick={fetchData}>重试</button>
      </div>
    );
  }

  if (!data) {
    return <div>暂无数据</div>;
  }

  // 正常页面内容
  return (
    <div>
      <h1>{data.title}</h1>
      {/* 其他内容 */}
    </div>
  );
}
