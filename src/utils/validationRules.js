const rules = {
  required: (value) => !!value,
  justNumber: (value) => new RegExp("^(|-)\\d*$").test(value),
  mobile: (value) => new RegExp("^(09)\\d{9}$").test(value),
};

export default rules;
