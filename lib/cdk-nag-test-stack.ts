import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as ec2 from "aws-cdk-lib/aws-ec2";
export class CdkNagTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket", {
      enforceSSL: true,
    });

    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
    });

    const networkAcl = new ec2.NetworkAcl(this, "NetworkAcl", {
      vpc,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });
  }
}
