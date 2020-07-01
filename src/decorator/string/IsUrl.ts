import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_URL = "isUrl";

/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
export function isURL(
  value: string,
  options?: any,
  // options?: ValidatorJS.IsURLOptions
): boolean {
  return typeof value === "string" && ValidatorJS.isURL(value, options);
}

/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
export function IsUrl(
  // options?: ValidatorJS.IsURLOptions,
  options?: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_URL,
      constraints: [options],
      validator: {
        validate: (value, args) => isURL(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be an URL address",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
