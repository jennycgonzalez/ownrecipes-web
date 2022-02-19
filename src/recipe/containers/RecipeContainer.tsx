import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import Loading from '../../common/components/Loading';
// import MenuItemModal from '../../menu/components/modals/MenuItemModal';
import RecipeScheme from '../components/RecipeScheme';
import * as RecipeActions from '../store/RecipeActions';
// import * as RecipesActions from '../store/RecipesActions';
// import * as MenuItemActions from '../../menu/actions/MenuItemActions';
// import { fetchRecipeList } from '../../menu/actions/RecipeListActions';
// import { menuItemValidation } from '../../menu/actions/validation';

import '../css/recipe.css';
import { useNavigate, useParams } from 'react-router';
import { CombinedStore } from '../../app/Store';
import { Recipe } from '../store/RecipeTypes';
import { getResourcePath } from '../../common/utility';

const RecipeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();

  // const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const rec = _.get(params, 'recipe');
    if (rec) {
      dispatch(RecipeActions.load(rec));
      window.scrollTo(0, 0);
    }
  }, [params]);

  const accountState = useSelector((state: CombinedStore) => state.account);
  const account = accountState.item;
  // TODO
  // const listsState   = useSelector((state: CombinedStore) => state.lists);
  // const lists: listsState.items;
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);
  const recipe = recipeState.item;
  const prevRecipe = useRef<Recipe | undefined>();

  useEffect(() => {
    if (_.get(recipeState.error, 'status') === 404) {
      nav(getResourcePath('/NotFound'));
    }
  }, [recipeState.error]);

  const recipeSlug = params.recipe ?? '';
  const showEditLink = (account != null && account.id === recipe?.author);

  // const menuItemSave = useCallback(() => { /* dispatch(MenuItemActions.save() */ }, [dispatch]);
  const deleteRecipe = useCallback(() => {
    setIsDeleting(true);
    dispatch(RecipeActions.deleteRecipe(recipeSlug));
  }, [dispatch]);

  useEffect(() => {
    if (prevRecipe.current == null) {
      prevRecipe.current = recipe;
    } else if (prevRecipe.current != null && recipe == null && isDeleting) {
      nav(getResourcePath('/browser'));
    }
  }, [recipe]);

  // TODO
  // const bulkAdd = useCallback((listId: number) => { /* RecipeActions.bulkAdd(recipe, listId) */ }, [dispatch]);
  // const checkAllIngredients = useCallback(() => RecipeActions.checkAll(recipeSlug), [dispatch]);
  // const uncheckAllIngredients = useCallback(() => RecipeActions.unCheckAll(recipeSlug), [dispatch]);

  // const checkIngredient = useCallback((id: number, checked: boolean) => RecipeActions.checkIngredient(recipeSlug, id, checked), [dispatch]);
  // const checkSubRecipe  = useCallback((id: number, checked: boolean) => RecipeActions.checkSubRecipe(recipeSlug, id, checked), [dispatch]);

  const updateServings = useCallback((servings: number) => dispatch(RecipeActions.updateServings(recipeSlug, servings)), [dispatch]);

  if (recipe != null) {
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
            recipe={recipe}
            recipeState={recipeState}

            showEditLink={showEditLink}

            deleteRecipe={deleteRecipe}

            // lists={lists}
            // onAddToMenuClick={() => setShowItemModal(true)}
            // bulkAdd={bulkAdd}
            // checkAllIngredients={checkAllIngredients}
            // uncheckAllIngredients={uncheckAllIngredients}

            // checkIngredient={checkIngredient}
            // checkSubRecipe={checkSubRecipe}

            updateServings={updateServings} />
      </>
    );
  } else {
    return (<Loading message='Loading' />);
  }
};

export default RecipeContainer;
