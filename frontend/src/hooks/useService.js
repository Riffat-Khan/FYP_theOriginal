import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { create } from "zustand";

export const useStore = create((set) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
  updateServiceStatus: (id, status) =>
    set((state) => ({
      ...state,
      services: state.services.map((service) =>
        service.id === id ? { ...service, status } : service
      ),
    })),
}));

function useService() {
  const { user } = useAuth();
  const { setServices } = useStore();
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

  const getService = async () => {
    const apiRoute = user.role === "care-taker" ? "all" : "";
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
      setServices({ services: response.data });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const acceptService = async (serviceID) => {
    if (user.role === "user") {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/service/accept/${serviceID}`,
        null,
        {
          headers: {
            token: user.token,
          },
        }
      );
      if (response.error) {
        throw new Error(response.error);
      }

      updateServiceStatus(serviceID, "accepted");
      setServices;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (data) => {
    if (user.role === "care-taker") {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/service/update/${serviceID}`,
        data,
        {
          headers: {
            token: user.token,
          },
        }
      );
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

  return {
    loading,
    error,
    createService,
    getService,
    acceptService,
    updateService,
  };
}

export default useService;
