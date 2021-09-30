export const numberCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  if (!(typeof input[optionName] === 'number' || input instanceof Number)) {
    errors[optionName] = `${optionName} should be a number`;
    return false;
  }

  if (optionConfigs.min !== null && input[optionName] < optionConfigs.min) {
    errors[
      optionName
    ] = `${optionName} should be at least ${optionConfigs.min}`;
    return false;
  }

  if (optionConfigs.max !== null && input[optionName] > optionConfigs.max) {
    errors[optionName] = `${optionName} should be at most ${optionConfigs.max}`;
    return false;
  }
};
