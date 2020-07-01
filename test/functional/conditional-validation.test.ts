import { Rhum, expect } from "../dep.ts";

import {
    IsNotEmpty,
    ValidateIf,
    IsOptional,
    Equals,
} from "../../src/decorator/decorators.ts";
import { Validator } from "../../src/validation/Validator.ts";
import { ValidatorOptions } from "../../src/validation/ValidatorOptions.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

const validator = new Validator();

// Rhum.testPlan("conditional validation", () => {
// Rhum.testSuite("shouldn't validate a property when the condition is false", () => {
// expect.assertions(1);

Rhum.testSuite("conditional validation", function () {
    Rhum.testCase(
        "shouldn't validate a property when the condition is false",
        () => {
            class MyClass {
                @ValidateIf((o) => false)
                @IsNotEmpty()
                title?: string;
            }

            const model = new MyClass();
            return validator.validate(model).then((errors) => {
                expect(errors).toEqual(0);
            });
        }
    );

    Rhum.testCase(
        "should validate a property when the condition is true",
        () => {
            class MyClass {
                @ValidateIf((o) => true)
                @IsNotEmpty()
                title: string = "";
            }

            const model = new MyClass();
            return validator.validate(model).then((errors) => {
                expect(errors.length).toEqual(1);
                expect(errors[0].target).toEqual(model);
                expect(errors[0].property).toEqual("title");
                expect(errors[0].constraints).toEqual({
                    isNotEmpty: "title should not be empty",
                });
                expect(errors[0].value).toEqual("");
            });
        }
    );

    Rhum.testCase(
        "should pass the object being validated to the condition function",
        () => {
            class MyClass {
                @ValidateIf((o) => {
                    expect(o).toBeInstanceOf(MyClass);
                    expect(o.title).toEqual("title");
                    return true;
                })
                @IsNotEmpty()
                title: string = "title";
            }

            const model = new MyClass();
            return validator.validate(model).then((errors) => {
                expect(errors.length).toEqual(0);
            });
        }
    );

    Rhum.testCase("should validate a property when value is empty", () => {
        class MyClass {
            @IsOptional()
            @Equals("test")
            title: string = "";
        }

        const model = new MyClass();
        return validator.validate(model).then((errors) => {
            expect(errors.length).toEqual(1);
            expect(errors[0].target).toEqual(model);
            expect(errors[0].property).toEqual("title");
            expect(errors[0].constraints).toEqual({
                equals: "title must be equal to test",
            });
            expect(errors[0].value).toEqual("");
        });
    });

    Rhum.testCase("should validate a property when value is supplied", () => {
        class MyClass {
            @IsOptional()
            @Equals("test")
            title: string = "bad_value";
        }

        const model = new MyClass();
        return validator.validate(model).then((errors) => {
            expect(errors.length).toEqual(1);
            expect(errors[0].target).toEqual(model);
            expect(errors[0].property).toEqual("title");
            expect(errors[0].constraints).toEqual({
                equals: "title must be equal to test",
            });
            expect(errors[0].value).toEqual("bad_value");
        });
    });
});

Rhum.run();
