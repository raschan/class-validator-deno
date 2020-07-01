import { expect, Rhum } from "../dep.ts";

import { ValidationError } from "./../../src/validation/ValidationError.ts";
import { Contains, MinLength } from "../../src/decorator/decorators.ts";
import { Validator } from "../../src/validation/Validator.ts";

class MyClass {
  @Contains("hello", {
    message: "$value is not valid. Your string must contain a hello word",
  })
  someProperty: string;
}

Rhum.testSuite("validateOrReject()", () => {
  let validator: Validator;
  let model: MyClass;

  Rhum.beforeEach(() => {
    validator = new Validator();
    model = new MyClass();
  });

  Rhum.testCase("should resolve promise when no error", () => {
    model.someProperty = "hello world";
    return validator
      .validateOrReject(model)
      .then((args) => {
        expect(args).toBeUndefined();
        return Promise.resolve();
      })
      .catch((errors) => {
        return Promise.reject("should resolve promise");
      });
  });

  Rhum.testCase("should reject promise on error", () => {
    model.someProperty = "hell no world";
    validator
      .validateOrReject(model)
      .then(() => {
        // done("should reject promise");
      })
      .catch((errors: ValidationError[]) => {
        expect(errors).toHaveLength(1);
        expect(errors[0].constraints).toEqual({
          contains:
            "hell no world is not valid. Your string must contain a hello word",
        });

        return;
      });
  });
});

Rhum.run();
