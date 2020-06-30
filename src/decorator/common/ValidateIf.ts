import { ValidationOptions } from "../ValidationOptions.ts";
import { ValidationMetadataArgs } from "../../metadata/ValidationMetadataArgs.ts";
import { ValidationTypes } from "../../validation/ValidationTypes.ts";
import { ValidationMetadata } from "../../metadata/ValidationMetadata.ts";
import { getMetadataStorage } from "../../metadata/MetadataStorage.ts";

/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
export function ValidateIf(
    condition: (object: any, value: any) => boolean,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return function (object, propertyName) {
        const args: ValidationMetadataArgs = {
            type: ValidationTypes.CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName as string,
            constraints: [condition],
            validationOptions: validationOptions,
        };
        getMetadataStorage().addValidationMetadata(
            new ValidationMetadata(args)
        );
    };
}
