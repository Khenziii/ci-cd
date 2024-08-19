import { ciCd } from "./index";

import request from "supertest";

describe("Main App", () => {
    it("Should show an 404 error after requesting a non-existent route", async () => {
        const res = await request(ciCd.app).get("/not_found");
        expect(JSON.parse(res.text)["message"]).toEqual("This deployment doesn't exist!");
    })
})

