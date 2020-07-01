import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "./ValidateBy.ts";
import validator from "../../validator.ts";

export const IS_LATLONG = "isLatLong";

/**
 * Checks if a value is string in format a "latitude,longitude".
 */
export function isLatLong(value: string): boolean {
  return typeof value === "string" && validator.isLatLong(value);
}

/**
 * Checks if a value is string in format a "latitude,longitude".
 */
export function IsLatLong(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_LATLONG,
      validator: {
        validate: (value, args) => isLatLong(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property must be a latitude,longitude string",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
