import { ValidationOptions } from "../ValidationOptions.ts";
import { registerDecorator } from "../../register-decorator.ts";
import { ValidationArguments } from "../../validation/ValidationArguments.ts";
import { ValidatorConstraintInterface } from "../../validation/ValidatorConstraintInterface.ts";

export interface ValidateByOptions {
    name: string;
    constraints?: any[];
    validator: ValidatorConstraintInterface | Function;
    async?: boolean;
}

export function buildMessage(
    impl: (eachPrefix: string, args?: ValidationArguments) => string,
    validationOptions?: ValidationOptions
): (validationArguments?: ValidationArguments) => string {
    return (validationArguments?: ValidationArguments) => {
        const eachPrefix =
            validationOptions && validationOptions.each ? "each value in " : "";
        return impl(eachPrefix, validationArguments);
    };
}

export function ValidateBy(
    options: ValidateByOptions,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return function (object, propertyName) {
        registerDecorator({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName as string,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
}
