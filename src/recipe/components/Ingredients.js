import PropTypes from 'prop-types';

import { Checkbox } from '../../common/components/FormComponents';

const Ingredients = ({ data, check }) => {
  const ingredients = data.map((ingredient, i) => (
    <li className='ingredient' key={i}>
      <Checkbox
          name={ingredient.id}
          checked={ingredient.checked ? ingredient.checked : false}
          change={check}
      />
      {ingredient.quantity !== '0' && <span className='quantity'>{ingredient.quantity} </span>}
      {ingredient.measurement && <span className='measurement'>{ ingredient.measurement }{' '}</span>}
      {ingredient.title && <span className='title'>{ ingredient.title }</span>}
    </li>
  ));

  return (
    <ul className='ingredients'>
      { ingredients }
    </ul>
  );
};

Ingredients.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Ingredients;
