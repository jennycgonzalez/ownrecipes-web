import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router';

import Input from '../../common/components/Input';
import Directions from '../../recipe/components/Directions';
import TabbedView from './TabbedView';

export interface IDirectionBox {
  name:       string;
  directions: string;
  errors:     string | undefined;
  onChange:   (name: string, value: unknown) => void;
}

const DirectionBox: React.FC<IDirectionBox> = ({
    name, directions, errors, onChange }: IDirectionBox) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    directions_label: {
      id: 'recipe.create.directions_label',
      description: 'Directions label',
      defaultMessage: 'Directions',
    },
    directions_tooltip: {
      id: 'recipe.create.dir.tooltip',
      description: 'Directions Tooltip',
      defaultMessage: 'Each Direction should be on its own line.',
    },
    directions_placeholder: {
      id: 'recipe.create.dir.placeholder',
      description: 'Directions Placeholder',
      defaultMessage: 'Prepare the dough.\nPrepare the dip.\n...',
    },
  });

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('0');

  useEffect(() => {
    if (location.pathname.endsWith('/create')) {
      setActiveTab('0');
    }
  }, [location.pathname]);

  return (
    <TabbedView
        id        = 'directions'
        labels    = {[formatMessage(messages.directions_label)]}

        activeTab = {activeTab}
        onSelect  = {setActiveTab}

        errors    = {errors}
        tooltips  = {[formatMessage(messages.directions_tooltip)]}>
      <Input
          name     = {name}
          rows     = {8}
          value    = {directions}
          placeholder = {formatMessage(messages.directions_placeholder)}
          onChange = {onChange} />
      <div className='recipe-details'>
        <div className='recipe-schema'>
          <Directions data={directions} />
        </div>
      </div>
    </TabbedView>
  );
};

export default DirectionBox;
