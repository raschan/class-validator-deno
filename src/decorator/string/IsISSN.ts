import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import ValidatorJS from "../../validator.ts";

export const IS_ISSN = "isISSN";

/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
export function isISSN(
  value: unknown,
  options?: any,
  // options?: ValidatorJS.IsISSNOptions
): boolean {
  return typeof value === "string" && ValidatorJS.isISSN(value, options);
}

/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
export function IsISSN(
  // options?: ValidatorJS.IsISSNOptions,
  options?: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ISSN,
      constraints: [options],
      validator: {
        validate: (value, args) => isISSN(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a ISSN",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
