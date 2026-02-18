import { type Request, type Response } from "express";
import { type ParamsDictionary } from "express-serve-static-core";
import {
  deleteLogService,
  getAllLogs,
  getLogById,
  makeLogService,
  updateLogService,
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
      error: "An error occurred while making the log.",
    });
  }
};

export const updateLog = async (
  req: Request<GetLogRequestParams, LogData>,
  res: Response,
) => {
  const { id } = req.params;
  const { originalContent, finalContent } = req.body;

  try {
    if (!originalContent || !finalContent) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields. Please provide originalContent and finalContent.",
      });
    }

    const updatedLog = await updateLogService(id, req.body);

    return res.status(200).send(updatedLog);
  } catch (error: any) {
    if (error.message && error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }

    console.error("[updateLog Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating the log.",
    });
  }
};

export const deleteLog = async (
  req: Request<GetLogRequestParams>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    await deleteLogService(id);

    return res.status(200);
  } catch (error) {
    console.error("[deleteLog Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while deleting the log.",
    });
  }
};
