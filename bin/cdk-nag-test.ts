import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkNagTestStack } from "../lib/cdk-nag-test-stack";
import { AwsSolutionsChecks } from "cdk-nag";
import { Aspects } from "aws-cdk-lib";
import "source-map-support/register";

const app = new cdk.App();
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
new CdkNagTestStack(app, "CdkNagTestStack", {});
