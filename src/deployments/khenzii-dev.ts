import { Deployment } from "./deployment";

const commands_list: string[] = [
    "old_id=$(docker images -q khenzii/khenzii-dev:latest) &&\
    docker pull khenzii/khenzii-dev:latest &&\
    docker rm -f $old_id",
    "docker run --env-file /home/khenzii/khenzii-dev-secrets.env -p 3003:3000 --restart unless-stopped -d khenzii/khenzii-dev",
];
const route_name: string = "khenzii-dev";

export const khenziiDevDeployment = new Deployment(commands_list, route_name);

