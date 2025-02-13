import prisma from "../db";

export const createProfile = async (req: any, res: any) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const profile = await prisma.profile.create({
    data: {
      bio: req.body.bio,
      userId: user.id,
    },
  });

  res.status(201).json(profile);
};
