import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_FQDN = "isFqdn";

/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
export function isFQDN(
    value: unknown,
    options?: any
    // options?: validator.IsFQDNOptions
): boolean {
    return typeof value === "string" && validator.isFQDN(value, options);
}

/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
export function IsFQDN(
    // options?: validator.IsFQDNOptions,
    options?: any,
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_FQDN,
            constraints: [options],
            validator: {
                validate: (value, args) => isFQDN(value, args?.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        eachPrefix + "$property must be a valid domain name",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
