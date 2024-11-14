/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ballknowr",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/storage");
    await import("./infra/api");
    await import("./infra/web");
    const auth = await import("./infra/auth");
    new sst.aws.Cron("MyCronJob", {
      job: "packages/functions/src/cron.handler",
      schedule: "rate(1 minute)"
    });

    return {
      UserPool: auth.userPool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
    };
  },
});
