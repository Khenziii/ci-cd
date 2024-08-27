import { Deployment } from "./deployment";

const commands_list: string[] = [
    "docker pull ghcr.io/khenziii/aditech-gda-pl:latest",
    "pm2 restart aditech-gda-pl",
];
const route_name: string = "aditech-gda-pl";

export const aditechGdaPlDeployment = new Deployment(commands_list, route_name);

