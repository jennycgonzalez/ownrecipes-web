import moment from 'moment';

const isDate = val => (moment(val).isValid() ? '' : 'Please entry a valid date.');

const double = val => (!Number.isNaN(val) ? '' : 'This field is required.');

// eslint-disable-next-line import/prefer-default-export
export const menuItemValidation = [
  { name: 'menu', validators: [double] },
  { name: 'recipe', validators: [double] },
  { name: 'start_date', validators: [isDate] },
];
