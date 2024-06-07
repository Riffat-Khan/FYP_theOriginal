import React, { useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import useService from "../../hooks/useService";

import ServiceList from "../../components/serviceList";

function HomePage() {
  const { loading, error, getService } = useService();
  useEffect(() => {
    getService();
  }, []);
  return (
    <div>
      <div className="">
        <Link
          to={"/services"}
          className="btn btn-block btn-neutral mt-10 max-w-max"
        >
          Create a new Service
        </Link>
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

export default HomePage;
