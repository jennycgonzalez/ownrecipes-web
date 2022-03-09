import React from 'react';
import classNames from 'classnames';
import { Tabs, Tab } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';

export interface ITabbedViewProps {
  label:       string;
  tooltip?:    string;
  initialTab?: number;
  errors?:     string;
  className?:  string;

  children:    Array<React.ReactNode>;
}

const TabbedView: React.FC<ITabbedViewProps> = ({
    label, errors, tooltip, children } : ITabbedViewProps) => {
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

  return (
    <div className='live-editor'>
      <Tabs id={`${label}-tabs`} defaultActiveKey='editor' className={navClassName}>
        <Tab
            title = {(
              <>
                {label}
                &nbsp;
                <Tooltip
                    id = {`${label}-tooltip`}
                    placement = 'bottom'
                    tooltip   = {tooltip}>
                  <Icon icon='info-circle' className='tooltip-icon' />
                </Tooltip>
              </>
            )}
            eventKey = 'editor'
            className = 'editor'>
          <div className={contentClassName}>{children[0]}</div>
        </Tab>
        <Tab
            title = {formatMessage(messages.preview)}
            className = 'preview'
            eventKey = 'preview'>
          <div className={contentClassName}>{children[1]}</div>
        </Tab>
      </Tabs>
      <div className='help-text error'>{errors}</div>
    </div>
  );
};

export default TabbedView;
