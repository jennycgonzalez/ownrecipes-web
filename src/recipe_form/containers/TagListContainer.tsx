import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import { CombinedStore } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import { optionallyFormatMessage } from '../../common/utility';
import { CreatableSelect, ICreatableSelectValues } from '../../common/components/Select';
import { Tag } from '../../recipe/store/RecipeTypes';

export interface ITagSelectContainerProps extends ICreatableSelectValues {
  onChange?: (name: string, newValue: Array<Tag> | undefined) => void;
}

const TagListContainer: React.FC<ITagSelectContainerProps> = (props: ITagSelectContainerProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const fetchTags = useCallback(() => dispatch(RecipeGroupActions.fetchTags())    , [dispatch, RecipeFormActions]);
  const tags = useSelector((state: CombinedStore) => state.recipeGroups.tags.items);
  useSingle(fetchTags, tags);

  const data = useMemo(() => tags?.filter(t => t.title.length > 0).map(t => ({ value: t.title, label: optionallyFormatMessage(intl, 'tag.', t.title) })), [tags]);

  const handleChange = (name: string, newValue: Array<string> | undefined) => {
    if (props.onChange) {
      if (newValue == null) {
        props.onChange(name, undefined);
      } else {
        const selected = tags?.filter(t => newValue.includes(t.title));
        props.onChange(name, selected);
      }
    }
  };

  return (
    <CreatableSelect
        {...props}
        data = {data}
        onChange = {handleChange}
        isMulti
        />
  );
};

export default TagListContainer;
