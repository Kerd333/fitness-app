import express, { Router } from "express";
import cookieParser from 'cookie-parser';

// Definición del servidor

interface Options {
    port?: number,
    routes: Router
}

export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router
    constructor(options: Options) {
        const { port = 3100, routes } = options
        this.port = port;
        this.routes = routes;
    }
    async start() {

        this.app.use(cookieParser())
        this.app.use(express.json())
        this.app.use('/api/', this.routes)

        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`))
    }
}