import axios from "axios";

export const getComplaints = async () => {
  const response = await axios.get("http://localhost:8080/handle/complaints");
  return response;
};

// single complaint
export const getComplaint = async () => {
  const response = await axios.get("http://localhost:8080/handle/complaints/:id");
  console.log(response);
  return response;
};
