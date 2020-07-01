import { Rhum, expect } from "../dep.ts";

import { IsNotEmpty } from "../../src/decorator/decorators.ts";
import { Validator } from "../../src/validation/Validator.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

const validator = new Validator();

// -------------------------------------------------------------------------
// Specifications: common decorators
// -------------------------------------------------------------------------

Rhum.testSuite("validator options", function () {
  Rhum.testCase(
    "should not return target in validation error if validationError: { target: false } is set",
    function () {
      class MyClass {
        @IsNotEmpty()
        title: string = "";
        isActive: boolean;
      }

      const model = new MyClass();
      model.title = "";
      return validator
        .validate(model, {
          skipMissingProperties: true,
          validationError: { target: false },
        })
        .then((errors) => {
          expect(errors.length).toEqual(1);

          expect(errors[0].target).toBeUndefined();
          expect(errors[0].property).toEqual("title");
          expect(errors[0].constraints).toEqual({
            isNotEmpty: "title should not be empty",
          });
          expect(errors[0].value).toEqual("");
        });
    },
  );

  Rhum.testCase(
    "should returns error on unknown objects if forbidUnknownValues is true",
    function () {
      const anonymousObject = { badKey: "This should not pass." };

      return validator
        .validate(anonymousObject, { forbidUnknownValues: true })
        .then((errors) => {
          expect(errors.length).toEqual(1);

          expect(errors[0].target).toEqual(anonymousObject);
          expect(errors[0].property).toBeUndefined();
          expect(errors[0].constraints).toEqual({
            unknownValue:
              "an unknown value was passed to the validate function",
          });
          expect(errors[0].value).toBeUndefined();
          expect(errors[0].children).toBeInstanceOf(Array);
        });
    },
  );

  Rhum.testCase(
    "should return no error on unknown objects if forbidUnknownValues is false",
    function () {
      const anonymousObject = { badKey: "This should not pass." };

      return validator
        .validate(anonymousObject, { forbidUnknownValues: false })
        .then((errors) => {
          expect(errors.length).toEqual(0);
        });
    },
  );
});

Rhum.run();
