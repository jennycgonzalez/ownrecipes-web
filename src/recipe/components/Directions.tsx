import { defineMessages, useIntl } from 'react-intl';

import '../css/directions.css';

import P from '../../common/components/P';

export interface IDirectionsProps {
  data: string;
}

const Directions: React.FC<IDirectionsProps> = ({ data }: IDirectionsProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    directions: {
      id: 'recipe.directions',
      description: 'Directions',
      defaultMessage: 'Directions',
    },
    no_directions: {
      id: 'recipe.directions.no_directions',
      description: 'No directions provided message',
      defaultMessage: '(This recipe has no directions.)',
    },
  });

  let directions: Array<React.ReactNode> = [];
  const directionsGroups = [];

  data.split('\n').forEach(direction => {
    if (direction.length > 0) {
      if (direction.endsWith(':')) {
        directionsGroups.push(
          <div key={direction}>
            <ol className='directions'>
              {directions}
            </ol>
            <b>{direction.substring(0, direction.length - 1)}</b>
          </div>
        );
        directions = [];
      } else {
        directions.push(
          <li className='direction' key={direction}>
            {direction}
          </li>
        );
      }
    }
  });

  directionsGroups.push(
    <ol className='directions' key='last'>
      {directions}
    </ol>
  );

  return (
    <article className='directions'>
      <h2>{formatMessage(messages.directions)}</h2>
      {data.trim().length === 0 && (
        <P className='placeholder'>{formatMessage(messages.no_directions)}</P>
      )}
      {data.trim().length > 0 && (
        <div>
          {directionsGroups}
        </div>
      )}
    </article>
  );
};

export default Directions;
