import classNames from 'classnames';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

import '../css/tooltip.css';

export interface ITooltipProps {
  id:         string;
  tooltip:    React.ReactNode;
  placement?: Placement;
  className?: string;
  children:   React.ReactNode;
}

const Tooltip: React.FC<ITooltipProps> = ({
  id, tooltip, placement, className, children }: ITooltipProps) => (
    <OverlayTrigger
        placement = {placement ?? 'bottom'}
        delay = {{ show: 500, hide: 250 }}
        overlay = {(
          <BootstrapTooltip id={id}>
            {tooltip}
          </BootstrapTooltip>
      )}>
      <span className={classNames('tooltip-inline-block', className)}>{children}</span>
    </OverlayTrigger>
);

export default Tooltip;
