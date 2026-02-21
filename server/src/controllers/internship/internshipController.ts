import type { Request, Response } from "express";
import {
  deleteInternshipService,
  getAllInternships,
  getInternshipById,
  makeInternshipService,
  updateInternshipService,
} from "../../services/internship/internshipService";
import { type ParamsDictionary } from "express-serve-static-core";
import { MakeInternshipDTO, UpdateInternshipDTO } from "src/b/b2";

interface GetInternshipRequestParams extends ParamsDictionary {
  id: string;
}

export const getInternships = async (req: Request, res: Response) => {
  try {
    const internships = await getAllInternships();

    return res.status(200).send(internships);
  } catch (error) {
    console.error("Server error - getInternships ", error);
    return res.status(500).send("Server error");
  }
};

export const getInternship = async (
  req: Request<GetInternshipRequestParams>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const internship = await getInternshipById(id);

    return res.status(200).send(internship);
  } catch (error) {
    console.error("Server error - getInternship ", error);
    return res.status(500).send("Server error");
  }
};

export const makeInternship = async (
  req: Request<{}, {}, MakeInternshipDTO>,
  res: Response,
) => {
  const { title, companyName, startDate, endDate } = req.body;
  try {
    if (!title || !companyName || !startDate || !endDate) {
      res.status(400).send("Missing fields");
    }
    const response = await makeInternshipService(req.body);

    return res.send(response);
  } catch (error) {
    console.error("Server error - makeInternship ", error);
    return res.status(500).send("Server error");
  }
};

export const updateInternship = async (
  req: Request<GetInternshipRequestParams, UpdateInternshipDTO>,
  res: Response,
) => {
  const { id } = req.params;
  const { title, companyName, startDate, endDate } = req.body;
  try {
    const updatedInternship = await updateInternshipService(id, req.body);

    return res.status(200).send(updatedInternship);
  } catch (error: any) {
    if (error.message && error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }
    console.error("Server error - updateInternship ", error);
    return res.status(500).send("Server error");
  }
};

export const deleteInternship = async (
  req: Request<GetInternshipRequestParams>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const response = await deleteInternshipService(id);

    return res.status(200).send(response);
  } catch (error) {
    console.error("[deleteInternship Controller Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while deleting the internship.",
    });
  }
};
