import { Deployment } from "./deployment";

const commands_list: string[] = [
    "docker pull ghcr.io/winterlab-project/discord-bot:latest",
    "pm2 restart winterlab-discord-bot",
];
const route_name: string = "winterlab-discord-bot";

export const winterlabDiscordBotDeployment = new Deployment(commands_list, route_name);

