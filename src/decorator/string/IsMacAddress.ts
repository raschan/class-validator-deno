import {
    ValidationOptions,
    isValidationOptions,
} from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_MAC_ADDRESS = "isMacAddress";

/**
 * Check if the string is a MAC address.
 * If given value is not a string, then it returns false.
 */
export function isMACAddress(
    value: unknown,
    options?: any
    // options?: ValidatorJS.IsMACAddressOptions
): boolean {
    return (
        typeof value === "string" && ValidatorJS.isMACAddress(value, options)
    );
}

/**
 * Check if the string is a MAC address.
 * If given value is not a string, then it returns false.
 */
export function IsMACAddress(
    // optionsArg?: ValidatorJS.IsMACAddressOptions,
    optionsArg?: any,
    validationOptionsArg?: ValidationOptions
): PropertyDecorator;
export function IsMACAddress(
    validationOptionsArg?: ValidationOptions
): PropertyDecorator;
export function IsMACAddress(
    optionsOrValidationOptionsArg?: // | ValidatorJS.IsMACAddressOptions
    any | ValidationOptions,
    validationOptionsArg?: ValidationOptions
): PropertyDecorator {
    const options = !isValidationOptions(optionsOrValidationOptionsArg)
        ? optionsOrValidationOptionsArg
        : undefined;
    const validationOptions = isValidationOptions(optionsOrValidationOptionsArg)
        ? optionsOrValidationOptionsArg
        : validationOptionsArg;

    return ValidateBy(
        {
            name: IS_MAC_ADDRESS,
            constraints: [options],
            validator: {
                validate: (value, args) => isMACAddress(value, options),
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        eachPrefix + "$property must be a MAC Address",
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}
