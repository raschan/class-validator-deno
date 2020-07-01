import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_BTC_ADDRESS = "isBtcAddress";

/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
export function isBtcAddress(value: unknown): boolean {
  return typeof value === "string" && validator.isBtcAddress(value);
}

/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
export function IsBtcAddress(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_BTC_ADDRESS,
      validator: {
        validate: (value, args) => isBtcAddress(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a BTC address",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
