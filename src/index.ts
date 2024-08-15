import { envVariables } from "./env-variables.js";
import { deployments } from "./deployments/index.js";
import { App } from "./app.js";

const port = envVariables.PORT;
const secret = envVariables.SECRET;

new App(port, secret, deployments);

