export const envVariables = {
    PORT: Number(process.env.KHENZII_CI_CD_PORT ?? 3000),
    SECRET: process.env.KHENZII_CI_CD_SECRET ?? "secret",
};

