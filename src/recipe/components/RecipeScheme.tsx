import { defineMessages, useIntl } from 'react-intl';

import IngredientGroups from './IngredientGroups';
import SubRecipes from './SubRecipes';
import Directions from './Directions';
import RecipeHeader from './RecipeHeader';
import RecipeFooter from './RecipeFooter';
import IngredientButtons from './IngredientButtons';
import InfoPanel from './InfoPanel';

import '../css/recipe.css';
import { Recipe } from '../store/types';
import GenericReducerType from '../../common/store/GenericReducerType';
import { Card, Col, Row } from 'react-bootstrap';

interface IRecipeSchemeProps {
  recipe: Recipe;
  recipesState: GenericReducerType;
  showEditLink: boolean;

  lists: Array<any>;

  onAddToMenuClick: () => void;

  deleteRecipe: () => void;

  bulkAdd: (listId: number) => void;
  checkAllIngredients: () => void;
  uncheckAllIngredients: () => void;

  checkIngredient: (id: number, checked: boolean) => void;
  checkSubRecipe:  (id: number, checked: boolean) => void;

  updateServings: (servings: number) => void;
  resetServings:  () => void;
}

const RecipeScheme: React.FC<IRecipeSchemeProps> = (props: IRecipeSchemeProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
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

  const { recipe } = props;

  return (
    <div className='recipe-details'>
      <Card>
        <RecipeHeader
            title  = {recipe.title}
            photo  = {recipe.photo}
            rating = {recipe.rating}
            onAddToMenuClick={props.onAddToMenuClick} />
        <Card.Body className='recipe-schema' itemType='http://schema.org/Recipe'>
          <Row>
            {recipe.photo && (
              <Col xs={12} className='mobile-image'>
                <img className='img-responsive print-hidden' src={recipe.photo} alt={recipe.title} />
              </Col>
            )}
            <Col sm={7} xs={12} className='col-sm-push-5'>
              <p className='print-only print-image'>
                <img className='img-responsive' src={recipe.photo_thumbnail} alt={recipe.title} />
              </p>
              <InfoPanel
                  cookTime = {recipe.cook_time}
                  prepTime = {recipe.prep_time}
                  servings = {recipe.servings}
                  customServings = {recipe.customServings}
                  info = {recipe.info}
                  updateServings = {props.updateServings}
                  clearServings  = {props.resetServings} />
            </Col>
            <Col sm={5} xs={12} className='col-sm-pull-7'>
              <h4>{formatMessage(messages.ingredients)}</h4>
              <SubRecipes
                  subRecipes = {recipe.subrecipes}
                  checkSubRecipe = {props.checkSubRecipe} />
              <IngredientGroups
                  groups  = {recipe.ingredient_groups}
                  pending = {props.recipesState.pending}
                  checkIngredient = {props.checkIngredient} />
              <IngredientButtons
                  pending    = {props.recipesState.pending}
                  lists      = {props.lists}
                  bulkAdd    = {props.bulkAdd}
                  checkAll   = {props.checkAllIngredients}
                  unCheckAll = {props.uncheckAllIngredients} />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12}>
              <h4>{formatMessage(messages.directions)}</h4>
              <Directions data={recipe.directions} />
            </Col>
          </Row>
        </Card.Body>
        <RecipeFooter
            slug         = {recipe.slug}
            source       = {recipe.source}
            username     = {recipe.username}
            updateDate   = {recipe.update_date}
            deleteRecipe = {props.deleteRecipe}
            showEditLink = {props.showEditLink}
        />
      </Card>
    </div>
  );
};

export default RecipeScheme;
