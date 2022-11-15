#!/usr/bin/env node
/* eslint-disable */
import * as cdk from "aws-cdk-lib";
import { Builder } from "@sls-next/lambda-at-edge";
import NextStack from "./stack";

const builder = new Builder(".", "./build", { args: ["build"] });

builder
  .build(true)
  .then(() => {
    const app = new cdk.App();
    // eslint-disable-next-line no-new
    new NextStack(app, "xmas-gift-guide", {
      env: {
        region: "us-east-1",
      },
      analyticsReporting: true,
      description: "Christmas Gift Guide",
    });
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
