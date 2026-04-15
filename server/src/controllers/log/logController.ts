import { type Request, type Response } from "express";
import { type ParamsDictionary } from "express-serve-static-core";
import { LogData } from "../../b/b1";
import {
  deleteLogService,
  getAllLogs,
  getLogById,
  makeLogService,
  updateLogService,
  improveLog,
} from "../../services/log/logService";

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
    if (originalContent === undefined && finalContent === undefined) {
      return res.status(400).json({
        success: false,
        error:
          "Please provide at least one field to update (originalContent or finalContent).",
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

    return res.status(200).json({ id, success: true });
  } catch (error) {
    console.error("[deleteLog Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while deleting the log.",
    });
  }
};

export const improveLogHandler = async (
  req: Request<GetLogRequestParams, string>,
  res: Response,
) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (content === undefined) {
      return res.status(400).json({
        success: false,
        error: "Please provide log content to improve.",
      });
    }

    const improvedLog = await updateLogService(id, req.body);

    return res.status(200).send(improvedLog);
  } catch (error: any) {
    if (error.message && error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }

    console.error("[improveLogHandler Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating the log.",
    });
  }
};
