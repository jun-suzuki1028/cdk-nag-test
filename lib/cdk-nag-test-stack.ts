import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { NagSuppressions } from "cdk-nag";
export class CdkNagTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // NagSuppressions.addStackSuppressions(this, [
    //   {
    //     id: "AwsSolutions-S1",
    //     reason: "This is a demo bucket, so it does not need access logs",
    //   },
    // ]);
    const bucket = new Bucket(this, "Bucket", {
      enforceSSL: true,
    });
  }
}
