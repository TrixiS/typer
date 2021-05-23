import { NextApiResponse } from "next";
import withSession, { IronSessionRequest } from "lib/session";

const handler = async (req: IronSessionRequest, res: NextApiResponse) => {
  const user = req.session.get("user");

  if (!user)
    return res.json({
      isLoggedIn: false,
    });

  res.json({
    isLoggedIn: true,
    username: user.username,
    email: user.email,
    verified: user.verified,
  });
};

export default withSession(handler);
