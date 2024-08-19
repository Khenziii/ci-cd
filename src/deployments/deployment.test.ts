import { DeploymentError } from "./errors";
import { execute_command, Deployment } from "./deployment";

const partiallyInvalidDeployment: Deployment = new Deployment(
    [
        `echo "I'm a working command, but the next one will fail"`,
        "false",
        `echo "I'm a valid command, that shouldn't be reached"`,
    ],
    "partially-invalid-deployment",
    true,
);

describe("Deployments", () => {
    it("Should resolve a valid command into it's standard output", async () => {
        const stdout = await execute_command(`echo "I'm a test!"`);
        expect(stdout).toMatch("I'm a test!");
    });

    it("Should fail to execute an invalid command", async () => {
        await expect(execute_command("false")).rejects.toBeDefined();
    });

    it("A whole deployment should fail if an invalid command encountered, and `fail_fast` is set to true", async () => {
        await expect(partiallyInvalidDeployment.run()).rejects.toThrow(DeploymentError);
    })
});

