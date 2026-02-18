import { Prisma } from "@prisma/client";

/**
 * Parses database errors and throws clean, human-readable messages.
 * * @param error - The caught error object
 * @param defaultMessage - Fallback message for generic or unknown errors
 */
export const handlePrismaError = (
  error: unknown,
  defaultMessage = "An unexpected database error occurred.",
): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const targets = (error.meta?.target as string[])?.join(", ");
        const fieldText = targets ? ` (${targets})` : "";
        throw new Error(
          `A record with this information${fieldText} already exists.`,
        );
      }
      case "P2025":
        throw new Error(
          "The requested record was not found or has already been deleted.",
        );
      case "P2003":
        throw new Error(
          "Operation failed: A related record does not exist (Foreign Key Constraint).",
        );
      case "P2014":
        throw new Error(
          "The change you are trying to make would violate a required relationship between records.",
        );
      default:
        console.error(`Unhandled Prisma Code [${error.code}]:`, error.message);
        throw new Error("A database operation failed.");
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error("Prisma Validation Error:", error.message);
    throw new Error(
      "Invalid data provided. Please check your inputs and try again.",
    );
  }

  if (error instanceof Error) {
    throw error;
  }

  console.error("Unknown Database Error:", error);
  throw new Error(defaultMessage);
};
