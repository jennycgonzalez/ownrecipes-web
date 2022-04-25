import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as RecipeFormActions from '../store/actions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import { CombinedStore } from '../../app/Store';
import useSingle from '../../common/hooks/useSingle';
import TagList, { ITagListProps } from '../components/TagList';

const TagListContainer: React.FC<ITagListProps> = (props: ITagListProps) => {
  const dispatch = useDispatch();

  const fetchTags = useCallback(() => dispatch(RecipeGroupActions.fetchTags())    , [dispatch, RecipeFormActions]);
  const tags = useSelector((state: CombinedStore) => state.recipeGroups.tags);
  useSingle(fetchTags, tags.items);

  return (
    <TagList {...props} />
  );
};

export default TagListContainer;
