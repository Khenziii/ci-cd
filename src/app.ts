import express, { Express } from "express";
import { Server } from "http";
import { Deployment } from "./deployments/deployment";

export class App {
    port: number;
    secret: string;
    deployments: Deployment[];
    app: Express;
    server?: Server;

    constructor(port: number, secret: string, deployments: Deployment[]) {
        this.port = port;
        this.secret = secret;
        this.deployments = deployments;

        this.app = express();

        this.setupRoutes();
        this.start();
    }

    private async setupRoutes() {
        this.setupRootRoute();

        for (const deployment of this.deployments) {
            this.app.get(`/${deployment.route_name}`, async (req, res) => {
                const { secret } = req.query;

                if (!secret) {
                    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
                    res.status(401).json({
                        message: `This endpoint should be accessed like this: ${fullUrl}?secret=<your_secret>. Include the secret in a query parameter.`,
                    });
                    return;
                }

                if (secret != this.secret) {
                    res.status(401).json({
                        message: "Invalid secret!",
                    });
                    return;
                }
        
                res.status(200).json({
                    message: "Started the deployment!",
                });

                try {
                    await deployment.run();
                } catch (error) {
                    console.log(`Deployment failed: ${error}`);
                }
            });
        }

        this.setupNotFoundRoute();
    }

    private setupRootRoute() {
        this.app.get("/", (_, res) => {
            res.status(400).json({
                message: "Provide app name via the route!",
            });
        });
    }

    private setupNotFoundRoute() {
        this.app.use((_, res) => {
            res.status(404).json({
                message: "This deployment doesn't exist!",
            });
        });
    }

    private start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}\n`) 
        });
    }

    public async stop() {
        return new Promise<void>((resolve) => {
            if (this.server === undefined) return;

            this.server.close(() => {
                console.log(`Shutting down server that has been running on port ${this.port}..`)

                resolve();
            })
        })
    }
}

