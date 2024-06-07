import React, { useEffect, Suspense } from "react";
import ServiceList from "../../components/serviceList";

import useService from "../../hooks/useService";

function Dashboard() {
  const { loading, error, getService } = useService();
  useEffect(() => {
    getService();
  }, []);
  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="py-14">
        <h1 className="text-3xl text-start w-full">In-active Services</h1>
        <div className="grid grid-cols-1 gap-4 mt-8">
          <Suspense fallback={<p>Loading...</p>}>
            <ServiceList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
