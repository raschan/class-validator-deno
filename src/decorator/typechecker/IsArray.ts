import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_ARRAY = "isArray";

/**
 * Checks if a given value is an array
 */
export function isArray(value: unknown): boolean {
    return Array.isArray(value);
}

/**
 * Checks if a given value is an array
 */
export function IsArray(
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ARRAY,
            validator: {
                validate: (value, args) => isArray(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an array",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
