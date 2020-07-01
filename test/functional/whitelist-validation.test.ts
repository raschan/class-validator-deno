import { Rhum, expect } from "../dep.ts";

import {
    Allow,
    IsDefined,
    Min,
    ValidateNested,
} from "../../src/decorator/decorators.ts";
import { Validator } from "../../src/validation/Validator.ts";

import { ValidationTypes } from "../../src/validation/ValidationTypes.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

const validator = new Validator();

// -------------------------------------------------------------------------
// Specifications: allowed validation
// -------------------------------------------------------------------------

Rhum.testSuite("whitelist validation", function () {
    Rhum.testCase(
        "should strip non whitelisted properties, but leave whitelisted untouched",
        function () {
            class MyClass {
                @IsDefined()
                title: string;

                @Min(0)
                views: number;
            }

            const model: any = new MyClass();

            model.title = "hello";
            model.views = 56;
            model.unallowedProperty = 42;
            return validator
                .validate(model, { whitelist: true })
                .then((errors) => {
                    expect(errors.length).toEqual(0);
                    expect(model.unallowedProperty).toBeUndefined();
                    expect(model.title).toEqual("hello");
                    expect(model.views).toEqual(56);
                });
        }
    );

    Rhum.testCase("should be able to whitelist with @Allow", function () {
        class MyClass {
            @Allow()
            views: number;
        }

        const model: any = new MyClass();

        model.views = 420;
        model.unallowedProperty = "non-whitelisted";

        return validator.validate(model, { whitelist: true }).then((errors) => {
            expect(errors.length).toEqual(0);
            expect(model.unallowedProperty).toBeUndefined();
            expect(model.views).toEqual(420);
        });
    });

    Rhum.testCase(
        "should throw an error when forbidNonWhitelisted flag is set",
        function () {
            class MyClass {}

            const model: any = new MyClass();

            model.unallowedProperty = "non-whitelisted";

            return validator
                .validate(model, {
                    whitelist: true,
                    forbidNonWhitelisted: true,
                })
                .then((errors) => {
                    expect(errors.length).toEqual(1);

                    expect(errors[0].target).toEqual(model);
                    expect(errors[0].property).toEqual("unallowedProperty");
                    expect(errors[0].constraints).toHaveProperty(
                        ValidationTypes.WHITELIST
                    );
                });
        }
    );
});

Rhum.run();
