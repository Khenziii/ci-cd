import express from "express";
import { envVariables } from "./env-variables.ts";

const app = express();

app.get("/", (_, res) => {
    res.status(400).send("Provide app name via the route!");
});

app.get("/khenzii-dev", (_, res) => {
    // execute the script here..
    res.status(200).send("OK");
});

app.listen(envVariables.PORT, () => {
    console.log(`Server running at port ${envVariables.PORT}`);
});

