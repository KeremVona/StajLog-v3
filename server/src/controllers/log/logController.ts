import { type Request, type Response } from "express";
import { type ParamsDictionary } from "express-serve-static-core";
import { getAllLogs, getLogById } from "../../services/log/logService";

interface GetLogRequestParams extends ParamsDictionary {
  id: string;
}

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getAllLogs();

    return res.status(200).send(logs);
  } catch (error) {
    console.error("Server error - getLogs ", error);
    return res.status(500).send("Server error");
  }
};

export const getLog = async (
  req: Request<GetLogRequestParams>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const log = await getLogById(id);

    return res.status(200).send(log);
  } catch (error) {
    console.error("Server error - getLog ", error);
    return res.status(500).send("Server error");
  }
};
