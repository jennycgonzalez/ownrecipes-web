import classNames from 'classnames';

import '../css/chip.css';

export interface IChipProps {
  variant: 'primary' | 'secondary';

  className?: string;
  children: React.ReactNode;
}

const Chip: React.FC<IChipProps> = (props: IChipProps) => (
  <span
      className={classNames('chip', props.variant)}>
    {props.children}
  </span>
);

export default Chip;
