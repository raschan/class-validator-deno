import { ConstraintMetadata } from "./metadata/ConstraintMetadata.ts";
import { ValidatorConstraintInterface } from "./validation/ValidatorConstraintInterface.ts";
import { ValidationMetadata } from "./metadata/ValidationMetadata.ts";
import { ValidationMetadataArgs } from "./metadata/ValidationMetadataArgs.ts";
import { ValidationTypes } from "./validation/ValidationTypes.ts";
import { ValidationArguments } from "./validation/ValidationArguments.ts";
import { getFromContainer } from "./container.ts";
import {
  MetadataStorage,
  getMetadataStorage,
} from "./metadata/MetadataStorage.ts";
import { ValidationOptions } from "./decorator/ValidationOptions.ts";

export interface ValidationDecoratorOptions {
  /**
     * Target object to be validated.
     */
  target: Function;

  /**
     * Target object's property name to be validated.
     */
  propertyName: string;

  /**
     * Name of the validation that is being registered.
     */
  name?: string;

  /**
     * Indicates if this decorator will perform async validation.
     */
  async?: boolean;

  /**
     * Validator options.
     */
  options?: ValidationOptions;

  /**
     * Array of validation constraints.
     */
  constraints?: any[];

  /**
     * Validator that performs validation.
     */
  validator: ValidatorConstraintInterface | Function;
}

/**
 * Registers a custom validation decorator.
 */
export function registerDecorator(options: ValidationDecoratorOptions): void {
  let constraintCls: Function;
  if (options.validator instanceof Function) {
    constraintCls = options.validator as Function;
    const constraintClasses = getFromContainer(
      MetadataStorage,
    ).getTargetValidatorConstraints(options.validator);
    if (constraintClasses.length > 1) {
      throw `More than one implementation of ValidatorConstraintInterface found for validator on: ${options.target}:${options.propertyName}`;
    }
  } else {
    const validator = options.validator as ValidatorConstraintInterface;
    constraintCls = class CustomConstraint
      implements ValidatorConstraintInterface {
      validate(
        value: any,
        validationArguments?: ValidationArguments,
      ): Promise<boolean> | boolean {
        return validator.validate(value, validationArguments);
      }

      defaultMessage(validationArguments?: ValidationArguments) {
        if (validator.defaultMessage) {
          return validator.defaultMessage(validationArguments);
        }

        return "";
      }
    };
    getMetadataStorage().addConstraintMetadata(
      new ConstraintMetadata(constraintCls, options.name, options.async),
    );
  }

  const validationMetadataArgs: ValidationMetadataArgs = {
    type: options.name && ValidationTypes.isValid(options.name)
      ? options.name
      : ValidationTypes.CUSTOM_VALIDATION,
    target: options.target,
    propertyName: options.propertyName,
    validationOptions: options.options,
    constraintCls: constraintCls,
    constraints: options.constraints,
  };
  getMetadataStorage().addValidationMetadata(
    new ValidationMetadata(validationMetadataArgs),
  );
}
