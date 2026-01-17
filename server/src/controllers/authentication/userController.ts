import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { getUser, makeUser } from "../../services/authentication/userService";
import jwtGenerator from "src/utils/jwtGenerator";

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export const registerHandler = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
) => {
  const { username, email, password } = req.body;

  try {
    const user = await getUser(email);

    if (user === 0) {
      return res.status(401).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await makeUser(username, email, bcryptPassword);

    const jwtToken = jwtGenerator(newUser.id, newUser.username);

    return res.json({ jwtToken });
  } catch (err) {
    console.error("Failed to register user");
    if (err instanceof Error) {
      return res.status(500).send("Server error");
    }
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
) => {};
