import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_CURRENCY = "isCurrency";

/**
 * Checks if the string is a valid currency amount.
 * If given value is not a string, then it returns false.
 */
export function isCurrency(
  value: unknown,
  options?: any,
  // options?: any | validator.IsCurrencyOptions
): boolean {
  return typeof value === "string" && validator.isCurrency(value, options);
}

/**
 * Checks if the string is a valid currency amount.
 * If given value is not a string, then it returns false.
 */
export function IsCurrency(
  // options?: validator.IsCurrencyOptions,
  options?: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_CURRENCY,
      constraints: [options],
      validator: {
        validate: (value, args) => isCurrency(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a currency",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
