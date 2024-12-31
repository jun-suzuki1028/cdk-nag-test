import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { CdkNagTestStack } from "../lib/cdk-nag-test-stack";

test("Snapshot Test", () => {
  const app = new cdk.App();
  const stack = new CdkNagTestStack(app, "CdkNagTestStack");
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
