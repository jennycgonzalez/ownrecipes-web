import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import Loading from '../../common/components/Loading';
// import MenuItemModal from '../../menu/components/modals/MenuItemModal';
import RecipeScheme from '../components/RecipeScheme';
import * as RecipeActions from '../store/RecipeActions';
import * as RecipesActions from '../store/RecipesActions';
// import * as MenuItemActions from '../../menu/actions/MenuItemActions';
// import { fetchRecipeList } from '../../menu/actions/RecipeListActions';
// import { menuItemValidation } from '../../menu/actions/validation';

import '../css/recipe.css';
import { useParams } from 'react-router';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';

const RecipeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [showItemModal, setShowItemModal] = useState<boolean>(false);

  useEffect(() => {
    const rec = _.get(params, 'recipe');
    if (rec) {
      dispatch(RecipeActions.load(rec));
      window.scrollTo(0, 0);
    }
  }, [params]);

  const accountState = useSelector((state: CombinedStore) => state.account);
  // TODO
  // const listsState   = useSelector((state: CombinedStore) => state.lists);
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);
  const account = accountState.item;
  // TODO
  const lists: Array<any> = []; // listsState.items;
  const recipe  = recipeState.item;

  const recipeSlug = params.recipe ?? '';
  const showEditLink = (account != null && account.id === recipe?.author);

  const menuItemSave = useCallback(() => { /* dispatch(MenuItemActions.save() */ }, [dispatch]);
  const deleteRecipe = useCallback(() => dispatch(RecipeActions.deleteRecipe(recipeSlug)), [dispatch]);

  // TODO
  const bulkAdd = useCallback((listId: number) => { /* RecipeActions.bulkAdd(recipe, listId) */ }, [dispatch]);
  const checkAllIngredients = useCallback(() => RecipeActions.checkAll(recipeSlug), [dispatch]);
  const uncheckAllIngredients = useCallback(() => RecipeActions.unCheckAll(recipeSlug), [dispatch]);

  const checkIngredient = useCallback((id: number, checked: boolean) => RecipeActions.checkIngredient(recipeSlug, id, checked), [dispatch]);
  const checkSubRecipe  = useCallback((id: number, checked: boolean) => RecipeActions.checkSubRecipe(recipeSlug, id, checked), [dispatch]);

  const updateServings = useCallback((servings: number) => RecipeActions.updateServings(recipeSlug, servings), [dispatch]);
  const resetServings  = useCallback(() => RecipeActions.resetServings(recipeSlug) , [dispatch]);

  if (recipe) {
    return (
      <>
        {/* TODO
        <MenuItemModal
            id={0}
            show={showItemModal}
            onHide={() => setShowItemModal(false)}
            recipe={recipe.id}
            title={recipe.title}
            onSave={menuItemSave}
            fetchRecipeList={fetchRecipeList}
            validation={menuItemValidation} /> */}
        <RecipeScheme
            // eslint-disable-next-line react/jsx-props-no-spreading
            recipe={recipe}
            // recipesState={listsState.pending} // TODO
            recipesState={recipeState}
            lists={lists}

            showEditLink={showEditLink}

            onAddToMenuClick={() => setShowItemModal(true)}
            deleteRecipe={deleteRecipe}

            bulkAdd={bulkAdd}
            checkAllIngredients={checkAllIngredients}
            uncheckAllIngredients={uncheckAllIngredients}

            checkIngredient={checkIngredient}
            checkSubRecipe={checkSubRecipe}

            updateServings={updateServings}
            resetServings={resetServings} />
      </>
    );
  } else {
    return (<Loading message='Loading' />);
  }
};

export default RecipeContainer;
