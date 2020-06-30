import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const CONTAINS = "contains";

/**
 * Checks if the string contains the seed.
 * If given value is not a string, then it returns false.
 */
export function contains(value: unknown, seed: string): boolean {
    return typeof value === "string" && validator.contains(value, seed);
}

/**
 * Checks if the string contains the seed.
 * If given value is not a string, then it returns false.
 */
export function Contains(
    seed: string,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: CONTAINS,
            constraints: [seed],
            validator: {
                validate: (value, args) =>
                    contains(value, args?.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        eachPrefix +
                        "$property must contain a $constraint1 string",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
