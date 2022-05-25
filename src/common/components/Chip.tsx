import classNames from 'classnames';

import '../css/chip.css';

export interface IChipProps {
  variant: 'primary' | 'secondary';

  className?: string;
  children: React.ReactNode;
}

const Chip: React.FC<IChipProps> = ({ variant, className, children }: IChipProps) => (
  <span
      className={classNames('chip', variant, className)}>
    {children}
  </span>
);

export default Chip;
