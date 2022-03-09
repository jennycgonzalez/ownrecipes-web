import '../css/ratings.css';

import Icon from '../../common/components/Icon';

export interface IRatingsProps {
  stars: number;
}

const Ratings: React.FC<IRatingsProps> = ({ stars }: IRatingsProps) => {
  let starss = stars;
  if (stars > 5) {
    starss = 5;
  } else if (stars < 0) {
    starss = 0;
  }

  const starsList: Array<React.ReactNode> = [];
  if (starss > 0) {
    for (let i = 0; i < starss; ++i) {
      starsList.push(<Icon key={i} icon='star' />);
    }
  }
  if (starss < 5) {
    for (let i = 0; i < (5 - starss); ++i) {
      starsList.push(<Icon key={5 - i} icon='star' variant='light' />);
    }
  }

  return (
    <div className='rating-stars'>
      {starsList}
    </div>
  );
};

export default Ratings;
