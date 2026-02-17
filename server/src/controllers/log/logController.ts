import { type Request, type Response } from "express";
import { type ParamsDictionary } from "express-serve-static-core";
import {
  getAllLogs,
  getLogById,
  makeLogService,
} from "../../services/log/logService";
import { LogData } from "src/b/b1";

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

export const makeLog = async (req: Request<{}, {}, LogData>, res: Response) => {
  try {
    const { dayNumber, date, originalContent, internshipId } = req.body;

    if (dayNumber === undefined || !date || !originalContent || !internshipId) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields. Please provide dayNumber, date, originalContent, and internshipId.",
      });
    }

    const result = await makeLogService(req.body);

    return res.json(result);
  } catch (error: any) {
    if (error.message && error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }

    console.error("[makeLog Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while making the log.",
    });
  }
};
