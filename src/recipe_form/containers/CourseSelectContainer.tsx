import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';
import useDispatch from '../../common/hooks/useDispatch';
import { CombinedStore } from '../../app/Store';

import useSingle from '../../common/hooks/useSingle';
import { CreatableSelect, ICreatableSelectValues } from '../../common/components/Select';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import { Course, Cuisine } from '../../recipe/store/RecipeTypes';

export interface ICuisineSelectContainerProps extends ICreatableSelectValues {
  onChange?: (name: string, newValue: Cuisine | undefined) => void;
}

const CourseSelectContainer: React.FC<ICuisineSelectContainerProps> = ({ onChange, ...rest }: ICuisineSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchCourses = useCallback(() => dispatch(RecipeGroupActions.fetchCourses()) , [dispatch, RecipeFormActions]);
  const courses  = useSelector((state: CombinedStore) => state.recipeGroups.courses.items);
  useSingle(fetchCourses , courses);

  const data = useMemo(() => courses
      ?.map(c => ({ value: c.title, label: optionallyFormatMessage(intl, 'course.', c.title) }))
      .sort(sortByLabel), [courses, intl.locale]);

  const handleChange = (name: string, newValue: string | undefined) => {
    if (onChange) {
      if (newValue == null) {
        onChange(name, undefined);
      } else {
        onChange(name, courses?.find(c => c.title === newValue) ?? { title: newValue } as Course);
      }
    }
  };

  return (
    <CreatableSelect
        {...rest}
        data = {data}
        onChange = {handleChange}
        />
  );
};

export default CourseSelectContainer;
