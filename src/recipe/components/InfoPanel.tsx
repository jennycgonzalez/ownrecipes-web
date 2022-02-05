import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import Input from '../../common/components/Input';
import Icon from '../../common/components/Icon';
import P from '../../common/components/P';

export interface IInfoPanelProps {
  cookTime: number;
  prepTime: number;
  servings: number;
  info: string;

  customServings?: number;
  updateServings: (servings: number) => void;
  clearServings: () => void;
}

const InfoPanel: React.FC<IInfoPanelProps> = ({ cookTime, prepTime, servings, customServings, info, updateServings, clearServings }: IInfoPanelProps) => {
  const { formatMessage } = useIntl();

  const messages = defineMessages({
    servings: {
      id: 'recipe.servings',
      description: 'Servings',
      defaultMessage: 'Servings',
    },
    prep_time: {
      id: 'recipe.prep_time',
      description: 'Preparation time',
      defaultMessage: 'Prep time',
    },
    cooking_time: {
      id: 'recipe.cooking_time',
      description: 'Cooking time',
      defaultMessage: 'Cooking time',
    },
    minutes: {
      id: 'recipe.minutes',
      description: 'minutes',
      defaultMessage: 'minutes',
    },
  });

  let clearInput: React.ReactNode = null;
  if (servings !== customServings) {
    clearInput = (
      <span className='input-group-btn'>
        <Button onClick={clearServings} variant='outline-primary'>
          <Icon icon='x-square' />
        </Button>
      </span>
    );
  }

  return (
    <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
          <tr className='active'>
            <th>{ formatMessage(messages.servings) }</th>
            <th>{ formatMessage(messages.prep_time) }</th>
            <th>{ formatMessage(messages.cooking_time) }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='input-group print-hidden'>
                <Input
                    name='servings'
                    type='number'
                    className='servings-textbox'
                    change={(_name, newValue) => updateServings(parseInt(newValue))}
                    value={customServings != null && customServings !== 0 ? customServings : ''} />
                { clearInput }
              </div>
              <p className='print-only'>{ customServings || servings }</p>
            </td>
            <td>
              { prepTime }
              {' '}
              { formatMessage(messages.minutes) }
            </td>
            <td>
              { cookTime }
              {' '}
              { formatMessage(messages.minutes) }
            </td>
          </tr>
        </tbody>
      </table>
      <div className='panel-body'>
        <P>{info}</P>
      </div>
    </div>
  );
};

export default InfoPanel;
