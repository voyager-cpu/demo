const fetchMultipleConcurrent = async (paramsList) => {
  const promises = paramsList.map(param => 
    fetch(`/api/data?param=${param}`).then(res => res.json())
  );
  
  try {
    const results = await Promise.all(promises);
    // ✅ 所有请求都完成了，results 是按参数顺序的结果数组
    console.log('全部完成', results);
    // 执行下一步
    doNextStep(results);
  } catch (error) {
    console.error('某个请求失败', error);
  }
};

// 使用示例：同时请求 id 为 1,2,3 的数据
fetchMultipleConcurrent([1, 2, 3]);
