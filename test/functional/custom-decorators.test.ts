import { Rhum, expect } from "../dep.ts";

import { Validator } from "../../src/validation/Validator.ts";
import { ValidationArguments } from "../../src/validation/ValidationArguments.ts";
import { registerDecorator } from "../../src/register-decorator.ts";
import { ValidationOptions } from "../../src/decorator/ValidationOptions.ts";
import { ValidatorConstraint } from "../../src/decorator/decorators.ts";
import { ValidatorConstraintInterface } from "../../src/validation/ValidatorConstraintInterface.ts";

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------

const validator = new Validator();

// -------------------------------------------------------------------------
// Specifications: common decorators
// -------------------------------------------------------------------------

Rhum.testPlan("custom decorators", function () {
    Rhum.testSuite("decorator with inline validation", function () {
        function IsLongerThan(
            property: string,
            validationOptions?: ValidationOptions
        ) {
            return function (object: Object, propertyName: string) {
                registerDecorator({
                    target: object.constructor,
                    propertyName: propertyName,
                    options: validationOptions,
                    constraints: [property],
                    name: "isLongerThan",
                    validator: {
                        validate(value: any, args: ValidationArguments) {
                            const [relatedPropertyName] = args.constraints;
                            const relatedValue = (args.object as any)[
                                relatedPropertyName
                            ];
                            if (
                                relatedValue === undefined ||
                                relatedValue === null
                            ) {
                                return true;
                            }

                            const result =
                                typeof value === "string" &&
                                typeof relatedValue === "string" &&
                                value.length > relatedValue.length;

                            const asPromise =
                                validationOptions &&
                                validationOptions.context &&
                                validationOptions.context.promise;

                            return asPromise ? Promise.resolve(result) : result;
                        },
                    },
                });
            };
        }

        class MyClass {
            @IsLongerThan("lastName", {
                context: { foo: "bar" },
                message:
                    "$property must be longer then $constraint1. Given value: $value",
            })
            firstName: string;

            lastName: string;
        }

        class MyClassWithAsyncValidator {
            @IsLongerThan("lastName", {
                context: { foo: "bar", promise: true },
                message:
                    "$property must be longer then $constraint1. Given value: $value",
            })
            firstName: string;

            lastName: string;
        }

        Rhum.testCase(
            "if firstName is not empty and lastLame is empty then it should succeed",
            function () {
                const model = new MyClass();
                model.firstName = "hell no world";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(0);
                });
            }
        );

        Rhum.testCase(
            "if firstName is empty and lastLame is not empty then it should fail",
            function () {
                const model = new MyClass();
                model.firstName = "";
                model.lastName = "Kim";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(1);
                    expect(errors[0].constraints).toEqual({
                        isLongerThan:
                            "firstName must be longer then lastName. Given value: ",
                    });
                });
            }
        );

        Rhum.testCase(
            "if firstName is shorter then lastLame then it should fail",
            function () {
                const model = new MyClass();
                model.firstName = "Li";
                model.lastName = "Kim";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(1);
                    expect(errors[0].constraints).toEqual({
                        isLongerThan:
                            "firstName must be longer then lastName. Given value: Li",
                    });
                });
            }
        );

        Rhum.testCase("should include context", function () {
            const model = new MyClass();
            const asyncModel = new MyClassWithAsyncValidator();
            model.firstName = asyncModel.firstName = "Paul";
            model.lastName = asyncModel.lastName = "Walker";

            return validator.validate(model).then((errors) => {
                expect(errors.length).toEqual(1);
                expect(errors[0].contexts).toEqual({
                    isLongerThan: { foo: "bar" },
                });

                return validator.validate(asyncModel).then((errors) => {
                    expect(errors.length).toEqual(1);
                    expect(errors[0].contexts?.isLongerThan?.foo) //
                        .toEqual("bar");
                });
            });
        });
    });

    Rhum.testSuite("decorator with default message", function () {
        function IsLonger(
            property: string,
            validationOptions?: ValidationOptions
        ) {
            return function (object: Object, propertyName: string) {
                registerDecorator({
                    target: object.constructor,
                    propertyName: propertyName,
                    options: validationOptions,
                    constraints: [property],
                    name: "isLonger",
                    validator: {
                        validate(value: any, args: ValidationArguments) {
                            const [relatedPropertyName] = args.constraints;
                            const relatedValue = (args.object as any)[
                                relatedPropertyName
                            ];
                            if (
                                relatedValue === undefined ||
                                relatedValue === null
                            ) {
                                return true;
                            }

                            return (
                                typeof value === "string" &&
                                typeof relatedValue === "string" &&
                                value.length > relatedValue.length
                            );
                        },
                        defaultMessage(args: ValidationArguments) {
                            return (
                                args.property +
                                " must be longer then " +
                                args.constraints[0]
                            );
                        },
                    },
                });
            };
        }

        class SecondClass {
            @IsLonger("lastName")
            firstName: string;

            lastName: string;
        }

        Rhum.testCase(
            "if firstName is not empty and lastLame is empty then it should succeed",
            function () {
                const model = new SecondClass();
                model.firstName = "hell no world";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(0);
                });
            }
        );

        Rhum.testCase(
            "if firstName is empty and lastLame is not empty then it should fail",
            function () {
                const model = new SecondClass();
                model.firstName = "";
                model.lastName = "Kim";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(1);
                    expect(errors[0].constraints).toEqual({
                        isLonger: "firstName must be longer then lastName",
                    });
                });
            }
        );

        Rhum.testCase(
            "if firstName is shorter then lastLame then it should fail",
            function () {
                const model = new SecondClass();
                model.firstName = "Li";
                model.lastName = "Kim";
                return validator.validate(model).then((errors) => {
                    expect(errors.length).toEqual(1);
                    expect(errors[0].constraints).toEqual({
                        isLonger: "firstName must be longer then lastName",
                    });
                });
            }
        );
    });

    Rhum.testSuite(
        "decorator with separate validation constraint class",
        function () {
            @ValidatorConstraint({ name: "isShortenThan" })
            class IsShortenThanConstraint
                implements ValidatorConstraintInterface {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];
                    if (value === null || value === undefined) {
                        return true;
                    }

                    return (
                        typeof value === "string" &&
                        typeof relatedValue === "string" &&
                        value.length < relatedValue.length
                    );
                }
            }

            function IsShortenThan(
                property: string,
                validationOptions?: ValidationOptions
            ) {
                return function (object: Object, propertyName: string) {
                    registerDecorator({
                        target: object.constructor,
                        propertyName: propertyName,
                        options: validationOptions,
                        constraints: [property],
                        validator: IsShortenThanConstraint,
                    });
                };
            }

            class MyClass {
                firstName: string;

                @IsShortenThan("firstName", {
                    message:
                        "$property must be shorter then $constraint1. Given value: $value",
                })
                lastName: string;
            }

            Rhum.testCase(
                "if firstName is not empty and lastLame is empty then it should succeed",
                function () {
                    const model = new MyClass();
                    model.firstName = "hell no world";
                    return validator.validate(model).then((errors) => {
                        expect(errors.length).toEqual(0);
                    });
                }
            );

            Rhum.testCase(
                "if firstName is empty and lastLame is not empty then it should fail",
                function () {
                    const model = new MyClass();
                    model.firstName = "";
                    model.lastName = "Kim";
                    return validator.validate(model).then((errors) => {
                        expect(errors.length).toEqual(1);
                        expect(errors[0].constraints).toEqual({
                            isShortenThan:
                                "lastName must be shorter then firstName. Given value: Kim",
                        });
                    });
                }
            );

            Rhum.testCase(
                "if firstName is shorter then lastLame then it should fail",
                function () {
                    const model = new MyClass();
                    model.firstName = "Li";
                    model.lastName = "Kim";
                    return validator.validate(model).then((errors) => {
                        expect(errors.length).toEqual(1);
                        expect(errors[0].constraints).toEqual({
                            isShortenThan:
                                "lastName must be shorter then firstName. Given value: Kim",
                        });
                    });
                }
            );
        }
    );
});

Rhum.run();
