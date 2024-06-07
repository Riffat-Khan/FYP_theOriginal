import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useAuth();

  const login = async function (data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/auth/login`, data);
      if (response.error) {
        throw new Error(response.error);
      }
      localStorage.setItem("user-token", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export default useLogin;
