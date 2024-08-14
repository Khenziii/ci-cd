import express, { Express } from "express";
import { Deployment } from "./deployments/deployment.js";

export class App {
    port: number;
    deployments: Deployment[];
    app: Express;

    constructor(port: number, deployments: Deployment[]) {
        this.port = port;
        this.deployments = deployments;

        this.app = express();

        this.setupRoutes();
        this.start();
    }

    private async setupRoutes() {
        this.setupRootRoute();

        for (const deployment of this.deployments) {
            this.app.get(`/${deployment.route_name}`, async (_, res) => {
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
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}\n`) 
        });
    }
}

