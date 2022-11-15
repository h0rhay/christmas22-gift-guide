import {
  Duration,
  Stack,
  StackProps,
  aws_certificatemanager as acm,
} from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";

export default class NextStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const environment = this.node.tryGetContext("env");
    const { certificateArn, domainName } = this.node.tryGetContext(environment);
    // eslint-disable-next-line no-new
    new NextJSLambdaEdge(this, "xmas-gift-guide-ui", {
      serverlessBuildOutDir: "./build",
      runtime: Runtime.NODEJS_12_X,
      memory: 1024,
      timeout: Duration.seconds(30),
      withLogging: true,
      name: {
        apiLambda: "xmas-gift-guide-api",
        defaultLambda: "xmas-gift-guide-fn",
        imageLambda: "xmas-gift-guide-img",
      },
      domain: {
        domainNames: [domainName],
        certificate: acm.Certificate.fromCertificateArn(
          this,
          "SelfridgesCertificate",
          certificateArn
        ),
      },
    });
  }
}
