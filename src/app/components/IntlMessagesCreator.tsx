import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import initCourses from './messages/Courses';
import initCuisines from './messages/Cuisines';
import initMeasurements from './messages/Measurements';
import initValidations from './messages/Validations';

const IntlMessagesCreator = () => {
  const intl = useIntl();

  useEffect(() => {
    initCourses();
    initCuisines();
    initMeasurements();
    initValidations();
  }, [intl.locale]);

  return null;
};

export default IntlMessagesCreator;
