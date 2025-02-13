import prisma from "../db";

export const createUser = async (req: any, res: any) => {
  const { name, email } = req.body;

  console.log(name, email);

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.status(201).json(user);
};
