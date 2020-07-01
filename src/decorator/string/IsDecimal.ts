import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_DECIMAL = "isDecimal";

/**
 * Checks if the string is a valid decimal.
 * If given value is not a string, then it returns false.
 */
export function isDecimal(
  value: unknown,
  // options?: validator.IsDecimalOptions
  options?: any,
): boolean {
  return typeof value === "string" && validator.isDecimal(value, options);
}

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function IsDecimal(
  // options?: validator.IsDecimalOptions,
  options?: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_DECIMAL,
      constraints: [options],
      validator: {
        validate: (value, args) => isDecimal(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property is not a valid decimal number.",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
