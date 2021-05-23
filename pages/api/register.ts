import prisma from "lib/prisma";
import * as yup from "yup";
import * as bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import withSession, { IronSessionRequest } from "lib/session";
import withValidate from "lib/withValidate";

const registerBodySchema = yup.object({
  email: yup.string().required().email(),
  username: yup
    .string()
    .required()
    .matches(/[^\s]$/),
  password: yup.string().required(),
});

type RegisterBody = yup.TypeOf<typeof registerBodySchema>;

const handler = async (req: IronSessionRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { email, username, password }: RegisterBody = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: { email, username, passwordHash },
    });

    req.session.set("user", user);
    await req.session.save();
    res.status(200).end();
  } catch {
    res.status(409).end();
  }
};

export default withSession(withValidate(handler, registerBodySchema));
