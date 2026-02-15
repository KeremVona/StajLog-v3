import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import {
  deleteUser,
  getUser,
  getUserById,
  makeUser,
  updateUser,
} from "../../services/authentication/userService";
import jwtGenerator from "../../utils/jwtGenerator";
import { Prisma } from "@prisma/client";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface GetIdRequestBody {
  id: string;
}

interface UserIdParams {
  userId: string;
}

export const registerHandler = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
) => {
  const { name, email, password } = req.body;

  try {
    const user = await getUser(email);

    if (user != 0) {
      return res.status(401).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await makeUser(name, email, bcryptPassword);

    if (!newUser.fullName) {
      return res.status(401).json("Invalid fullName");
    }

    const jwtToken = jwtGenerator(newUser.id, newUser.fullName);

    return res.json({ jwtToken });
  } catch (err) {
    console.error("Server error - registerHandler");
    if (err instanceof Error) {
      return res.status(500).send("Server error");
    }
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);

    if (user === 0) {
      return res.status(401).json("Invalid email");
    }

    const validPassword = bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json("Invalid pasword");
    }
    if (!user.fullName) {
      return res.status(401).json("Invalid fullName");
    }

    const jwtToken = jwtGenerator(user.id, user.fullName);

    return res.json({ jwtToken });
  } catch (err) {
    console.error("Server error - loginHandler");
    if (err instanceof Error) {
      return res.status(500).send("Server error");
    }
  }
};

export const verifyHandler = async (res: Response) => {
  try {
    return res.json(true);
  } catch (err) {
    console.error("Server error - verifyHandler");
    if (err instanceof Error) {
      return res.status(500).send("Server error");
    }
  }
};

export const getUserIdHandler = async (
  req: Request<{}, {}, GetIdRequestBody>,
  res: Response,
) => {
  try {
    const { id } = req.body;

    const user = await getUserById(id);

    return res.json(user);
  } catch (err) {
    console.error("Server error - getUserIdHandler");
    return res.status(500).send("Server error");
  }
};

export const updateUserController = async (
  req: Request<UserIdParams>,
  res: Response,
) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    delete updateData.id;
    delete updateData.passwordHash;

    const updatedUser = await updateUser(userId, updateData);

    const { passwordHash, ...safeUser } = updatedUser;

    return res.status(200).json({
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found." });
      }
    }

    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

export const deleteUserController = async (
  req: Request<UserIdParams>,
  res: Response,
) => {
  try {
    const userId = req.params.userId;

    await deleteUser(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found." });
      }
    }

    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
