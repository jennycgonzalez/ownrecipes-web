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

  const hasData = data.trim().length > 1; // Ignore single fake char.
  const isMultiStep = data.includes('\n');

  const directionsGroups = [];
  let directions: Array<React.ReactNode> = [];

  if (isMultiStep) {
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
  }

  return (
    <article className='directions'>
      <h2>{formatMessage(messages.directions)}</h2>
      {!hasData && (
        <P className='placeholder'>{formatMessage(messages.no_directions)}</P>
      )}
      {hasData && (
        <div>
          {!isMultiStep && data}
          {isMultiStep && directionsGroups}
        </div>
      )}
    </article>
  );
};

export default Directions;
