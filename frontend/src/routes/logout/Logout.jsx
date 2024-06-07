import React, { useEffect } from "react";

import useLogout from "../../hooks/useLogout";
function Logout() {
  const { logout } = useLogout();
  useEffect(() => {
    logout();
  }, []);
  return <div>Logout</div>;
}

export default Logout;
