import { ValidationOptions } from "../ValidationOptions.ts";
import { ValidationMetadataArgs } from "../../metadata/ValidationMetadataArgs.ts";
import { ValidationMetadata } from "../../metadata/ValidationMetadata.ts";
import { getMetadataStorage } from "../../metadata/MetadataStorage.ts";
import { ValidationTypes } from "../../validation/ValidationTypes.ts";
import { ConstraintMetadata } from "../../metadata/ConstraintMetadata.ts";

/**
 * Registers custom validator class.
 */
export function ValidatorConstraint(options?: {
  name?: string;
  async?: boolean;
}) {
  return function (target: Function) {
    const isAsync = options && options.async ? true : false;
    let name = options && options.name ? options.name : "";
    if (!name) {
      name = (target as any).name;
      if (!name) {
        // generate name if it was not given
        name = name
          .replace(/\.?([A-Z]+)/g, (x, y) => "_" + y.toLowerCase())
          .replace(/^_/, "");
      }
    }
    const metadata = new ConstraintMetadata(target, name, isAsync);
    getMetadataStorage().addConstraintMetadata(metadata);
  };
}

/**
 * Performs validation based on the given custom validation class.
 * Validation class must be decorated with ValidatorConstraint decorator.
 */
export function Validate(
  constraintClass: Function,
  validationOptions?: ValidationOptions,
): PropertyDecorator;
export function Validate(
  constraintClass: Function,
  constraints?: any[],
  validationOptions?: ValidationOptions,
): PropertyDecorator;
export function Validate(
  constraintClass: Function,
  constraintsOrValidationOptions?: any[] | ValidationOptions,
  maybeValidationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyName) {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.CUSTOM_VALIDATION,
      target: object.constructor,
      propertyName: propertyName as string,
      constraintCls: constraintClass,
      constraints: constraintsOrValidationOptions instanceof Array
        ? (constraintsOrValidationOptions as any[])
        : undefined,
      validationOptions: !(
        constraintsOrValidationOptions instanceof Array
      )
        ? (constraintsOrValidationOptions as ValidationOptions)
        : maybeValidationOptions,
    };
    getMetadataStorage().addValidationMetadata(
      new ValidationMetadata(args),
    );
  };
}
