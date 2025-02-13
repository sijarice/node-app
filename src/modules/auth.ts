import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, name: user.name },
    (process.env.JWT_SECRET as string) || "default_secret",
    {
      expiresIn: "1h",
    }
  );

  return token;
};
