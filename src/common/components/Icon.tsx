import classNames from 'classnames';

import '../css/icon.css';

export interface IIconProps {
  icon:     string;
  variant?: 'filled' | 'light';
  size?:    '1x' | '2x';

  className?: string;
}

function toVariantAffix(variant?: 'filled' | 'light'): string {
  if (variant == null || variant === 'filled') {
    return '-fill';
  } else {
    return '';
  }
}

const Icon: React.FC<IIconProps> = (props: IIconProps) => (
  <i className={classNames('bi', `bi-${props.icon}${toVariantAffix(props.variant)}`, `size-${props.size ?? '1x'}`, props.className)} />
);

export default Icon;
