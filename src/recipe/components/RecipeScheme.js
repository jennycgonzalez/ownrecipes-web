import {
    injectIntl,
    defineMessages,
} from 'react-intl';

import IngredientGroups from './IngredientGroups';
import SubRecipes from './SubRecipes';
import Directions from './Directions';
import RecipeHeader from './RecipeHeader';
import RecipeFooter from './RecipeFooter';
import IngredientButtons from './IngredientButtons';
import InfoPanel from './InfoPanel';

import '../css/recipe.css';

const RecipeScheme = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    ingredients: {
      id: 'recipe.ingredients',
      description: 'Ingredients',
      defaultMessage: 'Ingredients',
    },
    directions: {
      id: 'recipe.directions',
      description: 'Directions',
      defaultMessage: 'Directions',
    },
  });

  return (
    <div className='recipe-details'>
      <div className='panel panel-success'>
        <RecipeHeader
            photo={props.photo}
            rating={props.rating}
            title={props.title}
            addToMenu={props.addToMenu}
        />
        <div className='recipe-schema' itemType='http://schema.org/Recipe'>
          <div className='row'>
            <div className='mobile-image'>
              <img className='img-responsive print-hidden' src={props.photo} alt={props.title} />
            </div>
            <div className='col-sm-7 col-sm-push-5 col-xs-12'>
              <p className='print-only print-image'>
                <img className='img-responsive' src={props.photo_thumbnail} alt={props.title} />
              </p>
              <InfoPanel
                  cookTime={props.cook_time}
                  prepTime={props.prep_time}
                  servings={props.servings}
                  customServings={props.customServings}
                  info={props.info}
                  updateServings={props.recipeActions.updateServings}
                  clearServings={props.recipeActions.resetServings}
              />
            </div>
            <div className='col-sm-5 col-sm-pull-7 col-xs-12'>
              <h4>{ formatMessage(messages.ingredients) }</h4>
              <SubRecipes
                  data={props.subrecipes}
                  check={props.recipeActions.checkSubRecipe}
              />
              <IngredientGroups
                  data={props.ingredient_groups}
                  check={props.recipeActions.checkIngredient}
              />
              <IngredientButtons
                  listStatus={props.listStatus}
                  lists={props.lists}
                  bulkAdd={props.recipeItemActions.bulkAdd.bind(this, props)}
                  checkAll={props.recipeActions.checkAll}
                  unCheckAll={props.recipeActions.unCheckAll}
              />
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-xs-12'>
              <h4>{ formatMessage(messages.directions) }</h4>
              <Directions data={props.directions} />
            </div>
          </div>
        </div>
        <RecipeFooter
            slug={props.slug}
            source={props.source}
            username={props.username}
            updateDate={props.update_date}
            deleteRecipe={props.recipeActions.deleteRecipe}
            showEditLink={props.showEditLink}
        />
      </div>
    </div>
  );
};

export default injectIntl(RecipeScheme);
