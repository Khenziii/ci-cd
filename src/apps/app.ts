import { exec } from "child_process";

const execute_command = (command: string) => {
    let command_stdout: string | undefined;
    let successful: boolean = true;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`A NodeJS error occurred while running the command! Error: ${error}`);
            successful = false;
            return;
        }

        if (stderr) {
            console.log(`An error occurred while running the command! Error: ${stderr}`);
            successful = false;
            return;
        }

        command_stdout = stdout;
    });

    return {
        successful,
        command_stdout,
    };
}

export class App {
    commands_list: string[];
    route_name: string;
    fail_fast: boolean;

    constructor(commands_list: string[], route_name: string, fail_fast?: boolean) {
        this.commands_list = commands_list;
        this.route_name = route_name;
        this.fail_fast = fail_fast ?? true;
    }

    run() {
        console.log("Running the commands..");

        for (const command of this.commands_list) {
            const { successful, command_stdout } = execute_command(command);

            if (!successful && this.fail_fast) {
                console.log("Aborting..");
                break;
            }

            if (!command_stdout) {
                continue;
            }

            console.log(`$ ${command}`);
            console.log(command_stdout);
        };

        console.log("Successfully finished the deployment!")
    }
}

