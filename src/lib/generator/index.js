import { setUpOptionWithConfigs } from './setup-option';

export const objectToMap = (config) => {
  const generatedMap = new Map();

  for (const option in config) {
    const configuredOption = setUpOptionWithConfigs(config[option]);
    generatedMap.set(option, configuredOption);
  }

  return generatedMap;
};
