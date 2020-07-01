import { Rhum, expect } from "../dep.ts";

import { Contains, MinLength } from "../../src/decorator/decorators.ts";
import { Validator } from "../../src/validation/Validator.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

const validator = new Validator();

// -------------------------------------------------------------------------
// Specifications: common decorators
// -------------------------------------------------------------------------

Rhum.testSuite("inherited validation", function () {
  Rhum.testCase("should validate inherited properties", function () {
    class MyClass {
      @Contains("hello")
      title: string;
    }

    class MySubClass extends MyClass {
      @MinLength(5)
      name: string;
    }

    const model = new MySubClass();
    model.title = "helo world";
    model.name = "my";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(2);

      // subclass own props are validated first
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("name");
      expect(errors[0].constraints).toEqual({
        minLength: "name must be longer than or equal to 5 characters",
      });
      expect(errors[0].value).toEqual("my");

      // parent props are validated afterwards
      expect(errors[1].target).toEqual(model);
      expect(errors[1].property).toEqual("title");
      expect(errors[1].constraints).toEqual({
        contains: "title must contain a hello string",
      });
      expect(errors[1].value).toEqual("helo world");
    });
  });
});

Rhum.run();
