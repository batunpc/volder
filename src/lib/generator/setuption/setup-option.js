import { assertObject } from '../../utils/assert-object';
import { Volder } from '../../volder';
import { strictConfigs } from '../../utils/strict-configs';
import { conflictsChecker } from './conflicts-checker';

// configs;
import { setupTypeConfig } from '../configs/public/type';
import { setupRequiredConfig } from '../configs/public/required';
import { setupPatternConfig } from '../configs/public/pattern';
import { setupAvoidConfig } from '../configs/null/avoid';
import { setupMaxConfig } from '../configs/public/max';
import { setupMinConfig } from '../configs/public/min';
import { setupDefaultConfig } from '../configs/public/default';
import { setupWhitespaceConfig } from '../configs/string/whitespace';
import { setupTransformConfig } from '../configs/public/transform';
import { setupAlphanumericConfig } from '../configs/string/alphanumeric';
import { setupMatchesConfig } from '../configs/string/matches';
import { setupUppercaseConfig, setupLowercaseConfig } from '../configs/string/upper-lower';
import { setupIntegerConfig } from '../configs/number/integer-float';
import { setupFloatConfig } from '../configs/number/integer-float';
import { setupRoundConfig } from '../configs/number/round';
import { setupFixedConfig } from '../configs/number/fixed';

export const setupOptionWithConfigs = (optionConfigs) => {
  // if option just constructor function | null | function | volder schema
  const types = [null, Boolean, Object, Number, String, Array];

  // if option is just a type
  if (types.includes(optionConfigs) || typeof optionConfigs === 'function' || optionConfigs instanceof Volder) {
    optionConfigs = { type: optionConfigs };
  } else {
    assertObject(optionConfigs, 'Expected a (object | constructor function | null | volder instance) but received a ');
  }

  // add a default config to the general configs;
  const generalConfigs = ['required', 'type', 'default', 'pattern', 'transform'];
  const stringConfigs = ['minLength', 'maxLength', 'trim', 'whitespace', 'alphanumeric', 'matches', 'uppercase', 'lowercase'];
  const arrayConfigs = ['minLength', 'maxLength'];
  const nullConfigs = ['avoid', 'minLength', 'maxLength', 'min', 'max'];
  const numberConfigs = ['min', 'max', 'integer', 'float', 'round', 'fixed'];
  const otherConfigs = ['min', 'max', 'minLength', 'maxLength'];

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);
  setupPatternConfig(optionConfigs);
  setupTransformConfig(optionConfigs);

  switch (optionConfigs.type) {
    case Boolean:
      strictConfigs(optionConfigs, [...generalConfigs]);
      setupDefaultConfig(optionConfigs, Boolean);
      break;
    case Object:
      strictConfigs(optionConfigs, [...generalConfigs]);
      setupDefaultConfig(optionConfigs, Object);
      break;
    case String:
      strictConfigs(optionConfigs, [...stringConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, String);
      setupWhitespaceConfig(optionConfigs);
      setupAlphanumericConfig(optionConfigs);
      setupMatchesConfig(optionConfigs);
      setupUppercaseConfig(optionConfigs);
      setupLowercaseConfig(optionConfigs);
      break;
    case Number:
      strictConfigs(optionConfigs, [...numberConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupIntegerConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, Number);
      setupFloatConfig(optionConfigs);
      setupRoundConfig(optionConfigs);
      setupFixedConfig(optionConfigs);
      break;
    case Array:
      strictConfigs(optionConfigs, [...arrayConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, Array);
      break;
    case null:
      strictConfigs(optionConfigs, [...nullConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupAvoidConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, null);
      break;
    default:
      strictConfigs(optionConfigs, [...otherConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, null);
      break;
  }

  conflictsChecker(optionConfigs);

  return optionConfigs;
};