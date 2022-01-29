import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { getResourcePath } from '../../common/utility';
import Icon from '../../common/components/Icon';

export interface IRecipeFooterProps {
  slug:         string,
  source:       string,
  username:     string,
  updateDate:   string,
  showEditLink: boolean,
  deleteRecipe: (slug: string) => void;
}

const RecipeFooter: React.FC<IRecipeFooterProps> = ({ slug, source, username, updateDate, showEditLink, deleteRecipe }: IRecipeFooterProps) => {
  const intl = useIntl();

  const messages = defineMessages({
    source: {
      id: 'recipe.source',
      description: 'Source of the recipe',
      defaultMessage: 'Source',
    },
    created_by: {
      id: 'recipe.created_by',
      description: 'Created by',
      defaultMessage: 'Created by',
    },
    last_updated: {
      id: 'recipe.last_updated',
      description: 'Last Updated',
      defaultMessage: 'Last Updated',
    },
    confirm_delete: {
      id: 'recipe.confirm_delete',
      description: 'Are you sure you want to delete this recipe?',
      defaultMessage: 'Are you sure you want to delete this recipe?',
    },
  });

  let hostname = '';
  if (source) {
    // Get Host name of a URL
    const a = document.createElement('a');
    a.href = source;
    hostname = a.hostname;
  }

  const handleDelete = () => {
    if (window.confirm(intl.formatMessage(messages.confirm_delete))) {
      deleteRecipe(slug);
    }
  };

  const sourceLink = (
    <div>
      {`${intl.formatMessage(messages.source)}: `}
      <a href={source}>{hostname}</a>
    </div>
  );

  const editLink = showEditLink ? (
    <Link to={getResourcePath(`/recipe/edit/${slug}`)}>
      <Button variant='primary' size='sm'>
        <i className='bi bi-pencil-fill' />
      </Button>
    </Link>
  ) : null;

  const deleteLink = showEditLink ? (
    <Button variant='danger' size='sm' onClick={handleDelete}>
      <Icon icon='trash' />
    </Button>
  ) : null;

  return (
    <Card.Footer>
      <Row>
        <Col>
          {source && sourceLink}
          <div>{`${intl.formatMessage(messages.created_by)}: ${username}`}</div>
          <div>{`${intl.formatMessage(messages.last_updated)}: ${updateDate}`}</div>
        </Col>
        {showEditLink && (
          <Col xs='auto'>
            <ButtonGroup>
              {editLink}
              {deleteLink}
            </ButtonGroup>
          </Col>
        )}
      </Row>
    </Card.Footer>
  );
};

export default RecipeFooter;
