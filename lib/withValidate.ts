import { NextApiRequest, NextApiResponse } from "next";
import { OptionalObjectSchema, ObjectShape } from "yup/lib/object";

export default function withValidate(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  schema: OptionalObjectSchema<ObjectShape>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (["POST", "PUT"].includes(req.method)) {
      try {
        req.body = await schema.validate(req.body, { stripUnknown: true });
      } catch (error) {
        return res.status(422).json(error);
      }
    }

    await handler(req, res);
  };
}
