import { useState, useEffect } from "react";
import { getUsers } from "./index";

function UserService(param) {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    let isUnmounted = false; // 设置一个锁来决定是否渲染组件

    const fetchData = async () => {
      const result = await getUsers(param);
      if (!isUnmounted) {
        setData(result.data);
      }
    };

    // 也可以写成 IIFE, 不执行或者不写成 IIFE 就会返回 promise 对象
    // 然而 useEffect 必须返回 undefined 或者一个函数
    fetchData();

    return () => (isUnmounted = !isUnmounted);
  }, []);

  return data;
}

export default UserService;
