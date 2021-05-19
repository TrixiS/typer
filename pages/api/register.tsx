import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: check req.method
  res.status(200).json({ name: "John Doe" });
};
