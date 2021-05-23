import { PrismaClient } from "@prisma/client";

interface PrismaNodeJSGlobal extends NodeJS.Global {
  prisma?: PrismaClient;
}

declare const global: PrismaNodeJSGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
