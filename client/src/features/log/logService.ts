import API from "../../api/api";
import type { LogData } from "../../b/b2";

// Get all, get by id, make, update, delete

const getAllLogs = async (): Promise<LogData[]> => {
  const response = await API.get("/log/");

  return response.data;
};

const getLogById = async (id: string): Promise<LogData> => {
  const response = await API.get(`/log/${id}`);

  return response.data;
};

const makeLog = async (logData: LogData): Promise<LogData> => {
  const response = await API.post("/log/", logData);

  return response.data;
};

const updateLog = async (id: string, logData: LogData): Promise<LogData> => {
  const response = await API.put(`/log/${id}`, logData);

  return response.data;
};

const deleteLog = async (id: string) => {
  const response = await API.delete(`/log/${id}`);

  return response.data;
};

const logService = {
  getAllLogs,
  getLogById,
  makeLog,
  updateLog,
  deleteLog,
};

export default logService;
