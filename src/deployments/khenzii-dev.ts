import { Deployment } from "./deployment.js";

const commands_list: string[] = [
    "docker pull khenzii/khenzii-dev:latest",
    "pm2 restart khenzii-dev",
];
const route_name: string = "khenzii-dev";

export const khenziiDevDeployment = new Deployment(commands_list, route_name);

