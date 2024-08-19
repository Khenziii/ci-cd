import { environment } from "./app";

export type envVariablesType = {
    PORT: number;
    SECRET: string;
    ENVIRONMENT: environment;
}

export const envVariables: envVariablesType = {
    PORT: Number(process.env.KHENZII_CI_CD_PORT ?? 3000),
    SECRET: process.env.KHENZII_CI_CD_SECRET ?? "secret",
    ENVIRONMENT: (process.env.KHENZII_CI_CD_ENVIRONMENT as environment) ?? "development",
};

