import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useAuth();

  const register = async function (data, apiRoute) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/auth/${apiRoute}`, data);
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

  return { register, loading, error };
}

export default useRegister;
