import { Deployment } from "./deployment";

const commands_list: string[] = [
    "docker pull khenzii/khenzii-dev:latest",
    "docker rm -f $(docker ps -q --filter 'ancestor=khenzii/khenzii-dev')",
    "docker run --env-file /home/khenzii/khenzii-dev-secrets.env -p 3003:3000 --restart unless-stopped -d khenzii/khenzii-dev",
];
const route_name: string = "khenzii-dev";

export const khenziiDevDeployment = new Deployment(commands_list, route_name);

