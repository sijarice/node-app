import prisma from "../db";

export const createPost = async (req: any, res: any) => {
  const { title, content, authorId } = req.body;

  // TODO: Add validation for title, content, published, and author - express-validator
  // Author should be a valid user, retrieve user from the database by jwt token

  const id = parseInt(authorId);

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: id,
    },
  });

  res.status(201).json(post);
};
