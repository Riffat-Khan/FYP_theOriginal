import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("user-token");
    setUser(null);
    navigate("/login");
  };

  return { logout };
}

export default useLogout;
