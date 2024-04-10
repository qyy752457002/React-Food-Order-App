import { useCallback, useEffect, useState } from 'react';

// 发送 HTTP 请求的异步函数
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  // 如果响应不成功，则抛出错误
  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

// 自定义 Hook：处理 HTTP 请求
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData); // 数据状态
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const [error, setError] = useState(); // 错误状态

  // 清除数据的函数
  function clearData() {
    setData(initialData);
  }

  // 发送请求的回调函数，使用 useCallback 优化性能
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // 设置加载状态为 true
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData); // 更新数据
      } catch (error) {
        setError(error.message || 'Something went wrong!'); // 处理错误
      }
      setIsLoading(false); // 设置加载状态为 false
    },
    [url, config]
  );

  // 使用 useEffect 监听配置变化，如果是 GET 请求或者配置为空，则发送请求
  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // 返回数据、加载状态、错误信息、发送请求函数和清除数据函数
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}

