import { useCallback, useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const reponse = await fetch("https://randomuser.me/api/?results=20");
    const usersList = await reponse.json();
    setUsers(usersList?.results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, isLoading, refresh: loadUsers };
};
