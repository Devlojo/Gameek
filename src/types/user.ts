import { z } from "zod";

export type TUser = {
  id: number;
  username: string;
  email?: string;
  image: string;
  role: string;
};

export const userListBackSchema = z.object({
  users: z.array(
    z.object({
      id: z.number(),
      username: z.string(),
      email: z.string(),
      role: z.string(),
    }),
  ),
});

export type TUserRole = {
  userRole: string | undefined;
};
