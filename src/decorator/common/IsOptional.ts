import { ValidationOptions } from "../ValidationOptions.ts";
import { ValidationMetadataArgs } from "../../metadata/ValidationMetadataArgs.ts";
import { ValidationTypes } from "../../validation/ValidationTypes.ts";
import { ValidationMetadata } from "../../metadata/ValidationMetadata.ts";
import { getMetadataStorage } from "../../metadata/MetadataStorage.ts";

/**
 * Checks if value is missing and if so, ignores all validators.
 */
export function IsOptional(
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return function (object, propertyName) {
        const args: ValidationMetadataArgs = {
            type: ValidationTypes.CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName as string,
            constraints: [
                (object: any, value: any) => {
                    return (
                        object[propertyName] !== null &&
                        object[propertyName] !== undefined
                    );
                },
            ],
            validationOptions: validationOptions,
        };
        getMetadataStorage().addValidationMetadata(
            new ValidationMetadata(args)
        );
    };
}
