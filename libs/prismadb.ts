import {PrismaClient} from "@prisma/client";
import { defaultOverrides } from "next/dist/server/require-hook";


// hot reload hack lol 
declare global  {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != 'production') globalThis.prisma = client;

export default client;
 