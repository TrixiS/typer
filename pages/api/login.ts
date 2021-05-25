import prisma from "lib/prisma";
import * as yup from "yup";
import * as bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import withSession, { IronSessionRequest } from "lib/session";
import withValidate from "lib/withValidate";
import { User } from "lib/auth";

const loginBodyShema = yup.object({
  sub: yup.string().required(),
  password: yup.string().required(),
});

type LoginBody = yup.TypeOf<typeof loginBodyShema>;

const handler = async (req: IronSessionRequest, res: NextApiResponse<User>) => {
  // TODO: make /profile to get/put/delete
  // TODO: middleware for method restricts
  if (req.method !== "POST") return res.status(405).end();

  const { sub, password }: LoginBody = req.body;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: sub }, { username: sub }],
    },
  });

  if (user === null || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(400).end();

  req.session.set("user", user);
  await req.session.save();

  res.json({
    isLoggedIn: true,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });
};

export default withSession(withValidate(handler, loginBodyShema));
