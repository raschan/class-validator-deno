import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_UPPERCASE = "isUppercase";

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function isUppercase(value: unknown): boolean {
  return typeof value === "string" && value.toUpperCase() === value;
}

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function IsUppercase(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_UPPERCASE,
      validator: {
        validate: (value, args) => isUppercase(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be uppercase",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
