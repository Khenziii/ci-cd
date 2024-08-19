import { ciCd } from "./index";

import request from "supertest";

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
    
    afterAll(async () => {
        await ciCd.stop();
    })
})

