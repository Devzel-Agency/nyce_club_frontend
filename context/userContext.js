"use client";
import GetUserApi from "@/apis/user/GetUserApi";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const data = await GetUserApi(token);
          if (data) {
            dispatch({ type: "SET_USER", payload: data });
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[100vh]">
        {/* <Logo /> */}
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
