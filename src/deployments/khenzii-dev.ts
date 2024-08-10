import { Deployment } from "./deployment";

const commands_list: string[] = [
    "echo 'hello world!'",
];
const route_name: string = "khenzii-dev";

export const khenziiDevApp = new Deployment(commands_list, route_name);

