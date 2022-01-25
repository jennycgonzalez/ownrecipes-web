import {
  injectIntl,
  defineMessages,
} from 'react-intl';

import { TextArea } from '../../common/components/FormComponents';
import Directions from '../../recipe/components/Directions';
import TabbedView from './TabbedView';

const DirectionBox = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    info_title: {
      id: 'recipe.create.dir.info_title',
      description: 'info_title',
      defaultMessage: 'Direction Help',
    },
    info_desc: {
      id: 'recipe.create.dir.info_desc',
      description: 'info_desc',
      defaultMessage: 'Each Direction should be only its own line. Click the Preview to see what the Directions will look like.',
    },
  });

  const help = {
    infoTitle: formatMessage(messages.info_title),
    infoDesc: formatMessage(messages.info_desc),
  };

  return (
    <TabbedView {...{ ...props, ...help }}>
      <TextArea
          name={props.name}
          rows='8'
          change={props.change}
          value={props.data}
      />
      <div className='recipe-details'>
        <div className='recipe-schema'>
          <Directions data={props.data} />
        </div>
      </div>
    </TabbedView>
  );
};

export default injectIntl(DirectionBox);
