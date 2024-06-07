import React from "react";
import { useForm } from "react-hook-form";
import useService from "../../hooks/useService";

function Services() {
  const { loading, error, createService } = useService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleData = (data) => {
    createService(data);
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 mt-8 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Service Details
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-center py-2">{error}</p>}
        <form onSubmit={handleSubmit(handleData)} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="w-full input input-bordered"
              {...register("title", {
                required: "Enter a Title",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-start py-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Description</span>
            </label>
            <textarea
              placeholder="Description"
              className="w-full input h-40 resize-none input-bordered"
              {...register("description", {
                required: "Write some Description",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-start py-2">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-neutral">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Services;
