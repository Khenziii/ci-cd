import { Deployment } from "./deployment.js";

const commands_list: string[] = [
    "cd ~/ci-cd",
    "git pull",
    "npm install",
    "npm run build",
    "pm2 restart ci-cd",
];
const route_name: string = "ci-cd";

export const ciCdDeployment = new Deployment(commands_list, route_name);

