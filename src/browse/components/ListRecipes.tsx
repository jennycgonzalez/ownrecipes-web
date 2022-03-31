import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/list-recipes.css';

import Ratings from '../../rating/components/Ratings';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { IMAGE_PLACEHOLDER } from '../../common/constants';
import { getResourcePath } from '../../common/utility';

export interface IListRecipes {
  data:   Array<RecipeList> | undefined;
  onOpenRecipe: (rec: RecipeList) => void;
}

const ListRecipes: React.FC<IListRecipes> = ({ data, onOpenRecipe }: IListRecipes) => {
  const getRecipeImage = (recipe: RecipeList) => {
    if (recipe.photoThumbnail) {
      return recipe.photoThumbnail;
    } else {
      const images = ['fish', 'fried-eggs', 'pizza', 'soup', 'steak'];
      return getResourcePath(`/images/${images[Math.floor(Math.random() * images.length)]}.jpg`);
    }
  };

  const recipes = data?.map(recipe => {
    const link = getResourcePath(`/recipe/${recipe.slug}`);
    return (
      <Col key={recipe.id}>
        <Card className={classNames('recipe', 'print-hidden')}>
          <Link to={link} onClick={() => onOpenRecipe(recipe)}>
            <Card.Img variant='top' src={getRecipeImage(recipe)} alt='' placeholder={IMAGE_PLACEHOLDER} />
            <Card.Title as='h3'>{recipe.title}</Card.Title>
            <div><Ratings stars={recipe.rating} /></div>
            <Card.Text>{recipe.info}</Card.Text>
          </Link>
        </Card>
      </Col>
    );
  });

  return (
    <Row xs={1} sm={2} lg={4} className='g-4 recipes-list'>
      {recipes}
    </Row>
  );
};

export default ListRecipes;
