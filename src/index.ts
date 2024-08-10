import { envVariables } from "./env-variables.js";
import { deployments } from "./deployments/index.js";
import { App } from "./app.js";

const port = envVariables.PORT;

new App(port, deployments);

