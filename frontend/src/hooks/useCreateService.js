import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function useCreateService() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createService = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/service/create", data, {
        headers: {
          token: user.token,
        },
      });
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createService };
}

export default useCreateService;
