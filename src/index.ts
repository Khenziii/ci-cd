import { envVariables } from "./env-variables";
import { deployments } from "./deployments";
import { App } from "./app";

const port = envVariables.PORT;
const secret = envVariables.SECRET;

new App(port, secret, deployments);

