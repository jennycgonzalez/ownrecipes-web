import PropTypes from 'prop-types';

import '../css/ratings.css';

const Ratings = ({ stars }) => {
  let starss = stars;
  if (stars > 5) {
    starss = 5;
  } else if (stars < 0) {
    starss = 0;
  }

  const fullStars = [...Array(starss).keys()].map((name, index) => <span key={index} className='glyphicon glyphicon-star' />);
  const emptyStars = [...Array(5 - starss).keys()].map((name, index) => <span key={index} className='glyphicon glyphicon-star-empty' />);

  return (
    <p className='rating-stars'>
      { fullStars }
      { emptyStars }
    </p>
  );
};

Ratings.propTypes = {
  stars: PropTypes.number.isRequired,
};

export default Ratings;
