import { Validator } from '@/features/validator/Validator';

describe('Validator', () => {
  test('can create instances', () => {
    const expected = 'object';
    const validator = new Validator();

    const actual = typeof validator;

    expect(actual).toBe(expected);
  });

  test('when mandatory field is empty then it should give the reason', () => {
    const expected = 'Поле является обязательным';
    const rules = {
      title: {
        isValid: false,
        reason: '',
        value: '',
        isMandatory: true,
      },
    };
    const validator = new Validator();
    const name = 'title';
    const value = '';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.title.reason;

    expect(actual).toBe(expected);
  });

  test('when mandatory field is non empty then reason should be empty', () => {
    const expected = '';
    const rules = {
      title: {
        isValid: false,
        reason: '',
        value: '',
        isMandatory: true,
      },
    };
    const validator = new Validator();
    const name = 'title';
    const value = ' ';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.title.reason;

    expect(actual).toBe(expected);
  });

  test('when mandatory field is empty then it should be invalid', () => {
    const expected = false;
    const rules = {
      title: {
        isValid: false,
        reason: '',
        value: '',
        isMandatory: true,
      },
    };
    const validator = new Validator();
    const name = 'title';
    const value = '';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.title.isValid;

    expect(actual).toBe(expected);
  });

  test('when mandatory field is non-empty then it should be valid', () => {
    const expected = true;
    const rules = {
      title: {
        isValid: false,
        reason: '',
        value: '',
        isMandatory: true,
      },
    };
    const validator = new Validator();
    const name = 'title';
    const value = ' ';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.title.isValid;

    expect(actual).toBe(expected);
  });

  test('when value does not conform to pattern then the field is invalid', () => {
    const expected = false;
    const rules = {
      passengers: {
        isValid: false,
        reason: '',
        value: '',
        pattern: '^[0-9]{1}$',
        patternError: 'Количество пассажиров - это цифра от 0 до 9',
      },
    };
    const validator = new Validator();
    const name = 'passengers';
    const value = '99999999';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.passengers.isValid;

    expect(actual).toBe(expected);
  });

  test('when value does not conform to pattern then it should give the reason', () => {
    const expected = 'Количество пассажиров - это цифра от 0 до 9';
    const rules = {
      passengers: {
        isValid: false,
        reason: '',
        value: '',
        pattern: '^[0-9]{1}$',
        patternError: expected,
      },
    };
    const validator = new Validator();
    const name = 'passengers';
    const value = '99999999';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.passengers.patternError;

    expect(actual).toBe(expected);
  });

  test('when value conforms to pattern then it should be valid', () => {
    const expected = true;
    const rules = {
      passengers: {
        isValid: false,
        reason: '',
        value: '',
        pattern: '^[0-9]{1}$',
        patternError: expected,
      },
    };
    const validator = new Validator();
    const name = 'passengers';
    const value = '9';

    validator.updateRulesInPlace(rules, name, value);
    const actual = rules.passengers.isValid;

    expect(actual).toBe(expected);
  });
});
