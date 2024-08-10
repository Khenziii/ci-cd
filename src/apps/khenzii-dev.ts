import { App } from "./app";

const commands_list: string[] = [
    "echo 'hello world!'",
];
const route_name: string = "khenzii-dev";

export const khenziiDevApp = new App(commands_list, route_name);

