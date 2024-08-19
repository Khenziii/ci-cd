import { envVariables } from "./env-variables";
import { deployments } from "./deployments";
import { App } from "./app";

const port = envVariables.PORT;
const secret = envVariables.SECRET;
const environment = envVariables.ENVIRONMENT;

export const ciCd = new App(port, secret, deployments, environment);

