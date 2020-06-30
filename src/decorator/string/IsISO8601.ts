import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_ISO8601 = "isIso8601";

/**
 * Checks if the string is a valid ISO 8601 date.
 * If given value is not a string, then it returns false.
 * Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.
 */
export function isISO8601(
  value: unknown,
  options?: any,
  // options?: ValidatorJS.IsISO8601Options
): boolean {
  return typeof value === "string" && ValidatorJS.isISO8601(value, options);
}

/**
 * Checks if the string is a valid ISO 8601 date.
 * If given value is not a string, then it returns false.
 * Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.
 */
export function IsISO8601(
  // options?: ValidatorJS.IsISO8601Options,
  options?: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ISO8601,
      constraints: [options],
      validator: {
        validate: (value, args) => isISO8601(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property must be a valid ISO 8601 date string",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
