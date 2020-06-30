import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_ALPHANUMERIC = "isAlphanumeric";

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function isAlphanumeric(
  value: unknown,
  // locale?: ValidatorJS.AlphanumericLocale
  locale?: any,
): boolean {
  return (
    typeof value === "string" && ValidatorJS.isAlphanumeric(value, locale)
  );
}

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function IsAlphanumeric(
  locale?: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ALPHANUMERIC,
      constraints: [locale],
      validator: {
        validate: (value, args) => isAlphanumeric(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property must contain only letters and numbers",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
