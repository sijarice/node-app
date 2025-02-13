import prisma from "../db";
import { hashPassword } from "../modules/auth";
import { createJWT } from "../modules/auth";

export const createUser = async (req: any, res: any) => {
  const { email, password } = req.body;

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
    },
  });

  const jwtToken = createJWT(newUser);
  res.status(201).json({ token: jwtToken });
};
