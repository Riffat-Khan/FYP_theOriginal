import { useStore } from "../hooks/useService";
import { useAuth } from "../context/AuthContext";

import useService from "../hooks/useService";

function ServiceList() {
  const {
    services: { services },
  } = useStore();

  const { user } = useAuth();
  const { loading, error, acceptService } = useService();

  return services?.length
    ? services.map((service) => (
        <div
          key={service._id}
          className="p-4 bg-white rounded-md min-h-44 shadow-md flex justify-between"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-xl text-start">{service.title}</h2>
            <div className="tooltip" data-tip="Click to Open Chat">
              {user.role === "care-taker" && (
                <p>Created By {service?.createdBy.fullname}</p>
              )}
              {user.role === "user" && (
                <p>Accepted By {service?.modifiedBy?.fullname}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <p>Status: {service.status}</p>
            {user.role === "care-taker" && service.status === "pending" && (
              <>
                <button
                  onClick={() => acceptService(service._id)}
                  disabled={loading}
                  className="btn btn-sm btn-primary"
                >
                  Accept
                </button>
              </>
            )}
            {user.role === "user" && service.status === "pending" && (
              <>
                <button className="btn btn-sm btn-primary">Edit Details</button>
              </>
            )}
          </div>
        </div>
      ))
    : "No Service Found";
}

export default ServiceList;
