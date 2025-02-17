import prisma from "../db";

export const createProfile = async (req: any, res: any) => {
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(req.query.id),
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the profile already exists
  const profile = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return res.status(400).json({ message: "Profile already exists!" });
  }

  const newProfile = await prisma.profile.create({
    data: {
      bio: req.body.bio,
      userId: user.id,
    },
  });

  res.status(201).json(newProfile);
};

export const editProfile = async (req: any, res: any) => {};

export const deleteProfile = async (req: any, res: any) => {
  const { id } = req.params;
  const profile = await prisma.profile.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!profile) {
    return res.status(404).json({ message: "Profile does not exist!" });
  }

  await prisma.profile.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(200).json({ message: "Profile deleted!" });
};
