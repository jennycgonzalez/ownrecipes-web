import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import { CombinedStore } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import { CreatableSelect, ICreatableSelectValues } from '../../common/components/Select';
import { optionallyFormatMessage, sortByLabel } from '../../common/utility';
import { Course, Cuisine } from '../../recipe/store/RecipeTypes';

export interface ICuisineSelectContainerProps extends ICreatableSelectValues {
  onChange?: (name: string, newValue: Course | undefined) => void;
}

const CuisineSelectContainer: React.FC<ICuisineSelectContainerProps> = ({ onChange, ...rest }: ICuisineSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchCuisines = useCallback(() => dispatch(RecipeGroupActions.fetchCuisines()), [dispatch, RecipeFormActions]);
  const cuisines = useSelector((state: CombinedStore) => state.recipeGroups.cuisines.items);
  useSingle(fetchCuisines, cuisines);

  const data = useMemo(() => cuisines
      ?.map(c => ({ value: c.title, label: optionallyFormatMessage(intl, 'cuisine.', c.title) }))
      .sort(sortByLabel), [cuisines, intl.locale]);

  const handleChange = (name: string, newValue: string | undefined) => {
    if (onChange) {
      if (newValue == null) {
        onChange(name, undefined);
      } else {
        onChange(name, cuisines?.find(c => c.title === newValue) ?? { title: newValue ?? '' } as Cuisine);
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

export default CuisineSelectContainer;
