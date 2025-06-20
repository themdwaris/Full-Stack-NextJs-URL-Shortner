"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const URLContext = createContext();
export const URLContextProvider = ({ children }) => {
  const [statsData, setStatsData] = useState([]);
  const [allURLs, setAllURLs] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/currentUser");
      if (res?.data?.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Failed to fetch current user::", error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res?.data?.success) {
        setUser(null);
        toast.success(res.data.message);
        router.push("/");
        setOpenMenu(false);
      }
    } catch (error) {
      console.log("Failed to logout::", error);
    }
  };

  const getAllURLs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/shorten");
      if (res?.data?.success) {
        setLoading(false);
        setAllURLs(res.data.urls);
        
        
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch user urls::", error);
    }
  };
  useEffect(() => {
    getAllURLs();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);
  
  return (
    <URLContext.Provider
      value={{
        statsData,
        setStatsData,
        getCurrentUser,
        user,
        setUser,
        router,
        logout,
        openMenu,
        setOpenMenu,
        loading,
        setLoading,
        getAllURLs,
        allURLs,
        
      }}
    >
      {children}
    </URLContext.Provider>
  );
};

export const useURL = () => useContext(URLContext);
