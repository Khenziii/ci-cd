import request from "supertest";

import { App } from "./app";
import { Deployment } from "./deployments/deployment";

const secret: string = "test-secret";
const deployments: Deployment[] = [
    new Deployment(
        ["echo 'I'm a test!'"],
        "/test-deployment",
    ),
];
const ciCd: App = new App(3000, secret, deployments);

describe("Main App", () => {
    it("Should show an 404 error after requesting a non-existent route", async () => {
        const res = await request(ciCd.app).get("/not_found");

        expect(JSON.parse(res.text)["message"]).toEqual("This deployment doesn't exist!");
        expect(res.statusCode).toEqual(404);
    })

    it("Should show an info message after requesting the root route", async () => {
        const res = await request(ciCd.app).get("/");

        expect(JSON.parse(res.text)["message"]).toEqual("Provide app name via the route!");
        expect(res.statusCode).toEqual(400);
    })

    it("Should show an 'invalid credentials' error when using NO secret", async () => {
        const res = await request(ciCd.app).get(`/${deployments[0].route_name}`);

        expect(JSON.parse(res.text)["message"]).toMatch("Include the secret in a query parameter\.");
        expect(res.statusCode).toEqual(401);
    })
    
    afterAll(async () => {
        await ciCd.stop();
    })
})

