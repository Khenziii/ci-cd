import { Deployment } from "./deployment";

const commands_list: string[] = [
    "docker pull ghcr.io/winterlab-project/website:latest",
    "pm2 restart winterlab-website",
];
const route_name: string = "winterlab-website";

export const winterlabWebsiteDeployment = new Deployment(commands_list, route_name);

