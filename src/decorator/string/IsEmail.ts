import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_EMAIL = "isEmail";

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export function isEmail(
    value: unknown,
    options?: any
    // options?: validator.IsEmailOptions
): boolean {
    return typeof value === "string" && validator.isEmail(value, options);
}

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export function IsEmail(
    // options?: validator.IsEmailOptions,
    options?: any,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_EMAIL,
            constraints: [options],
            validator: {
                validate: (value, args) => isEmail(value, args?.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an email",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
