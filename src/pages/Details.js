import React from "react";

const Details = ({ isOpen, onClose, complaint }) => {
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
          <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Student ID:</strong> {complaint.student_id}</p>
          <p><strong>Email:</strong> {complaint.email}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
