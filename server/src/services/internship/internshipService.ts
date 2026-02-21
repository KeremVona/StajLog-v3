import { Internship } from "@prisma/client";
import { MakeInternshipDTO, UpdateInternshipDTO } from "../../b/b2";
import { prisma } from "../../prisma";
import { handlePrismaError } from "../../utils/errorHandler";

export const getAllInternships = async (): Promise<Internship[]> => {
  const internships = await prisma.internship.findMany();

  return internships;
};

export const getInternshipById = async (id: string): Promise<Internship> => {
  const internship = await prisma.internship.findFirst({
    where: { id: id },
  });

  if (!internship) {
    throw new Error(`Internship with ID ${id} not found`);
  }

  return internship;
};

export async function makeInternshipService(
  internshipData: MakeInternshipDTO,
): Promise<Internship> {
  try {
    const newInternship = await prisma.internship.create({
      data: {
        title: internshipData.title,
        companyName: internshipData.companyName,

        startDate: new Date(internshipData.startDate),

        ...(internshipData.endDate && {
          endDate: new Date(internshipData.endDate),
        }),
        ...(internshipData.templateId && {
          templateId: internshipData.templateId,
        }),

        userId: internshipData.userId,
      },
    });

    return newInternship;
  } catch (error: unknown) {
    handlePrismaError(error, "Failed to make the daily log. Please try again.");
    throw error;
  }
}

export const updateInternshipService = async (
  id: string,
  updateData: UpdateInternshipDTO,
): Promise<Internship> => {
  try {
    const dataToUpdate: any = { ...updateData };

    if (updateData.startDate) {
      dataToUpdate.startDate = new Date(updateData.startDate);
    }

    if (updateData.endDate !== undefined) {
      dataToUpdate.endDate = updateData.endDate
        ? new Date(updateData.endDate)
        : null;
    }

    const updatedInternship = await prisma.internship.update({
      where: {
        id: id,
      },
      data: dataToUpdate,
    });

    return updatedInternship;
  } catch (error: unknown) {
    handlePrismaError(
      error,
      "Failed to update the daily log. Please try again.",
    );
    throw new Error("Failed to update internship. It may not exist.");
  }
};

export const deleteInternshipService = async (id: string) => {
  try {
    await prisma.internship.delete({ where: { id: id } });

    return { success: true };
  } catch (error: unknown) {
    handlePrismaError(
      error,
      "Failed to delete the internship log. Please try again.",
    );
  }
};
