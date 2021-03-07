import { useState, useEffect } from "react";
import { getUsers } from "./index";

function UserService(param) {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    let isUnmounted = false;

    const fetchData = async () => {
      const result = await getUsers(param);
      if (!isUnmounted) {
        setData(result.data);
      }
    };

    fetchData();

    return () => (isUnmounted = !isUnmounted);
  }, [param]);

  return data;
}

export default UserService;
