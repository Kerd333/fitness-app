// Invocador/Inicializador del servidor

import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { PrismaClient } from "@prisma/client";
import { envs } from "./config";

const prisma = new PrismaClient
const appRoutes = new AppRoutes(prisma)
const server = new Server({port: envs.PORT, routes: appRoutes.routes});

server.start()