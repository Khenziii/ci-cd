import request from "supertest";

import { App } from "./app";
import { Deployment } from "./deployments/deployment";

const secret: string = "test-secret";
const deployments: Deployment[] = [
    new Deployment(
        [`echo "I'm a test!"`],
        "/test-deployment",
    ),
];
const ciCd: App = new App(3000, secret, deployments, "tests");

describe("Main App", () => {
    it("Should show an 404 error after requesting a non-existent route", async () => {
        const res = await request(ciCd.app).get("/not_found");

        expect(JSON.parse(res.text)["message"]).toEqual("This deployment doesn't exist!");
        expect(res.statusCode).toEqual(404);
    });

    it("Should show an info message after requesting the root route", async () => {
        const res = await request(ciCd.app).get("/");

        expect(JSON.parse(res.text)["message"]).toEqual("Provide app name via the route!");
        expect(res.statusCode).toEqual(400);
    });

    it("Should show an 'invalid credentials' error when using NO secret", async () => {
        const res = await request(ciCd.app).get(`/${deployments[0].route_name}`);

        expect(JSON.parse(res.text)["message"]).toMatch("Include the secret in a query parameter\.");
        expect(res.statusCode).toEqual(401);
    });

    it("Should show an 'invalid credentials' error when using invalid secret", async () => {
        const res = await request(ciCd.app).get(`/${deployments[0].route_name}?secret=invalid-secret`);

        expect(JSON.parse(res.text)["message"]).toMatch("Invalid secret!");
        expect(res.statusCode).toEqual(401);
    });

    it("Should show an success message if using the correct secret", async () => {
        const res = await request(ciCd.app).get(`/${deployments[0].route_name}?secret=${secret}`);

        expect(JSON.parse(res.text)["message"]).toMatch("Started the deployment!");
        expect(res.statusCode).toEqual(200);
    });

    afterAll(async () => {
        await ciCd.stop();
    });
});

