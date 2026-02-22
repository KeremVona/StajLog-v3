import API from "../../api/api";
import type { InternshipData } from "../../b/b3";

const getAllInternships = async (): Promise<InternshipData[]> => {
  const response = await API.get("/internship/");

  return response.data;
};

const getInternshipById = async (id: string): Promise<InternshipData> => {
  const response = await API.get(`/internship/${id}`);

  return response.data;
};

const makeInternship = async (
  internshipData: InternshipData,
): Promise<InternshipData> => {
  const response = await API.post("/internship/", internshipData);

  return response.data;
};

const updateInternship = async (params: {
  id: string;
  internshipData: InternshipData;
}): Promise<InternshipData> => {
  const { id, internshipData } = params;
  const response = await API.put(`/internship/${id}`, internshipData);

  return response.data;
};

const deleteInternship = async (id: string) => {
  await API.delete(`/internship/${id}`);

  return id;
};

const internshipService = {
  getAllInternships,
  getInternshipById,
  makeInternship,
  updateInternship,
  deleteInternship,
};

export default internshipService;
