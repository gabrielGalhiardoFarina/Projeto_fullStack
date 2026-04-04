import "dotenv/config";
import prismaClient from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const { PrismaClient } = prismaClient;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL nao foi definida no arquivo .env");
}

const adapter = new PrismaMariaDb(databaseUrl);

export const prisma = new PrismaClient({ adapter });
