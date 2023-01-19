class Validator {
  updateRulesInPlace(rules, name, value) {
    const errors = [];

    const entry = rules[name];

    entry.value = value;

    if (entry.pattern && !new RegExp(entry.pattern).test(value)) {
      errors.push(entry.patternError);
    }

    if (entry.isMandatory && !entry.value) {
      errors.push('Поле является обязательным');
    }

    if (errors.length > 0) {
      entry.reason = errors[0];
    } else {
      entry.reason = '';
    }

    entry.isValid = errors.length === 0;

    return errors;
  }
}

module.exports = { Validator };
