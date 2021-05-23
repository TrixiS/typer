import { NextApiResponse } from "next";
import withSesion, { IronSessionRequest } from "lib/session";

const handler = async (req: IronSessionRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).end();
};

export default withSesion(handler);
