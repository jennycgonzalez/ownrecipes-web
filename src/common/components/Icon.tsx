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

const Icon: React.FC<IIconProps> = ({ icon, variant, size, className }: IIconProps) => (
  <i className={classNames('bi', `bi-${icon}${toVariantAffix(variant)}`, `size-${size ?? '1x'}`, className)} />
);

export default Icon;
