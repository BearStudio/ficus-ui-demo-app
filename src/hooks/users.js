import { useCallback, useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("https://randomuser.me/api/?results=20");
    const usersList = await response.json();
    setUsers(usersList?.results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, isLoading, refresh: loadUsers };
};

export const useUserImages = () => {
  const [userImages, setUserImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserImages = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=99&api_key=live_whEz0shCysEZqNdb8crnpfaCgIgx328c5YBHzNVDTpDUAEBrIzUOfBvCWJ43Jhjk"
    );
    const images = await response.json();
    setUserImages(images);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserImages();
  }, [loadUserImages]);

  return { userImages, isLoading, refresh: loadUserImages };
};
