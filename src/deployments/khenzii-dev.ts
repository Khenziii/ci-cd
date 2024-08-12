import { Deployment } from "./deployment.js";

const commands_list: string[] = [
    "sleep 10",
    "echo 'hello world!'",
    "notify-send 'hello!'",
];
const route_name: string = "/khenzii-dev";

export const khenziiDevDeployment = new Deployment(commands_list, route_name);

