import { execute_command } from "./deployment";

describe("Deployments", () => {
    it("Should resolve a valid command into it's standard output", async () => {
        const stdout = await execute_command(`echo "I'm a test!"`);
        expect(stdout).toMatch("I'm a test!");
    })
})

