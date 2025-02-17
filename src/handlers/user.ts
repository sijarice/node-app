import { hashPassword } from "./../modules/auth";
import prisma from "../db";
import { comparePassword } from "../modules/auth";
import { createJWT } from "../modules/auth";

export const createUser = async (req: any, res: any) => {
  const { email, password, name } = req.body;
  const username = name || email.split("@")[0];

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashedPassword = await hashPassword(password);

  // Check if the user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: username,
    },
  });

  const jwtToken = createJWT(newUser);
  res.status(201).json({ token: jwtToken });
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User does not exist!" });
  }
  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect Password!" });
  }

  const token = createJWT(user);
  return res.status(200).json({ token });
};
