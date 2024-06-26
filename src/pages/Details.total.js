import React from "react";

const TotalDetails = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
          onClick={onClose}
        >
          X
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4"><u>Student Details</u></h2>
          <p><strong>Student ID:</strong> {total.Sid}</p>
          <p><strong>Name:</strong> {total.name}</p>
          <p><strong>Symbol:</strong> {total.symbol}</p>
          <p><strong>DOB:</strong> {total.DOB}</p>
          <p><strong>Email:</strong> {total.email}</p>
          <p><strong>Address:</strong> {total.address}</p>
          <p><strong>Phone:</strong> {total.phone}</p>
          <p><strong>Program:</strong> {total.program}</p>
          <p><strong>Semester:</strong> {total.semester}</p>
        </div>
      </div>    
    </div>
  );
};

export default TotalDetails;
