import { useState } from "react";
import axios from "axios";
import { create } from "zustand";

import { useAuth } from "../context/AuthContext";

export const useStore = create((set) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
}));

function useGetServices() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setServices } = useStore();
  const { user } = useAuth();

  const apiRoute = user.role === "care-taker" ? "all" : "";

  const getServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/service/${apiRoute}`, {
        headers: {
          token: user.token,
        },
      });
      if (response.error) {
        throw new Error(response.error);
      }
      //   console.log(response.data);
      setServices({ services: response.data });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getServices, loading, error };
}

export default useGetServices;
