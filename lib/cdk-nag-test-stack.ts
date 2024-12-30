import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { NagSuppressions } from "cdk-nag";
import * as ec2 from "aws-cdk-lib/aws-ec2";
export class CdkNagTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPCの作成
    const vpc = new ec2.Vpc(this, "TestVpc", {
      maxAzs: 2, // デフォルトの設定を使用
    });

    // ネットワークACLの作成
    const networkAcl = new ec2.NetworkAcl(this, "TestNetworkAcl", {
      vpc,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });
  }
}
