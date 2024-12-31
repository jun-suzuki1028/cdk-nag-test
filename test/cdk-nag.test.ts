import { Annotations, Match } from "aws-cdk-lib/assertions";
import { App, Aspects, Stack } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import { CdkNagTestStack } from "../lib/cdk-nag-test-stack";
import { SynthesisMessage } from "aws-cdk-lib/cx-api/lib/metadata";
describe("cdk-nag AwsSolutions Pack", () => {
  let stack: Stack;
  let app: App;

  beforeEach(() => {
    // GIVEN
    app = new App();
    stack = new CdkNagTestStack(app, "test");

    // WHEN
    Aspects.of(stack).add(new AwsSolutionsChecks());
  });

  // THEN
  test("No unsuppressed Warnings", () => {
    const warnings = Annotations.fromStack(stack).findWarning(
      "*",
      Match.stringLikeRegexp("AwsSolutions-.*"),
    );
    try {
      expect(warnings).toHaveLength(0);
    } catch (e) {
      throw new Error(createCdkNagLog(warnings));
    }
  });

  test("No unsuppressed Errors", () => {
    const errors = Annotations.fromStack(stack).findError(
      "*",
      Match.stringLikeRegexp("AwsSolutions-.*"),
    );
    try {
      expect(errors).toHaveLength(0);
    } catch (e) {
      throw new Error(createCdkNagLog(errors));
    }
  });
});

function createCdkNagLog(messages: SynthesisMessage[]): string {
  let log = "";

  for (const message of messages) {
    switch (message.level) {
      case "info":
        log += "\u001b[34m"; // blue
        break;
      case "warning":
        log += "\u001b[33m"; // yellow
        break;
      case "error":
        log += "\u001b[31m"; // red
        break;
      default:
        log += "\u001b[30m"; // black
        break;
    }
    log += `[${message.level} at ${message.id}] ${message.entry.data as string}\u001b[0m`;
  }

  return log;
}
