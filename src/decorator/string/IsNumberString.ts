import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_NUMBER_STRING = "isNumberString";

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
export function isNumberString(
    value: unknown,
    options?: any
    // options?: ValidatorJS.IsNumericOptions
): boolean {
    return typeof value === "string" && ValidatorJS.isNumeric(value, options);
}

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
export function IsNumberString(
    // options?: ValidatorJS.IsNumericOptions,
    options?: any,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_NUMBER_STRING,
            constraints: [options],
            validator: {
                validate: (value, args) =>
                    isNumberString(value, args?.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        eachPrefix + "$property must be a number string",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
