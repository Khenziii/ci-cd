import { exec } from "child_process";
import { DeploymentError } from "./errors";

// Resolves into command's standard output (if no errors encountered).
export const execute_command = async (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(`A error occurred while running the command: ${error.message}`);
                return;
            }

            resolve(stdout);
        });
    })
}

export class Deployment {
    commands_list: string[];
    route_name: string;
    fail_fast: boolean;

    constructor(commands_list: string[], route_name: string, fail_fast?: boolean) {
        this.commands_list = commands_list;
        this.route_name = route_name;
        this.fail_fast = fail_fast ?? true;
    }

    public async run() {
        console.log(`🚀 Starting the deployment of ${this.route_name} app`);

        for (const command of this.commands_list) {
            try {
                console.log(`$ ${command}`);

                const command_stdout = await execute_command(command);
                if (!command_stdout) {
                    continue;
                }

                const output_without_newline = command_stdout.trimEnd();
                console.log(output_without_newline);
            } catch (error) {
                if (!this.fail_fast) continue;
                
                console.log("Aborting..\n");
                throw new DeploymentError(error as string);
            }
       }

        console.log("Successfully finished the deployment!\n")
    }
}

