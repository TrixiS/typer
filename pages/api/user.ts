import { NextApiResponse } from "next";
import withSession, { IronSessionRequest } from "lib/session";

const handler = async (req: IronSessionRequest, res: NextApiResponse) => {
  const user = req.session.get("user");

  if (user === null)
    return res.json({
      isLoggedIn: false,
    });

  res.json({
    isLoggedIn: true,
    ...user,
  });
};

export default withSession(handler);
