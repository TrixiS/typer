import { NextApiRequest } from "next";
import { withIronSession, SessionOptions, Session } from "next-iron-session";

export type IronSessionRequest = NextApiRequest & {
  session: Session;
};

const ironSessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET,
  cookieName: "login-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default function withSession(handler) {
  return withIronSession(handler, ironSessionOptions);
}
