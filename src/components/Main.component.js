import React from "react";

const Main = ({ email, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col justify-center items-center py-8">
        <h6>Patan Multiple Campus</h6>
        <h2 className="text-3xl text-slate-700">Complain Management System</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Complaints
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">120+</div>
        </div>
        <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Users
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">90+</div>
        </div>
        <div className="w-full px-4 py-5 bg-amber-200 rounded-lg shadow-lg shadow-orange-400">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Resolved
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">20</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
