import React from 'react';
import classNames from 'classnames';
import { Tabs, Tab } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';

export interface ITabbedViewProps {
  id:          string;
  labels:      Array<string>;
  tooltips?:   Array<string>;
  initialTab?: number;
  errors?:     string;
  className?:  string;

  children:    Array<React.ReactNode>;
}

const TabbedView: React.FC<ITabbedViewProps> = ({
    id, labels, errors, tooltips, children } : ITabbedViewProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
  const messages = defineMessages({
    preview: {
      id: 'recipe.create.preview',
      description: 'Preview',
      defaultMessage: 'Preview',
    },
  });

  const contentClassName = classNames('content', {
    'has-error': !!errors,
  });

  const navClassName = classNames('nav', 'nav-tabs', {
    'has-error': !!errors,
  });

  const tabs = children.slice(0, children.length - 1).map((childr, index) => (
    <Tab
        key = {String(index)}
        title = {(
          <>
            {labels[index]}
            {tooltips?.[index] && (
              <>
                &nbsp;
                <Tooltip
                    id = {`${labels[index]}-tooltip`}
                    placement = 'bottom'
                    tooltip   = {tooltips[index]}>
                  <Icon icon='info-circle' className='tooltip-icon' />
                </Tooltip>
              </>
            )}
          </>
        )}
        eventKey  = {String(index)}
        className = 'editor'>
      <div className={contentClassName}>{childr}</div>
    </Tab>
  ));

  return (
    <div className='live-editor'>
      <Tabs id={`${id}-tabs`} defaultActiveKey='0' className={navClassName}>
        {tabs}
        <Tab
            title = {formatMessage(messages.preview)}
            className = 'preview'
            eventKey  = 'preview'>
          <div className={contentClassName}>{children[children.length - 1]}</div>
        </Tab>
      </Tabs>
      <div className='help-text error'>{errors}</div>
    </div>
  );
};

export default TabbedView;
